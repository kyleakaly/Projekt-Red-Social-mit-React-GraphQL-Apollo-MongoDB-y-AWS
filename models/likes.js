import mongoose from 'mongoose'

const likes = mongoose.Schema({

    idUser : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "user"
    },
    idPublication : {
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref : "publicacion"
    },

})

const Likes = mongoose.model('likes',likes)

export default Likes