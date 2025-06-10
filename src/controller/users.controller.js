import transporter from "../config/mail.config.js"
import { ENVIRONMENT } from "../environment.js";
import usersRepository from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const sendVerification = async ({ email, name, redirect_url }) => {
    try{
    const result = await transporter.sendMail(
        {
            from: ENVIRONMENT.GMAIL_USERNAME,
            to: email,
            subject: "Verificacion de correo electronico",
            html: `<h1>Hola ${name}</h1>
            <p> Necesitamos que le des click al boton de abajo porque
             sino sos voleta, me entendiste!?</p>
             <a href='${redirect_url}'> clickea acá, máquina</a>
            <span>tenes 7 dias para hacerlo, de lo contrario, anda despidiendote de tus seres queridos...</span>`
        }
    )
    console.log('Mail enviado:', result);
} catch(error){
    console.error('Error al enviar el correo', error);
}
}

class UserController {
    async register(request, response) {
        if (!request.body || !request.body.name || !request.body.password || !request.body.email) {
            response.status(400).send({
                message: 'Registro invalido',
                ok: false
            })
        }

        const password_hashed = await bcrypt.hash(request.body.password, 12)

        await usersRepository.create({
            name: request.body.name,
            password: password_hashed,
            email: request.body.email
        })

        const verification_token = jwt.sign({ email: request.body.email }, ENVIRONMENT.JWT_SECRET_KEY)

        await sendVerification(
            {
                email: request.body.email,
                name: request.body.name,
                redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verification_token}`
            }
        )
        response.send({
            message: 'Recibido!! Revisa tu mail.',
            ok: true
        })
    }
    async getAll(request, response) {
        response.send()
    }
    async verify(request, response) {
        try {
            const verification_token = request.query.verify_token

            if (!verification_token) {
                response.status(400).send(
                    {
                        ok: false,
                        message: " Donde esta el token de verificacion?"
                    });
                return
            }

            const contenido = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY)

            console.log({ contenido })

            await usersRepository.verifyUserEmail({ email: contenido.email })

            response.send({
                status: 200,
                ok: true,
                message: "Usuario valido con exito"
            })
        }
        catch (error) {
            console.log("Hubo un error", error)
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    })
                return
            }
            else {
                response.status(500).send({ message: "Error interno del servidor" })
            }
        }

    }

    async login(request, response) {
        try {
            const { email, password } = request.body

            if (!email) {
                throw { status: 400, message: 'nohay Imeil!' }
            }
            if (!password) {
                throw { status: 400, message: 'nohay contraseña!' }
            }

            const user = await usersRepository.findByEmail({ email: email })
            
            if (!user) {
                throw { status: 404, message: "Usuario no encontrado!" }
            }
            //1robi: verificacr que el mail este validado
            if (!user.verified) {
                throw { status: 400, message: 'Valida tu mail primero' }
            }

            //2do: verficiar si la contrasenia que paso coincide con la de DB
            const is_same_passaword = await bcrypt.compare(password, user.password)
            if (!is_same_passaword) {
                throw { status: 400, message: "Contraseña incorrecta!" }
            }
            //3ro crear un token con los datos no sensibles del usuario (sesio)
            const authorization_token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user._id,
                created_at: user.created_at
            },
                ENVIRONMENT.JWT_SECRET_KEY)
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
        catch (error) {
            console.log("Hubo un error", error)
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else {
                response.status(500).send({ message: "Error interno del servidor" })
            }
        }
    }
}

const usersController = new UserController()
export default usersController
