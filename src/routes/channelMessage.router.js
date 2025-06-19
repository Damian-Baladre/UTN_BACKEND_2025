import express from 'express'
import channelController from '../controller/channel.controller.js'
import authorizationMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import channelMiddleware from '../middlewares/channel.middleware.js'

const channelMessageRouter = express.Router()


channelMessageRouter.get('/:workspace_id/:channel_id',
    authorizationMiddleware,
    workspaceMiddleware,
    channelMiddleware,
    channelController.getMessagesByChannelId
)


export default channelMessageRouter