const User = require("../models/user.model.js");
const passport = require("passport");

exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        privilege: req.body.privilegestr
    });
    User.findOne({ email: req.body.email })
        .then(userExists => {
            if (userExists) {
                return res.status(500).send({
                    message: "User already exists"
                });
            } else {
                user.setPassword(req.body.password);
                user.save(function(err) {
                    if (err) return next(err);
                    let token;
                    token = user.generateJwt();
                    res.status(200);
                    res.json({
                        "user": "admin",
                        "token": token
                    });
                });
            }
        });
};

exports.findOne = (req, res, next) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            return next(err);
        });
};

exports.login = function(req, res, next) {
    passport.authenticate("local", function(err, user, info) {
        let token;
        if (err) {
            return next(err);
        }
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "user": "admin",
                "token": token
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res);
};

exports.findAll = (res, next) => {
    User.find().populate("role").exec((err, data) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "product fetched successfully", "data": data });
    });
};

exports.delete = (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            return next(err);
        });
};

exports.update = (req, res, next) => {
    let user = new User(req.body);
    if (req.body.password) {
        user.setPassword(req.body.password);
    }
    User.updateOne({ _id: req.body._id }, user, { new: true }, (err, customer) => {
        if (err) {
            return next(err);
        } else {
            return res.json({ "success": true, "message": "Updated Successfully", customer });
        }
    });
};