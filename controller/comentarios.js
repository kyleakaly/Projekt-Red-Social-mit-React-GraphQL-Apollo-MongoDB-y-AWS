import Comentarios from '../models/comentarios.js'
import User from '../models/user.js'

const nuevoComentario = async (input,context) => {
    const {id} = context.user

    try {

        const nuevocomentario =  new Comentarios({

            idPublication: input.idPublication ,
            idUser : id,
            comentario : input.comentario,
        })

        nuevocomentario.save()
        return nuevocomentario
        
    } catch (error) {
        console.log(error)
    }

}

const verComentarios = async (idPublication) => {

const result = await Comentarios.find({idPublication : idPublication}).populate("idUser");
console.log(result)
return result

}

export {
    nuevoComentario,
    verComentarios
}