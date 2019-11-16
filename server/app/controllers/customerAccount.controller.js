const Customeraccount = require("../models/customerAccount.model");

exports.getAllCustomerAccounts = (req, res, next) => {
    Customeraccount.find().exec((err, customeraccounts) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Customeraccount fetched successfully", customeraccounts });
    });
};

exports.getCustomerAccountById = (req, res, next) => {
    Customeraccount.find({ customer: req.params.id }).exec((err, customeraccounts) => {
        if (err) return next(err);
        if (customeraccounts.length) {
            return res.json({ "success": true, "message": "Customeraccount fetched by id successfully", customeraccounts });
        } else {
            return res.json({ "success": false, "message": "Bills with the given id not found", customeraccounts });
        }
    });
};

exports.addCustomerAccount = (req, res, next) => {
    Customeraccount.findOne({ customer: req.params.id }).exec((err, userExists) => {
        if (userExists) {
            Customeraccount.findByIdAndUpdate({ _id: userExists._id }, req.body, { new: true }, (err, customer) => {
                if (err) {
                    return next(err);
                } else {
                    return res.json({ "success": true, "message": "Updated Successfully", customer });
                }
            });
        } else {
            const newCustomeraccount = new Customeraccount(req.body);
            newCustomeraccount.save((err, customeraccounts) => {
                if (err) return next(err);
                return res.json({ "success": true, "message": "Customeraccount added successfully", customeraccounts });
            });
        }
    });
};

exports.updateCustomerAccount = (req, res, next) => {
    Customeraccount.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, customeraccounts) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Customeraccount Updated Successfully", customeraccounts });
    });
};

exports.deleteCustomerAccount = (req, res, next) => {
    Customeraccount.findByIdAndRemove(req.params.id, (err, customeraccounts) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Customeraccount Deleted Successfully", customeraccounts });
    });
};