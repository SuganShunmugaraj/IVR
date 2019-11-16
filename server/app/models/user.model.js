const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    hash: String,
    salt: String,
    role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "roles" },
    privilege: String
}, {
    timestamps: true
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
};

UserSchema.methods.validPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function() {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWTSECRET);
};

module.exports = mongoose.model("User", UserSchema);