import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import Token from '../helper/token.js'
import {awsUploadImage} from '../utils/aws-upload-image.js'


async function register(input){

    const newUser = input;
    newUser.email = newUser.email.toLowerCase();
    newUser.username = newUser.username.toLowerCase();

    const { email,username,password } = newUser;

    //Revisamis si el email esta en uso

    const foundEmail = await User.findOne({ email });
    if(foundEmail) throw new Error("El email ya esta en uso")
    console.log(foundEmail)

    const foundUsername = await User.findOne({ username })
    if(foundUsername) throw new Error("el nombre de usuario ya esta en uso");
    console.log(newUser)

    //encriptar
    const salt = await bcrypt.genSaltSync(10);
    newUser.password = await bcrypt.hash(password,salt)

    try {

        const user = new User(newUser)
        user.save();
        return user;
        
    } catch (error) {
        console.log(error)
    }


}


const login = async (input) => {

    const { email,password } = input;

    const userFound = await User.findOne({email:email.toLowerCase()});
    if(!userFound) throw new Error("Error en el email o contraseöa");

    const passwordSucess = await bcrypt.compare(password, userFound.password);
    if(!passwordSucess) throw new Error("Error en el email o contraseöa");

    return {
        token : Token(userFound,process.env.SECRET_KEY,"24h")
    }

}

const getUser = async (id,username) => {

    let user = null

    if(id){

        user = await User.findById(id);

    }
    if(username){

        user = await User.findOne({username : username});

    }

    if(!user || !username){

        throw new Error("El usuario no existe")

    }
    return user

}

const updateAvatar = async (file,context) => {

   

    const {id} = context.user

   

    const { createReadStream ,mimetype } = await file;
    const extensio = mimetype.split("/")[1]
    const imageName = `avatar/${id}.${extensio}`
    const fileDate = createReadStream();

    try {

        const result = await awsUploadImage(fileDate, imageName)

        await User.findByIdAndUpdate(id,{

            avatar : result,

        });

        

        return {
            status: true,
            urlAvatar : result
        }
        
    } catch (error) {

       
        
        return {
            status : false,
            urlAvatar : null
        }

    }
}

const deleteAvatar = async (context) => {

    const {id} = context.user;

    try {

        await User.findByIdAndUpdate(id,{avatar : ""})
        return true
        
    } catch (error) {
        
        console.log(error)
        return false;

    }

}

const editarPerfil = async (input,context) => {

    const {id} = context.user;

    try {


        if(input.password && input.nuevopassword){
            //cambiara la contrasena
            const userFound = await User.findById(id);

            // Usamos bcrypt.compare para comparar la contrasena en plano con la contrasena incriptada 
            const passwordSucess = await bcrypt.compare(
                input.password,
                userFound.password

            );
               
            if(!passwordSucess){
                throw new Error("Contrasena incorrecta");
                
            }
            
            const salt = await bcrypt.genSaltSync(10);
            const newPasswordCrypt = await bcrypt.hash(input.nuevopassword,salt)
            await User.findByIdAndUpdate(id,{password : newPasswordCrypt})

        }else {

            await User.findByIdAndUpdate(id,input)

        }

        return true;

        
    } catch (error) {
        
        console.log(error)
        return false;

    }

    

}

const searchss = async (searchs) => {

    

    try {

        const usert = await User.find({

            //si queremos que nos encuentre muchos usuarios a la vey podemos utilizar $regex
            username : {$regex : searchs, $options: 'i'}
        })
        return usert
        
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
    


}

export {
    register,
    login,
    getUser,
    updateAvatar,
    deleteAvatar,
    editarPerfil,
    searchss
    
    
}


