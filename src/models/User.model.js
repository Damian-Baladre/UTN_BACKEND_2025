import mongoose from "mongoose" 

const userSchema = new mongoose.Schema(
    //objeto de config/defincion del esquema
    {
        email:{
            type: String, //validacion de datos
            required: true,
            unique: true
        },
        name:{
            type: String,
            requiered: true
        },
        password:{
            type: String,
            required: true
        },
        verified:{
            type: Boolean,
            required: true,
            default: false
        },
        created_at:{
            type: Date,
            default: new Date()
        }
    }
)

//con esto definimos la colecion de users, estara atada a esta validacion
const User = mongoose.model('Users', userSchema)
//mongoose.model('Premiun_Users', userSchema)

export default User