import express, { Request, Response, Express } from 'express'
import { DatabaseConnection } from './db/database.connection.js'

DatabaseConnection.initialize()
	.then(() => {
		console.log('Connection to Database inititalized')
	})
	.catch((err) => {
		console.error('Error during connection to Databaase:', err)
	})

export const app: Express = express()

app.use('/', (req: Request, res: Response) => {
	res.json({
		message: 'Hello world!',
	})
})
