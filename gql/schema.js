import { gql } from "apollo-server-express";


const typeDefs = gql`
scalar Upload
type User {
    
    id:ID
    name:String
    username: String
    email : String
    avatar: String
    description : String
    password : String
    siteweb : String
    createdat : String


}

type Token {
    token : String
}

type UpdateAvatar {
    status : Boolean
    urlAvatar : String!
}

type UploadingPost {
    status : Boolean
    urlFile : String!
}

type Publications {

    id : ID
    idUser : ID
    file: String,
    typeFile: String
    createAt: String

}

type Comentario {

    idPublication: ID
    idUser : User
    comentario : String
    createAt : String

}

type FeedPublication {

    id : ID,
    idUser : User
    file : String
    typeFile : String
    createAt : String


}


input UserInput {

    name : String!
    username: String!
    email: String!
    password: String!

}

input LoginInput {

    email : String!
    password : String!

}

input InputComentario{

    idPublication: ID
    comentario : String

}

input EditarInput {

    name : String
    siteweb : String
    description : String
    email : String
    password : String
    nuevopassword : String

}


type Query {

    # User 
    getUser(id:ID, username: String) : User
    searchs( searchs : String) : [User]

    #follow
    isFollow(username : String!) : Boolean
    obtenerTodosLosUsuarios(username : String!) : [User]
    obtenerLosquesigo(username : String!) : [User]
    getNotFolloweds : [User]
    
    #publicaciones
    obtenerPublicaciones(username : String!) : [Publications]
    obtenerHomePublicaciones : [FeedPublication]

    #comentarios
    recuperarComentarios(idPublication : ID) : [Comentario]

    #likes
    consultarLikes(idPublication : ID!) : Boolean
    consultarTodosLosLikes(idPublication : ID!) : Int
    
}

type Mutation {
    #user

    register(input: UserInput) : User
    login(input: LoginInput) : Token
    updateAvatar(file : Upload) : UpdateAvatar
    deleteAvatar : Boolean
    editarPerfil(input : EditarInput) : Boolean

    #follower
    followers(username: String!) : Boolean
    deleteUsuarioSeguido(username : String!) : Boolean

    #crearNuevasPublicaciones
    newPost(file : Upload!) : UploadingPost

    #comentarios

    newComentarios(input : InputComentario) : Comentario

    #likes
    agregarLikes(idPublication : ID! ) : Boolean
    eliminarLikes(idPublication : ID!) : Boolean


}

`;

//type Query obtenemos datos  y con mutaton modificamos o agregamos datos

export default typeDefs;