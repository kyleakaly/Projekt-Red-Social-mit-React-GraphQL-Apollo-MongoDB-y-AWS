 import User from "../models/user.js";
  import Publicacion from "../models/publication.js";
  import Follow from "../models/follow.js";
 import { awsUploadImage } from "../utils/aws-upload-image.js";
 import {v4 as uuidv4} from 'uuid'
 

const subirPublicacion = async (file,context) => {

    const { id } = context.user

  const {mimetype,createReadStream} = await file
  const extension = mimetype.split('/')[1]
  const filename = `publications/${uuidv4()}.${extension}`
  const fileData = createReadStream();

  try {

    const result = await awsUploadImage(fileData, filename)
    const nuevaPublicacion = new Publicacion({

        idUser : id,
        file : result,
        typeFile : mimetype.split('/')[0],
        createAt : Date.now()
   
     })
   
     nuevaPublicacion.save();

     return {

        status : true,
        urlFile : result

     }
   
      
  } catch (error) {
      
      console.log(error)
      return {
          status : null,
          urlFile: "",
      }
  }

}

const obtenerpublicacion = async (username) => {

  const user = await User.findOne({username : username})

  if(!user){
    throw new Error('usuario no encontrado')
    
  }else {

    const publicacione = await Publicacion.find().where({idUser : user._id}).sort({createAt:-1})


  return publicacione

  }

}

const homePublicaciones = async (context) => {

  const {id} = context.user

  const todosLosFollowers = await Follow.find({idUser : id}).populate("follow")

  const followerslist = []

  for await (const data of todosLosFollowers ){

    followerslist.push(data.follow)

  }

    const publicationsLista = []
    for await (const data of followerslist){

      const publications  = await Publicacion.find().where({
        idUser : data._id
      }).sort({createAt : -1}).populate("idUser")

      publicationsLista.push(...publications)

    }

    const result = publicationsLista.sort((a,b) => {
      return new Date(b.createAt) - new Date(a.createAt);
    })

    return result

 

}


export {
    subirPublicacion,
    obtenerpublicacion,
    homePublicaciones
}
