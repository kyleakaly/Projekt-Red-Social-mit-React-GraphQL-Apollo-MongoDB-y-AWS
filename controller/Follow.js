import Follow from "../models/follow.js";
import User from "../models/user.js";

const seguirUsuario = async (username, context) => {


    const { id } = context.user
    
    const usuarioAseguir =  await User.findOne({username : username})

 

   if(!usuarioAseguir ){
    throw new Error("usuario no Existe")
   }else {
    
try {

    const follow = new Follow({
        idUser: id,
        follow : usuarioAseguir._id
    });

    follow.save()

    return true
    
} catch (error) {
    console.log(error)
    return false
}
   
}}

const estaSiguiendo = async (username,context) => {

    const {id} = context.user
   

    const usuarioEncontrado = await User.findOne({username : username})

   
        if(!usuarioEncontrado){
            throw new Error('el usuario no fue encontrado')
        }else {
          
                const estasiguiendo = await Follow.find({idUser: id}).where("follow").equals(usuarioEncontrado._id);
                

                if(estasiguiendo.length > 0){
                    return true
                }
                
    }
    return false
}

const deleteUser = async (username,context) => {

    const {id } = context.user

    
    const usuarioseguido = await User.findOne({ username : username})
     

    if(!usuarioseguido){
        throw new Error('tenemos un error usuario no encontrado')
    }else{
        
        const estasdesiguiendo = await Follow.deleteOne({idUser: id}).where("follow").equals(usuarioseguido.id);
      

        if(estasdesiguiendo.deletedCount > 0){

                return true
        }

    }

    return false
}

const obtenerUsuariosfollow = async (username) => {

    const comprobarusuario = await User.findOne({username : username})


    if(!comprobarusuario){
        throw new Error('tenemos problemas')
       
    }else {
        //se utiliza object id para despues utilizar populate z sacar la informacion de la tabla hermana es como un find o many
        const estosusuariossigues = await Follow.find({follow : comprobarusuario._id}).populate('idUser');
        const followersList = []
        for await(let data of estosusuariossigues){
            followersList.push(data.idUser)
        }
return followersList;
    }

}

const obtenerseguidos = async (username) => {


    const comprobarusuario = await User.findOne({username:username});

    if(!comprobarusuario) {
        throw new Error('tenemos problemas')
    }else{

        const usuariosquemesiguen = await Follow.find({idUser : comprobarusuario._id}).populate('follow')
        const seguidos = []

        for await(let data of usuariosquemesiguen ){
            seguidos.push(data.follow)
        }

        return seguidos
    }

}

const obtenerseguidores = async (context) => {

    const {id} = context.user;

    const users = await User.find().limit(50);

    const arrayyUsers = [];
    for await(const user of users) {

        const isFind = await Follow.findOne({idUser : id}).where("follow").equals(user._id)

        if(!isFind){
            if(!user._id.toString() !== id.toString()){
                arrayyUsers.push(user);
            }
        }
     

    }

return arrayyUsers

}

export {
    seguirUsuario,
    estaSiguiendo,
    deleteUser,
    obtenerUsuariosfollow,
    obtenerseguidos,
    obtenerseguidores
}