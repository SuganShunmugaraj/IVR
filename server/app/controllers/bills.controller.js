const Bills = require("../models/bills.model");
const utils = require("../utils/mail.utils");

exports.getAll = (req, res, next) => {
    Bills.find().populate("billTo").exec((err, bills) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Bills fetched successfully", bills });
    });
};

exports.getById = (req, res, next) => {
    Bills.find({ billTo: req.params.id }).populate("billTo").exec((err, bills) => {
        if (err) return next(err);
        if (bills.length) {
            return res.json({ "success": true, "message": "Bills fetched by id successfully", bills });
        } else {
            return res.json({ "success": false, "message": "Bills with the given id not found", bills });
        }
    });
};

exports.create = (req, res, next) => {
    const newCustomeraccount = new Bills(req.body);
    newCustomeraccount.save((err, bills) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Bills added successfully", bills });
        }
    });
};

exports.sendReminder = (req, res, next) => {
    const emailTo = req.body.billTo.email;
    const subject = "Reminder - Cuserve";
    const body = "Hello,\n\n" + "I hope you’re well. This is just to remind you the payment on invoice " + req.body.billId + ". please reach out if you have any questions on the payment" + "\n\n" + "Regards,\n" + "Cuserve Teams\n\n";

    utils.sendMail(subject, body, emailTo, (err, data) => {
        if (err) return next(err);
        console.log(data, "data");
        return res.json({ "success": true, "message": "Reminder sent to  " + req.body.billTo.email });
    });
};

exports.update = (req, res, next) => {
    Bills.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, bills) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Bills Updated Successfully", bills });
    });
};

exports.delete = (req, res, next) => {
    Bills.findByIdAndRemove(req.params.id, (err, bills) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Bills Deleted Successfully", bills });
        }
    });
};

exports.getNewBills = (req, res, next) => {
    Bills.find({ billTo: req.params.id, viewed: false }).populate("billTo").exec((err, bills) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Bills fetched successfully", bills });
    });
};