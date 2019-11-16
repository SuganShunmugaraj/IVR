const mongoose = require("mongoose");

const ivrSchema = mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
    createdAt: { type: Date, required: true, default: Date.now },
    approved: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "pending" },
    ivrName: { type: String, required: true },
    ivrJson: { type: String, required: true },
    twilioNumber: { type: String },
    assignedNumber: { type: String },
    sidStartingIndex: { type: Number, default: 11 },
    orginalJson: { type: String, required: true },
    viewed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("ivr", ivrSchema);