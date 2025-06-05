import { ENVIRONMENT } from "./environment.js";
import { connectDB } from "./config/db.config.js"
import cors from 'cors'

console.log(ENVIRONMENT)
connectDB()

//express
import express from 'express'

//Routes
import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";

const app = express() //crea una aplicacion express

app.use(cors())

app.use(express.json())//configurar que nuesta API pueda recibir JSOn en un body

app.get('/', (request, response) => {
    if(true){
    response.send('hello soy el respuestas')
} else { response.send("Ups! paso algo")}
})

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.post('/users', usersRouter)
app.post('/api/products', productsRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`la app se esta escuchando en el http://localhost:${ENVIRONMENT.PORT}`)
})

import transporter from './config/mail.config.js'
const enviarMailTest = async () => {
    const result = await transporter.sendMail({
        from: ENVIRONMENT.GMAIL_USERNAME,
        to: ENVIRONMENT.GMAIL_USERNAME,
        subject: 'Prueba de envio de',
        html:"<h1>Holaperro</h1>"
    })
    console.log("mail.eviado", result)
}

//users
//import User from "./models/User.model.js"
//import UserRepository from "./repositories/users.repository.js";
////Worspace
//import Workspace from "./models/Worspace.model.js";
//import WorkspaceRepository from "./repositories/workspace.repository.js"
////WoprkspaceMember
//import WorkspaceMembersRepository from './repositories/workspaceMembers.respository.js'
//import WorkspaceMember from "./models/WorkspaceMembers.model.js";
//import {AVAILABLE_ROLES_WORKSPACE_MEMBERS} from './dictonaries/availableRoles.dictonary.js'
////channel
//import Channel from "./models/Channel.model.js";
//import ChannelRepository from "./repositories/channel.repository.js"
////channelMembers
//import ChannelMembers from "./models/ChannelMembers.model.js";
//import ChannelMembersRepository from "./repositories/channelMembers.repository.js";
////ChannelMessage
//import channelMessages from "./models/ChannelMessages.model.js";
//import channelMessagesRepository from "./repositories/channelMesseges.repository.js";
////products
//import productsRepository from "./repositories/products.repository.js";
//controlladores
//import usersController from "./controller/users.controller.js";
//import productsController from "./controller/products.controller.js";
//enviarMailTest()


/*const User = require("./models/User.model.js")
const userRepository = require("./repositories/users.repository.js")
const Workspace = require('./models/Worspace.model.js')

connectDB()

console.log("hola crack genion idolo maquina")
console.log(ENVIRONMENT) 

userRepository.create({name: "Sim", password:"Fela1234", email:"simelrey@gmail.com"})

const workspace = new Workspace({
    name: 'Espacio de trabajo namberuan',
    description: 'Hola gatos...',
    owner_id: '67f820c57d1ab72d2f404233'
})

workspace.save()*/

