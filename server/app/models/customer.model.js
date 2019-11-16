const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const customerSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    hash: String,
    salt: String,
    role: String,
    uninum: Number,
    expiry: Number,
    verified: Boolean,
    companyName: String,
    companyIvrNumber: String,
    companyEmail: String,
    companyPhone: String,
    companyLogo: String,
    category: String,
    companyAddress1: String,
    companyAddress2: String,
    companyCity: String,
    companyState: String,
    companyCountry: String
}, {
    timestamps: true
});

customerSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

customerSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.hash === hash;
};

customerSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWTSECRET);
};

module.exports = mongoose.model("Customer", customerSchema);