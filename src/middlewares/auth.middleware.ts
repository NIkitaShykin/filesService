import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { payload } from '../utils/encryps.js'
import { DatabaseConnection } from '../db/database.connection.js'
import { User } from '../db/entities/user.js'
import { InvalidAccessToken } from '../db/entities/invalid.access.tokens.js'
import UnathorizedError from '../errors/unathorized.error.js'
import NotFoundError from '../errors/not.found.error.js'

export default async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.headers.authorization) {
		throw new UnathorizedError({
			message: 'Missed authorization',
			code: 401,
			logging: true,
		})
	}
	const token = req.headers.authorization.split(' ')[1]
	if (!token) {
		throw new UnathorizedError({
			message: 'Invalid authorization token',
			code: 401,
			logging: true,
		})
	}
	const data = jwt.verify(token, process.env.JWT_SECRET) as payload
	if (!data) {
		throw new UnathorizedError({
			message: 'Token expired',
			code: 401,
			logging: true,
		})
	}
	const UserRepository = DatabaseConnection.getRepository(User)
	const user = await UserRepository.findOne({
		where: {
			id: data.id,
		},
	})
	if (!user) {
		throw new NotFoundError({
			code: 404,
			message: 'User not found',
			logging: true,
		})
	}
	const InvalidAccessTokenRepository =
		DatabaseConnection.getRepository(InvalidAccessToken)
	const isLoggedOut = await InvalidAccessTokenRepository.findOneBy({
		accessToken: token,
	})
	if (isLoggedOut) {
		throw new UnathorizedError({
			message: 'User is logged out',
			code: 401,
			logging: true,
		})
	}
	req.params.userId = user.id
	req.params.accessToken = token
	next()
}
