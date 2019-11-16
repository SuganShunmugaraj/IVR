const Roles = require("../models/roles.model");

exports.getAll = (req, res, next) => {
    Roles.find().exec((err, roles) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Roles fetched successfully", roles });
    });
};

exports.getById = (req, res, next) => {
    Roles.find({ _id: req.params.id }).exec((err, roles) => {
        if (err) return next(err);
        if (roles.length) {
            return res.json({ "success": true, "message": "Roles fetched by id successfully", roles });
        } else {
            return res.json({ "success": false, "message": "Roles with the given id not found", roles });
        }
    });
};

exports.create = (req, res, next) => {
    const newRole = new Roles(req.body);
    newRole.save((err, roles) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Roles added successfully", roles });
        }
    });
};

exports.update = (req, res, next) => {
    Roles.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, roles) => {
        if (err) return next(err);
        return res.json({ "success": true, "message": "Roles Updated Successfully", roles });
    });
};

exports.delete = (req, res, next) => {
    Roles.findByIdAndRemove(req.params.id, (err, roles) => {
        if (err) {
            next(err);
        } else {
            return res.json({ "success": true, "message": "Roles Deleted Successfully", roles });
        }
    });
};