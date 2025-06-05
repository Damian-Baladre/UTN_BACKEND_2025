import transporter from "../config/mail.config.js"
import { ENVIRONMENT } from "../environment.js";
import usersRepository from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const sendVerification = async (email, name, redirect_url) => {
    const result = await transporter.sendMail(
        {
            from: ENVIRONMENT.GMAIL_USERNAME,
            to: email,
            subjetc: "Verificacion de correo electronico",
            html: `<h1>Hola ${name}</h1>
            <p> Necesitamos que le desclick al boton de abajo porque
             sino sos voleta, me entendistye?</p>
             <a href='${redirect_url}'> clickea aca, bro</a>
            <span>tenes 7 dias para hacerlo o si no despedite de tus seres
             queridos</span>`
        }
    )
    console.log('Mail enviado:', result)
}


class UserController {
    async register (request, response){
          /* Validamos que llegen los datos */
          if(!request.body || !request.body.name || !request.body.password || !request.body.email){
            response.status(400).send({
                message: 'Registro invalido', 
                ok: false
            })
            
        }
        //hashear la contrasenia
        const password_hashed = await bcrypt.hash(request.body.password, 12)

        await usersRepository.create({
            name: request.body.name,
            password: password_hashed,
            email: request.body.email
        })

        
            //emitimos un token con cierta firma
            //
        const verification_token = jwt.sing({email: request.body.email}, ENVIRONMENT.JWT_SECRET_KEY )

        await sendVerification(
            {
                email: request.body.email,
                nameL: request.body.name,
                redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verification_token}`
            }
        )

        response.send({
            message: 'Recibido!! Revisa tu mail.',
            ok: true
        })
    }
    async getAll (request, response){
        response.send()
    }
    async verify(request, response){//necesitamos captura el parametro de consulta verify
        try {
            const verification_token = request.query.verify_token
                //1ero neceisto verifiar el token que emiti
            if(!verification_token){
                response.status(400).send(
                    {
                        ok: false,
                        message: " Donde esta el token de verificacion"
                    }
                )
                return
            }
            //verify intenta ver si la firma es correcta sino emitira error (throw)
            const contenido = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY)

            console.log({contenido})
            //2do buscar el usuario por mail
                //3ro, chekeamos que no este validado
                //4to, if (!3) cambiamos al usuairo d
            await usersRepository.verifyUserEmail({email: contenido.email})

            response.send({
                status: 200,
                ok: true,
                message: "Usuario valido con exito"
            })
        }
        catch(error) {  //capturo el error
            console.log("Hubo un error", error)
            if(error.status){ //chekeo si tiene status ysi es un error mio
                response.status(error.status).send( //voy a responder con el error
                    {
                        message: error.message,
                        ok: false
                    })
                    return // corrto mi ejecucion
            }
            else{
                response.status(500).send({message: "Error interno del servidor"})
            }
        }
        
    }

    async login (request, response){
        try{
            const {email, password} = request.body

            if(!email){
                throw{status: 400, message: 'nohay Imeil!'}
            }
            if(!password){
                throw{status: 400, message: 'nohay contraseña!'}
            }

            //1ro busca al usuario en DB por mail
            const user = await usersRepository.findByEmail({email: email})
            if(!user){
                throw {status: 404, message:"Usuario no encontrado!"}
            }
//1robi: verificacr que el mail este validado
            if(!user.verified){
                throw{status: 400, message: 'Valida tu mail primero' }
            }

            //2do: verficiar si la contrasenia que paso coincide con la de DB
            const is_same_passaword = await bcrypt.compare(password, user.password)
            if(!is_same_passaword){
                throw {status: 400, message: "Contraseña incorrecta!"}
            }
            //3ro crear un token con los datos no sensibles del usuario (sesio)
            const authorization_token = jwt.sign({
                name: user.name,
                email: user.emai,
                created_at: user.created_at
            },
        ENVIRONMENT.JWT_SECRET_KEY )
            //4to responder con el token
            response.send({
                ok: true,
                status: 200,
                message: 'Usuario logueado',
                data: {
                    authorization_token: authorization_token
                }
            })
        }
        catch(error){
            console.log("Hubo un error", error)
            if(error.status){
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else{
                response.status(500).send({message: "Error interno del servidor"})
            }
        }
    }
}

const usersController = new UserController()
export default usersController


                //3ro, chekeamos que no este validado
                //4to, if (!3) cambiamos al usuairo d