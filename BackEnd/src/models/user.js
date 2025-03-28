const mongoose = require("mongoose");
const validator = require("validator");

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

            /*  Validating Email METHOD 1
            validate: {
                validator : validator.isEmail,
                message : "{VALUE} Is Invalid Email."
            } 
            */
            /* Validating Email METHOD 2
            validate : {
                validator: function(v) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return emailRegex.test(v);
                },
                message: props => `${props.value} Is Not A Valid Email.`
            }, */

            /* Validating Email METHOD 3
            validate(value){
                const isvalid = (email) => emailRegex.test(email);
                if(!isvalid(value.trim())){
                    throw new Error("The Email Is Invalid");
                } 
            }
             */
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength:[8,'Password Length Should Be At Least 8'],
            validate(value) {
                if(!validator.isStrongPassword(value)){
                    throw new Error("{VALUE} Is Not A Strong Password");
                }
            },
            /* validate(value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
                if(!passwordRegex.test(value.trim())){
                    throw new Error("The Password Is Invalid.\nThe Password Must Have:\n- At least one lowercase letter\n- At least one uppercase letter\n- At least one digit \n- At least one special character");
                } 
            } */
        },
        age: {
            type: Number,
            min: [18, 'You Must Be At Least 18. Kiddo!!'],
            max: [150, '{VALUE} !! You Are Not A Human Anymore!!']
        },
        gender: {
            type: String,
            trim: true,
            set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
            // Validating Limited Options
            enum: {
                values: ["Male", "Female", "Others"],
                message: `{VALUE} Is Invalid.`
            }
        },
        photoUrl: {
            type: String,
            default: "https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg",
            trim: true,
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error("{VALUE} Is Invalid URL.")
                }
            },
        },
        about: {
            type: String,
            default: "This Is Default Value",
            trim: true,
            maxlength:[200,"Just Write An Intro. Not An Essay. Make It Short."]
        },
        skills: {
            type: [String],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);