const validate = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password } = req.body;
    if(!firstName || !lastName){
        throw new Error("What? You Don't Know Your Name.");
    } else if(!validate.isEmail(emailId)) {
        throw new Error(`${emailId} Is Invalid Email.`);
    } else if(!validate.isStrongPassword(password)){
        throw new Error(`${password} Is Not A Strong Password`);
    }
};

module.exports = { validateSignUpData };