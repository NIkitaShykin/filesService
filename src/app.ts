import express, { Express } from 'express'
import 'express-async-errors'
import { DatabaseConnection } from './db/database.connection.js'
import cors from 'cors'
import UserRouter from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/error.middleware.js'

DatabaseConnection.initialize()
	.then(async () => {
		console.log('Connection to Database inititalized')
		await DatabaseConnection.runMigrations()
	})
	.catch((err) => {
		console.error('Error during connection to Databaase:', err)
	})
const app: Express = express()
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(UserRouter)
app.use(errorHandler)

export default app
