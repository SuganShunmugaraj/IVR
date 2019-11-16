const mongoose = require("mongoose");

const customerAccountSchema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
    active: { type: Boolean, required: true, default: true },
    verified: { type: Boolean, required: true, default: false },
    cardNumber: { type: String, required: true },
    expDay: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    cardHolder: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("customeraccount", customerAccountSchema);