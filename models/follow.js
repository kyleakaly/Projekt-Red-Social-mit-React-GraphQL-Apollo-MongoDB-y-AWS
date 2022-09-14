import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FollowSchema = Schema({

    idUser: {
        type : Schema.Types.ObjectId,
        require : true,
        ref: "user"
    },
    follow: {
        type : Schema.Types.ObjectId,
        require: true,
        ref : "user"
    },

    createAt: {
        type: Date,
        default : Date.now(),
    }

});

const followSchema = mongoose.model('follow', FollowSchema);

export default followSchema