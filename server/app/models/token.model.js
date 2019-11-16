const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
    token: { type: String, required: true },
    type: { type: String },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("Token", tokenSchema);