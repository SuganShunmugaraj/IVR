const fs = require("fs");
const csv = require("./csvUpload.controller");

exports.deleteFile = (req, res, next) => {
    const files = req.body;
    files.forEach(function(filePath) {
        fs.access(filePath, error => {
            if (error) {
                return next(error);
            } else {
                fs.unlinkSync(filePath, function(error) {
                    if (error) {
                        return next(error);
                    }
                });
            }
        });
    });
    return res.json({ "success": true, "message": "deleted sucessfully" });
};

exports.uploadCSV = (req, res, next) => {
    const csvFilePath = "./assets/files/" + req.files[0].filename;
    csv.main(csvFilePath, (err, tree) => {
        if (err) return next(err);
        fs.access(csvFilePath, error => {
            if (error) {
                return next(error);
            } else {
                fs.unlinkSync(csvFilePath, function(error) {
                    if (error) {
                        return next(error);
                    };
                });
            };
        });
        return res.send({
            success: true,
            file: tree
        });
    });
};

exports.uploadCompanyLogo = (req, res, next) => {
    const logoFilePath = "./assets/images/companyLogo/" + req.files[0].filename;
    fs.readFile(logoFilePath, function(err, data) {
        const base64Image = new Buffer(data, "binary").toString("base64");
        req.files[0].base64data = "data:image/png;base64," + base64Image;

        fs.access(logoFilePath, error => {
            if (error) {
                return next(error);
            } else {
                fs.unlinkSync(logoFilePath, function(error) {
                    if (error) {
                        return next(error);
                    }
                });
            };
        });
        return res.send({
            success: true,
            file: req.files
        });
    });
};