const Ivr = require("../models/ivr.model");

exports.getAll = (req, res, next) => {
    Ivr.find().populate("createdBy").exec((err, ivr) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Ivr fetched successfully", ivr });
    });
};

exports.getById = (req, res, next) => {
    Ivr.find({ _id: req.params.id }).populate("createdBy").exec((err, ivr) => {
        if (err) return next(err);
        if (ivr.length) {
            return res.json({ "success": true, "message": "Ivr fetched by id successfully", ivr });
        } else {
            let error = new Error("Ivr with the given id not found");
            error.statusCode = 400;
            next(error);
        }
    });
};

exports.getFiltered = (req, res, next) => {
    Ivr.find(req.body).populate("createdBy").exec((err, ivr) => {
        if (err) return next(err);
        if (ivr.length) {
            return res.json({ "success": true, "message": "Ivr fetched by id successfully", ivr });
        } else {
            return res.json({ "success": true, "message": "Ivr with the given id not found", ivr });
        }
    });
};

exports.getByUser = (req, res, next) => {
    Ivr.find({ createdBy: req.params.id }).populate("createdBy").exec((err, ivr) => {
        if (err) return next(err);
        if (ivr.length) {
            return res.json({ "success": true, "message": "Ivr fetched by id successfully", ivr });
        } else {
            return res.json({ "success": true, "message": "Ivr with the given id not found", ivr });
        }
    });
};

exports.create = (req, res, next) => {
    const newIVR = new Ivr(req.body);
    newIVR.save((err, ivr) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Ivr added successfully", ivr });
        }
    });

};

exports.update = (req, res, next) => {
    Ivr.findOneAndUpdate({ _id: req.params.id }, req.body, (err, ivr) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Ivr Updated Successfully", ivr });
        }
    });
};

exports.delete = (req, res, next) => {
    Ivr.findByIdAndRemove(req.params.id, (err, ivr) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Ivr Deleted Successfully", ivr });
        }
    });
};