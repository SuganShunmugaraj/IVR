const utils = require("../utils/mail.utils");

exports.main = (csvFilePath, callback) => {
    utils.check(csvFilePath, (err, result) => {
        if (err) return callback(err);
        utils.nodeListFromCsvFile(csvFilePath, (err, nodes) => {
            if (err) return callback(err);
            utils.make_tree(nodes, (err, tree) => {
                if (err) return callback(err);
                tree = JSON.stringify(tree);
                callback(null, tree);
            });
        });
    });
};