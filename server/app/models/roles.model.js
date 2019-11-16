const mongoose = require("mongoose");

const rolesSchema = mongoose.Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    roleName: { type: String, required: true },
    privileges: { type: Array }

});

module.exports = mongoose.model("roles", rolesSchema);