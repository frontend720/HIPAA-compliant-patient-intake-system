const mongoose = require("mongoose") 

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8
    },
    firstName: {
        type: String,
        requiured: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    role: {
        type: String,
        enum: ["patient", "provider", "admin"],
        default: "patient",
        required: true
    }

})
console.log(UserSchema)

module.exports = mongoose.model("User", UserSchema)
