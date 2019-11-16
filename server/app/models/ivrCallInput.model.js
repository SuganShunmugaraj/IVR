const mongoose = require("mongoose");

const ivrCallInputSchema = mongoose.Schema({
    createdAt: { type: Date, required: true, default: Date.now },
    approved: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "Pending" },
    data: { type: String },
});

module.exports = mongoose.model("ivrcallinput", ivrCallInputSchema);