import mongoose from 'mongoose'


const ComentariosSchema = mongoose.Schema({

idPublication : {
  type : mongoose.Schema.Types.ObjectId,
  require : true,
  ref : 'Publication',
},

idUser : {

    type : mongoose.Schema.Types.ObjectId,
    require : true,
    ref : 'user'

},

comentario : {
    type : String,
    require : true,
    trim :true
},

createAt : {
    type : Date,
    default : Date.now()

} 

})

const comentariosSchemaUser = mongoose.model('comentariosUsuarios',ComentariosSchema);

export default comentariosSchemaUser

