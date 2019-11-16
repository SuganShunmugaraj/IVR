exports.nodeListFromCsvFile = (csvFile, callback) => {
    let nodes = [];
    readFile(csvFile, (err, data) => {
        if (err) return callback(err);
        parse(data, {}, (err, parsedCsv) => {
            if (err) return callback(err);
            for (let i = 1; i < parsedCsv.length; i++) {
                const row = parsedCsv[i];
                if (row[0] == "") continue;
                let node = {
                    "action": row[1],
                    "company": row[2],
                    "keyCode": row[3],
                    "hasInputs": !row[4] === "FALSE",
                    "numSeconds": parseInt(row[5]),
                    "child-codes": []
                };
                const codes = row[7].split("-");
                if (codes.length != 0 && codes[0] != "")
                    node["child-codes"] = codes.map(code => parseInt(code) - 1);
                if (node["hasInputs"])
                    node["inputs"] = row[6].split("-");
                nodes.push(node);
            }
            return callback(null, nodes);
        });
    });
};

exports.make_tree = (node_list, callback) => {
    _make_tree_util(node_list, 0, (err, tree) => {
        if (err) return callback(err);
        return callback(null, tree);
    });
};
exports._make_tree_util = (node_list, idx, callback) => {
    let node_obj = {};
    node_obj["data"] = node_list[idx];
    node_obj["children"] = [];
    const len = node_list[idx]["child-codes"].length;
    if (len > 0) {
        for (const code of node_list[idx]["child-codes"]) {
            _make_tree_util(node_list, code, (err, child_obj) => {
                if (err) return callback(err);
                node_obj["children"].push(child_obj);
            });
        }
    }
    delete node_obj["data"]["child-codes"];
    callback(null, node_obj);
};

exports.check = (csvFile, callback) => {
    nodeListFromCsvFile(csvFile, (err, nodes) => {
        if (err) return callback(err);
        let children_concat = [];
        for (const node of nodes) {
            children_concat.push(...node["child-codes"]);
        }
        children_concat = children_concat.map(code => code + 1);
        if (hasDuplicates(children_concat))
            return callback(new Error("Incorrect CSV.Multiple rows have a common child."));
        callback(null, true);
    });
};

exports.hasDuplicates = array => {
    let valuesSoFar = [];
    for (let i = 0; i < array.length; ++i) {
        let value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
};