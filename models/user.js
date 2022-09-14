import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    name : {
        type : String,
        require : true
    },
    username : {
        type: String,
        requiere : true,
        trim : true,
        unique: true,

    },

    email:{
        type: String,
        require : true,
        trim : true,
        unique : true,
    },

    avatar: {
        type : String,
        trim : true,
    },

    description:{
        type : String,
        trim: true,
    },
    password: {
        type : String,
        requiere :true,
        trim : true
        
    },
    siteweb : {
        type : String,
        trim : true
    },

    createdat: {
        type : String,
        default: Date.now()
    },
    


});

const usertSchema = mongoose.model("user",userSchema)

export default usertSchema