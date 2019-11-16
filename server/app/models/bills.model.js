const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
    billTo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
    createdAt: { type: Date, required: true, default: Date.now },
    active: { type: Boolean, required: true, default: true },
    paymentTerms: { type: String, required: true },
    paymentStatus: { type: String, required: true, default: "unpaid" },
    dueDate: { type: Date, required: true },
    items: [{
        description: { type: String, required: true },
        calls: { type: String, required: true },
        cost: { type: String, required: true },
        amount: { type: String },

    }],
    remind: { type: Number, required: true, default: 0 },
    billId: { type: String, required: true },
    subtotal: { type: String },
    tax: { type: String },
    total: { type: String },
    viewed: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("bills", billSchema);