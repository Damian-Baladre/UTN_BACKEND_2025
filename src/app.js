import { ENVIRONMENT } from "./environment.js";
import { connectDB } from "./config/db.config.js"
import cors from 'cors'
import authorizationMiddleware from './middlewares/auth.middleware.js'

console.log(ENVIRONMENT)
connectDB()

import express, { request, response } from 'express'

import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import workspaceRouter from "./routes/workpace.router.js"
import workspaceMembersRouter from "./routes/workspaceMembers.router.js";
const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (request, response) => {
    if (true) {
        response.send('hello soy el respuestas')
    } else { response.send("Ups! paso algo") }
})

app.get('/test-tonto', (request, response) => {
    response.send('hola soy el tontos')
})

app.get('/ping', (request, response) => {
    response.send('<h1>Server is running</h1>')
})

app.get('/private-info', authorizationMiddleware, (request, response) => {
    try {
        response.send("clave super importante que solo el usuario beria poder acceder")
    }
    catch (error) {
        response.status(500).send({
            ok: false,
            message: 'error interno del servidor',
            status: 500
        })
    }
})
app.post('/crear-workspace', authorizationMiddleware, (request, response) => {
    console.log(request.user)
    response.send('workspace creado por el usuario ' + request.user.id)
})

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/members', workspaceMembersRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`la app se esta escuchando en el http://localhost:${ENVIRONMENT.PORT}`)
})

import transporter from './config/mail.config.js'
const enviarMailTest = async () => {
    const result = await transporter.sendMail({
        from: ENVIRONMENT.GMAIL_USERNAME,
        to: ENVIRONMENT.GMAIL_USERNAME,
        subject: 'Prueba de envio de',
        html: "<h1>Holaperro</h1>"
    })
    console.log("mail.eviado", result)
}