const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        unique: true,
        required: true,
        type: String,
        default: ''
    },
    motto: {
        type: String,
        default: "I'm blurting!"
    },
    password: {
        required: true,
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password, null);
}

module.exports = mongoose.model("User", UserSchema);