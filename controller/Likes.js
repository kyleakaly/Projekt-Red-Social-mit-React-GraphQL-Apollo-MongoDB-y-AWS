import Likes from '../models/likes.js'

const addLike = async (idPublication,context) => {

    const {id} = context.user


    try {

        const nuevoLike = new Likes({

            idUser : id,
            idPublication : idPublication

        })

        nuevoLike.save()

        return true
        
    } catch (error) {
        console.log(error)
        return(false)
    }

}

const deleteLikes = async (idPublication,context) => {
    const {id} = context.user
    try {
        
        await Likes.findOneAndDelete({idPublication : idPublication}).where({
            idUser : id
        })

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}

const consultarlosLikes = async (idPublication,context) => {
    const {id} = context.user

    try {

        const consultarlikes = await Likes.findOne({idPublication : idPublication}).where({
            idUser : id
        });

        if(!consultarlikes){
            
         throw new Error('no le has dado like')
            
        }
        return true
        
        
    } catch (error) {

        console.log(error)
        return false
        
    }
}

const consultarTodosLosLikes = async (idPublication) => {

    try {
        
        const consultartodosloslikes = await Likes.countDocuments({idPublication : idPublication})
        return consultartodosloslikes

    } catch (error) {
        console.log(error)
    }

}

export {
    addLike,
    deleteLikes,
    consultarlosLikes,
    consultarTodosLosLikes
}