import jwt from 'jsonwebtoken'


const Token = (user,SECRET_KEY,expiresIn) => {

    const {id,name,email,username,avatar} = user;
    const payload = {

        id,
        name,
        email,
        username,
        avatar

    };

    

    return jwt.sign(payload,SECRET_KEY,{expiresIn});

}

export default Token