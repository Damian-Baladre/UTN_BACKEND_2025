import { ENVIRONMENT } from "./environment.js";
import { connectDB } from "./config/db.config.js"
import cors from 'cors'
console.log(ENVIRONMENT)
connectDB()

import express from 'express'

import usersRouter from "./routes/users.router.js";
import productsRouter from "./routes/products.router.js";
import workspaceRouter from "./routes/workpace.router.js"
import workspaceMembersRouter from "./routes/workspaceMembers.router.js";
import channelRouter from "./routes/channel.router.js";
import channelMessageRouter from "./routes/channelMessage.router.js";



const app = express()
app.use(cors())
app.use(express.json())

app.get('/ping', (request, response) => {
    response.send('<h1>Server is running</h1>')
})

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/workspace', workspaceRouter)
app.use('/api/members', workspaceMembersRouter)
app.use('/api/channels', channelRouter)
app.use('/api/messages', channelMessageRouter)

app.listen(ENVIRONMENT.PORT, () => {
    console.log(`la app se esta escuchando en el http://localhost:${ENVIRONMENT.PORT}`)
})

