import { Response, Request } from 'express'
import { User } from '../db/entities/user.js'
import { encrypt } from '../utils/encryps.js'
import { isUserDto } from '../utils/user.utils.js'
import jwt from 'jsonwebtoken'
import { DatabaseConnection } from '../db/database.connection.js'
import { InvalidAccessToken } from '../db/entities/invalid.access.tokens.js'
import BadRequestError from '../errors/bad.request.error.js'
import UnathorizedError from '../errors/unathorized.error.js'
import NotFoundError from '../errors/not.found.error.js'

const registerUser = async (req: Request, res: Response) => {
	const body = req.body as unknown
	if (!isUserDto(body)) {
		throw new BadRequestError({
			code: 400,
			message: 'Incorrect body ',
			logging: true,
		})
	}
	const UserRepository = DatabaseConnection.getRepository(User)
	const userExists = await UserRepository.findOne({
		where: {
			id: body.id,
		},
	})
	if (userExists) {
		throw new BadRequestError({
			code: 400,
			message: 'This email or phone is already in use',
			logging: true,
		})
	}

	const user: User = new User()
	;(user.id = body.id), (user.password = encrypt.encryptPassword(body.password))
	user.refreshToken = encrypt.generateRefreshToken({ id: user.id })
	if (await UserRepository.save(user)) {
		const accessToken = encrypt.generateAccessToken({ id: user.id })
		res.cookie('refreshToken', user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 60,
		})
		res.status(201).json({
			accessToken,
			refreshToken: user.refreshToken,
		})
	} else {
		throw new Error('Error while creating user')
	}
}

const getUser = (req: Request, res: Response) => {
	const userId = req.params.userId
	res.status(200).json({
		id: userId,
	})
}

const login = async (req: Request, res: Response) => {
	const body = req.body as unknown
	if (!isUserDto(body)) {
		throw new BadRequestError({
			code: 400,
			message: 'Incorrect body',
			logging: true,
		})
	}
	const UserRepository = DatabaseConnection.getRepository(User)
	const user = await UserRepository.findOne({
		where: {
			id: body.id,
		},
	})
	if (!user) {
		throw new UnathorizedError({
			message: 'User is not registered or incorrect password',
			code: 401,
			logging: true,
		})
	}
	const matchPassword = encrypt.comparePasswords(user.password, body.password)
	if (!matchPassword) {
		throw new UnathorizedError({
			message: 'User is not registered or incorrect password',
			code: 401,
			logging: true,
		})
	}
	user.refreshToken = encrypt.generateRefreshToken({
		id: user.id,
	})
	const accessToken = encrypt.generateAccessToken({
		id: user.id,
	})

	await UserRepository.save(user)

	res.cookie('refreshToken', user.refreshToken, {
		maxAge: 30 * 24 * 60 * 60 * 60,
	})
	res.status(200).json({
		accessToken,
		refreshTokens: user.refreshToken,
	})
}

const refreshTokens = async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies as { refreshToken: string }
	if (!refreshToken) {
		throw new UnathorizedError({
			message: 'User is logged out',
			code: 401,
			logging: true,
		})
	}
	const UserRepository = DatabaseConnection.getRepository(User)

	const user = await UserRepository.findOne({
		where: {
			refreshToken,
		},
	})
	if (!user) {
		throw new NotFoundError({
			code: 404,
			message: 'User is not found',
			logging: true,
		})
	}

	const isValid = jwt.verify(refreshToken, process.env.JWT_SECRET)
	if (!isValid) {
		throw new UnathorizedError({
			message: 'User was logged out from service',
			code: 401,
			logging: true,
		})
	}

	user.refreshToken = encrypt.generateRefreshToken({ id: user.id })
	const accessToken = encrypt.generateAccessToken({ id: user.id })

	res.cookie('refreshToken', user.refreshToken, {
		maxAge: 30 * 24 * 60 * 60 * 60,
	})
	res.status(200).json({
		accessToken,
		refreshTokens: user.refreshToken,
	})
}

const logout = async (req: Request, res: Response) => {
	const UserRepository = DatabaseConnection.getRepository(User)
	await UserRepository.update({ id: req.params.userId }, { refreshToken: '' })
	const InvalidAccessTokenRepository =
		DatabaseConnection.getRepository(InvalidAccessToken)
	await InvalidAccessTokenRepository.save({
		accessToken: req.params.accessToken,
	})
	res.clearCookie('refreshTokens')
	res.sendStatus(204)
}

export { registerUser, getUser, login, refreshTokens, logout }
