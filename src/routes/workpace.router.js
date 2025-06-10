import express from 'express';
import workspaceController from "../controller/worskspace.controller.js"
import authorizationMiddleware from '../middlewares/auth.middleware.js';

const workspaceRouter = express.Router()

workspaceRouter.post('/', authorizationMiddleware, workspaceController.create)
workspaceRouter.delete('/:workspace_id', authorizationMiddleware, workspaceController.deleteWorkspace)
workspaceRouter.get('/api/worskpace', workspaceController.getAll)

export default workspaceRouter;