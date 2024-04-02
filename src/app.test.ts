import request from 'supertest'
import app from './app.js'

describe('basic test', () => {
	test('sends greeting', async () => {
		const response = await request(app).get('/')
		expect(response.body).toEqual({ message: 'Hello world!' })
		expect(response.statusCode).toBe(200)
	})
})
