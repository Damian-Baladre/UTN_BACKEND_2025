
import User from "../models/User.model.js"

class UserRepository {

   async create({name, password, email}){
       const user = new User({name, password, email})
       await user.save()
       console.log("Usuario creado sexitosamente")
    }


async getAll(){
    const users = await User.find()
    return users
}

 async findByEmail({email}){
        return await User.findOne({email: email})
    }

async verifyUserEmail ({email}){
        //.find es un filter de js
        //.findOne es un find de js
        /* Lo dejamos para la proxima */
        const userFound = await this.findByEmail({email}) //filtramos a todos los usuarios que cumplan esta condicion
        console.log({userFound})
        if(userFound.verified){
            //throw lo uso para lanzar mi propio error
            throw {status: 400, message:"Usuario ya validado"}
            
        }
        else{
           
            const result = await User.findByIdAndUpdate(
                userFound._id, //consultar bien esto porque esta raro
                {
                    $set: {
                        verified: true
                    }
                },
                {
                    runValidators: true, // ejecuta los validaroes del sistema
                    new: true //Cuando se ejecute el update nos actualice el retorno
                }
            )
            console.log({result})
        }
    }
   
    }  

const userRepository = new UserRepository()
export default UserRepository