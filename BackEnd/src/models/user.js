const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const env = require("dotenv").config();

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength:[100, 'Your First Name Length Will Crash My Database. Shorten It..'],
            trim: true, 
            set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength:[100, 'Your Last Name Length Will Crash My Database. Shorten It..'],
            trim: true,
            set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        },
        emailId: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            // Using npm library validator
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("{VALUE} Is Invalid Email.")
                }
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength:[8,'Password Length Should Be At Least 8'],
            validate(value) {
                if(!validator.isStrongPassword(value)){
                    throw new Error("This Is Not A Strong Password");
                }
            },
        },
        age: {
            type: Number,
            min: [18, 'You Must Be At Least 18. Kiddo!!'],
            max: [150, '{VALUE} !! You Are Not A Human Anymore!!'],
        },
        gender: {
            type: String,
            trim: true,
            set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
            // Validating Limited Options
            enum: {
                values: ["Male", "Female", "Others"],
                message: `Enter Valid Input.[Male, Female, Others].`
            }
        },
        photoUrl: {
            type: String,
            default: "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
            trim: true,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("The URL Is Invalid.")
                }
            },
        },
        about: {
            type: String,
            trim: true,
            maxlength:[350,"Just Write An Intro. Not An Essay. Make It Short."]
        },
        skills: {
            type: [String],
            // Limiting Number Of Skills User Can Add
            validate(value) {
                if(value.length > 5){
                    throw new Error("Include Only 5 Best Of Your Skills.");
                }  
            },
        }
    },
    {
        timestamps: true,
    }
);
// Helper Functions / Instance Methods 
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, process.env.JWT_PRIVATE_KEY,{
        expiresIn: "7d"
    });
    return token;
};

userSchema.methods.validatePassword = async function (inputPasswordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(inputPasswordByUser, passwordHash);
    if(!isPasswordValid){
        throw new Error("-- Invalid Credentials --");
    }
    return isPasswordValid;
};


module.exports = mongoose.model("User", userSchema);