import { register,login,getUser,updateAvatar,deleteAvatar, editarPerfil ,searchss} from "../controller/User.js"
import { seguirUsuario,estaSiguiendo,deleteUser,obtenerUsuariosfollow, obtenerseguidos ,obtenerseguidores} from "../controller/Follow.js";
import GraphQLUpload from "../node_modules/graphql-upload/GraphQLUpload.mjs";
import { subirPublicacion,obtenerpublicacion,homePublicaciones } from "../controller/upload.js";
import { nuevoComentario,verComentarios } from "../controller/comentarios.js";
import { addLike,deleteLikes,consultarlosLikes,consultarTodosLosLikes } from "../controller/Likes.js";



const resolve = {
    //user

    Upload: GraphQLUpload,

    Query: {

      

       getUser : (_,{id,username}) => {

        return getUser(id,username)

       },
       searchs : (_,{searchs}) => {
          return searchss(searchs);
       },

       //follow
       isFollow : (_,{username},context) => {
          return estaSiguiendo(username,context)
       },

       obtenerTodosLosUsuarios : (_,{username}) => {
          return obtenerUsuariosfollow(username)
       },

       obtenerLosquesigo : (_,{username}) => {
          return obtenerseguidos(username)
       },

       //publicaciones
         obtenerPublicaciones : (_,{username})=>{
          return obtenerpublicacion(username);
       },

       obtenerHomePublicaciones : (_,{},context) => {
         return homePublicaciones(context)
       },
       //comentarios

       recuperarComentarios : (_,{idPublication}) => {
         return verComentarios(idPublication)
      },

      //LIKES
      consultarLikes : (_,{idPublication},context) => {
         return consultarlosLikes(idPublication,context)
      },

      consultarTodosLosLikes : (_,{idPublication}) => {
         return consultarTodosLosLikes(idPublication)
      },

      getNotFolloweds : (_,{},context) => {
        return obtenerseguidores(context)
      }


    },

    Mutation: {
        //user
        register: (_, { input }) => {

           return register(input)
        },
        login : (_,{input}) => {
           return login(input)
        },

        updateAvatar: (_,{ file },context) => {

         return updateAvatar(file,context)

        },

        deleteAvatar : (_,{},context) => {

         return deleteAvatar(context)

        },

        editarPerfil : (_,{input},context) => {

         return editarPerfil(input,context)

        },

        //followers

        followers : (_,{ username },context) => {
           return seguirUsuario(username,context)
        },

        deleteUsuarioSeguido : (_,{username},context) => {

        return deleteUser(username,context)

        },

        //publicaciones

        newPost : (_,{file},context) => {
         return subirPublicacion(file,context)
        },

        //comentarios

        newComentarios : (_,{input},context) => {
           return nuevoComentario(input,context)
        },

        //likes

        agregarLikes : (_,{idPublication},context) => {
         return addLike(idPublication,context)
        },

        eliminarLikes : (_,{idPublication},context) =>{
         return deleteLikes(idPublication,context)
        }


    },



    

}

export default resolve;