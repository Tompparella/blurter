const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password, null);
}

module.exports = mongoose.model("User", UserSchema);