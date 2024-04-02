import * as express from 'express'
import {
	getUser,
	login,
	logout,
	refreshTokens,
	registerUser,
} from './../controllers/user.controller.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import {
	loginValidator,
	signupValidation,
} from '../validations/user.validation.js'
import { handleValidationErrors } from '../middlewares/validation.middleware.js'

const UserRouter = express.Router()

UserRouter.post(
	'/signup',
	signupValidation,
	handleValidationErrors,
	registerUser
)
UserRouter.get('/info', authMiddleware, getUser)
UserRouter.post('/signin', loginValidator, handleValidationErrors, login)
UserRouter.post('/signin/new_token', refreshTokens)
UserRouter.get('/logout', authMiddleware, logout)

export default UserRouter
