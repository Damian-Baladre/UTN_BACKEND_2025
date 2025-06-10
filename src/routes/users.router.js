import express from 'express';

import usersController from "../controller/users.controller.js";

const usersRouter = express.Router()

usersRouter.get('/', usersController.getAll)

usersRouter.post('/register', usersController.register)
usersRouter.post('/login', usersController.login)
usersRouter.get('/verify', usersController.verify)


export default usersRouter