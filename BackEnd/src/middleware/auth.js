const authAdmin = (req,res,next) => {
    //Logic for authentication
    const token = "abc";
    const authenticated = "abc" === token;
    if(!authenticated){
        res.status(401).send("Unauthorized");
    }
    else{
        next()
    }
};

const authUser = (req,res,next) => {
    //Logic for authentication
    const token = "abc";
    const authenticated = "abc" === token;
    if(!authenticated){
        res.status(401).send("Unauthorized");
    }
    else{
        next()
    }
};

module.exports = { authAdmin, authUser };