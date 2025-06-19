import express from 'express'
import channelController from '../controller/channel.controller.js'
import authorizationMiddleware from '../middlewares/auth.middleware.js'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
const channelRouter = express.Router()

channelRouter.post('/:workspace_id',
    authorizationMiddleware,
    workspaceMiddleware,
    channelController.create
)
channelRouter.get('/:workspace_id',
    authorizationMiddleware,
    workspaceMiddleware,
    channelController.getAllByWorkspaceId
)
channelRouter.delete('/:workspace_id/:channel_id',
    authorizationMiddleware,
    workspaceMiddleware,
    channelController.deleteById
)

export default channelRouter