const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
        fromUserId : {
            type : mongoose.Schema.Types.ObjectId,
            require : true,
            ref : "User" // Reference To User Collection
        },
        toUserId : {
            type : mongoose.Schema.Types.ObjectId,
            require : true,
            ref : "User"
        },
        status: {
            type : String,
            require : true,
            enum : {
                values : ["ignored", "interested", "accepted", "rejected"],
                message : `{VALUE} Is Invalid Status`
            }
        }
    },
    { timestamps: true }
);

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error ("One Should Form A Connection With Oneself, But Not Here.");
    };
    next()
})

module.exports = mongoose.model ("ConnectionRequest", connectionRequestSchema);