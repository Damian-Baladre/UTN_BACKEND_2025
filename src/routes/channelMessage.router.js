import express from 'express'
import channelMessageController from '../controller/channelMessage.controller.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import channelMiddleware from '../middlewares/channel.middleware.js'
import authorizationMiddleware from '../middlewares/auth.middleware.js'

const channelMessageRouter = express.Router()
channelMessageRouter.use(authorizationMiddleware)


channelMessageRouter.post('/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware,
    channelMessageController.create
)

channelMessageRouter.get('/:workspace_id/:channel_id',
    workspaceMiddleware,
    channelMiddleware,
    channelMessageController.getAllByChannelId
)


export default channelMessageRouter