import express, { Request, Response } from 'express'

export const app = express()

app.use('/', (req: Request, res: Response) => {
	res.json({
		message: 'Hello world!',
	})
})
