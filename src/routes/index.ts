import * as express from 'express'
import UserRouter from './user.routes.js'
import FileRouter from './files.routes.js'

const Routes = express.Router()
Routes.use(UserRouter)
Routes.use(FileRouter)

export default Routes
