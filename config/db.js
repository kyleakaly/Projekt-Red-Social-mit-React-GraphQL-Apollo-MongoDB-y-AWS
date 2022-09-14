import mongoose from 'mongoose';
import { ApolloServer } from'apollo-server-express'
import typeDefs from '../gql/schema.js'
import resolve from "../gql/resolve.js"
import express from 'express'
import graphqlUploadExpress from "../node_modules/graphql-upload/graphqlUploadExpress.mjs";
import Jwt  from 'jsonwebtoken';



const conectarDB = async ()=>{

    

    try {

         const db = await mongoose.connect(process.env.DDBB,{

            useNewUrlParser : true,
            useUnifiedTopology : true
        
        },
        )
          server();

        
    } catch (error) {
        console.log(error)
    }


}

async function server(){
    const serverApollo = new ApolloServer({

        typeDefs,
        //el resolvers en apollo siempre se pasa en splural
        resolvers: resolve,
        context: ({req}) => {
          const token =  req.headers.authorization

          if(token){

            try {

                const user = Jwt.verify(
                    token.replace("Bearer ",""),
                    process.env.SECRET_KEY
                );

                return {
                    user,
                }

                
            } catch (error) {
                console.log(error)
                throw new Error("token invalido")
            }

          }
            
        }

    });

    	await serverApollo.start()
    const app = express()
    app.use(graphqlUploadExpress());
    serverApollo.applyMiddleware({app})

    await new Promise((resolve) => app.listen({port : process.env.PORT || 4000}, resolve))

    
        console.log(`mongose conectado en http://localhost:4000${serverApollo.graphqlPath}`);

}

export default conectarDB;
