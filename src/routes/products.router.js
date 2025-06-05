import express from 'express'

import productsController from "../controller/products.controller.js"

const productsRouter = express.Router()

//Retorna la lista de todos los productos
productsRouter.get('/', productsController.getAll)
//Permite crear un nuevo producto.
productsRouter.post('/', productsController.create)

export default productsRouter;