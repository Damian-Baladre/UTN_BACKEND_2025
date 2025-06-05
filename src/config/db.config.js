import mongoose from 'mongoose'
import { ENVIRONMENT } from '../environment.js'

export const connectDB = async () => {
    try{
            await mongoose.connect(
       `${ENVIRONMENT.DB_URL}/${ENVIRONMENT.DB_NAME}`
    )
    console.log("conexion epsitosa")
}
catch(error) {
    console.error('Hubo un error')
}
}
connectDB()
