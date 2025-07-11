import express from 'express'
import authorizationMiddleware from '../middlewares/auth.middleware.js'
import workspaceMembersController from '../controller/workspaceMembers.controller.js'

const workspaceMembersRouter = express.Router()

workspaceMembersRouter.post(
    '/:workspace_id',
    authorizationMiddleware,
    workspaceMembersController.add
)

workspaceMembersRouter.get(
    '/:workspace_id',
    authorizationMiddleware,
    workspaceMembersController.getMembersByWorkspaceId
)

export default workspaceMembersRouter