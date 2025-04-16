const validate = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("What? You Don't Know Your Name.");
    } else if (!validate.isEmail(emailId)) {
        throw new Error(`${emailId} Is Invalid Email.`);
    } else if (!validate.isStrongPassword(password)) {
        throw new Error(`${password} Is Not A Strong Password`);
    }
};

const validateEditProfileData = (data) => {
    // Limiting Fields To User For Updating 
    const ALLOWED_UPDATES = ["lastName","age","gender","photoUrl","about","skills"];
    const notAllowedFields = Object.keys(data).filter((k) => !ALLOWED_UPDATES.includes(k));
    if(notAllowedFields.length > 0){
        throw new Error(`Update Is Not Allowed For The Listed Field: ${notAllowedFields.join(", ")}`);
    };
}
module.exports = { validateSignUpData, validateEditProfileData };

