const Customer = require("../models/customer.model.js");
const Token = require("../models/token.model.js");
const crypto = require("crypto");
const passport = require("passport");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASS
    }
});

exports.userRegister = function(req, res, next) {
    if (!req.body.name || !req.body.phone || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
    let data = req.body;
    data.uninum = Math.floor(1000 + Math.random() * 9000);
    data.expiry = 0;
    data.verified = 0;
    let user = new Customer(data);
    Customer.findOne({ email: req.body.email }, err)
        .then(userExists => {
            if (err) {
                return next(err);
            }
            if (userExists) {
                return res.status(500).send({
                    message: "Customer already exists"
                });
            } else {
                user.setPassword(req.body.password);
                user.save(function(err) {
                    res.status(200);
                    let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString("hex"), type: "REGISTER" });
                    token.save(function(err) {
                        if (err) { return res.json({ message: err.message }); }
                        let mailOptions = {
                            from: process.env.EMAILFROM,
                            to: req.body.email,
                            subject: "Account Verification Token",
                            text: "Hello,\n\n" + "Confirm your account by clicking the link:\n" + process.env.CLIENTURL + "/verify/" + token.token + "\n\n" + "Regards,\n" + "Cuserve Teams\n\n"
                        };
                        transporter.sendMail(mailOptions, function(err) {
                            if (err) {
                                return res.json({ message: "erro" + err.message });
                            }
                            return res.json({ "success": true, "message": "Verification Link  has been sent to  " + req.body.email });
                        });
                    });
                });
            };
        });
};

exports.userLogin = function(req, res, next) {
    Customer.find({ email: req.body.email }).exec((err, data) => {
        if (err) {
            return next(err);
        }
        if (data.length) {
            if (data[0].verified) {
                customerAuth(req, res, next);
            } else {
                let error = new Error("User is not yet verified");
                error.statusCode = 500;
                next(error);
            }
        } else {
            let error = new Error("User with the given ids not found");
            error.statusCode = 400;
            next(error);
        }
    });
};

function customerAuth(req, res, next) {
    passport.authenticate("userLocal", function(err, user, info) {
        let token;
        if (err) {
            res.status(404).json(err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "user": "customer",
                "token": token
            });
        } else {
            const error = new Error(info.message);
            error.statusCode = 401;
            next(error);
        }
    })(req, res, next);
}

exports.update = (req, res, next) => {
    let user = new Customer(req.body);
    if (req.body.password) {
        user.setPassword(req.body.password);
    }
    Customer.updateOne({ _id: req.params.id }, user, { new: true }, (err, customer) => {
        if (err) {
            return next(err);
        } else {
            return res.json({ "success": true, "message": "Updated Successfully", customer });
        }
    });
};

exports.getAllCustomer = (req, res, next) => {
    Customer.find().exec((err, customer) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Coupon fetched successfully", customer });
    });
};

exports.findCustomerExists = (req, res, next) => {
    Customer.find({ email: req.body.email }).exec((err, data) => {
        if (err) {
            return next(err);
        }
        if (data.length) {
            return res.json({ "success": true, "message": "user is alredy exist", exists: true });
        } else {
            return res.json({ "success": true, "message": "user is not found", exists: false });
        }
    });
};

exports.findOne = (req, res, next) => {
    Customer.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            return next(err);
        }
        if (data.length) {
            return res.json({ "success": true, "message": "user fetched by id successfully", data });
        } else {
            let error = new Error("User with the given id not found");
            error.statusCode = 400;
            next(error);
        }
    });
};

exports.verifyUser = (req, res, next) => {
    Token.find({ token: req.params.token, type: "REGISTER" }).exec((err, data) => {
        if (err) {
            return next(err);
        }
        if (data.length) {
            Customer.updateOne({ _id: data[0]._userId }, { verified: true }, { new: true }, (err, customer) => {
                if (err) {
                    return next(err);
                } else {
                    Token.findByIdAndRemove(data[0]._id, (err) => {
                        if (err) {
                            next(err);
                        } else {
                            return res.json({ "success": true, "message": "Your email is verified successfully. please login using your email and password", customer });
                        }
                    });
                }
            });

        } else {
            let error = new Error("Token is not found");
            error.statusCode = 400;
            next(error);
        }
    });
};

exports.forgotPassword = (req, res, next) => {
    Customer.findOne({ "email": req.body.email }, function(err, user) {
        if (!user) {
            return res.json({ success: false, message: "Email Id is not Found" });
        }
        let token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString("hex") });

        token.save(function(err) {
            if (err) { return next(err) }

            const mailOptions = { from: process.env.EMAILFROM, to: req.body.email, subject: "Account Verification Token", text: "Hello,\n\n" + "You can now change password of your account by clicking the link:\n" + process.env.CLIENTURL + "/resetpass/" + token.token + "\n\n" + "Regards,\n" + "Cuserve Teams\n\n" };

            transporter.sendMail(mailOptions, function(err) {
                if (err) { return next(err) }
                return res.json({ "success": true, "message": "Password reset Link  has been sent to" + req.body.email });
            });
        });

    });
};

exports.updatePassword = (req, res, next) => {
    Token.findOne({ token: req.body.token }, function(err, token) {
        if (!token) {
            return res.json({ success: false, type: "not-verified", msg: "We were unable to find a valid token. Your token my have expired." });
        } else {
            let user = new Customer(req.body);
            if (req.body.password) {
                user.setPassword(req.body.password);
            }
            let updatedData = {
                salt: user.salt,
                hash: user.hash
            };
            Customer.findOneAndUpdate({ _id: token._userId }, updatedData, { new: true }, (err, customer) => {
                if (err) {
                    return next(err);
                } else {
                    Token.remove({ token: req.body.token }, (err) => {
                        if (err) { return next(err) }
                    });
                    return res.json({ "success": true, "message": "Updated Successfully", customer });
                }
            });
        }
    });
};