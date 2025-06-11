import express from 'express';
import workspaceController from "../controller/worskspace.controller.js"
import authorizationMiddleware from '../middlewares/auth.middleware.js';

const workspaceRouter = express.Router()

workspaceRouter.post('/', authorizationMiddleware, workspaceController.create)
workspaceRouter.delete('/:workspace_id', authorizationMiddleware, workspaceController.delete)
workspaceRouter.get('/', authorizationMiddleware, workspaceController.getAllByMember)

export default workspaceRouter;