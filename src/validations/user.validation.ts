import { check, oneOf } from 'express-validator'
import { DatabaseConnection } from '../db/database.connection.js'
import { User } from '../db/entities/user.js'

const checkExist = async (value: string) => {
	const user = await DatabaseConnection.getRepository(User).findOne({
		where: {
			id: value,
		},
	})
	if (user) {
		throw new Error('Id is already in use')
	}
}

export const loginValidator = [
	oneOf([
		check('id')
			.exists()
			.withMessage('Id is required')
			.trim()
			.isEmail()
			.withMessage('Id must be email or phone number'),
		check('id')
			.exists()
			.withMessage('Id is required')
			.isMobilePhone('any')
			.withMessage('Id must be email or phone number'),
	]),
	check('password').exists().withMessage('Password is required'),
]

export const signupValidation = [
	oneOf([
		check('id')
			.exists()
			.withMessage('Id is required')
			.isEmail()
			.withMessage('Id must be email or phone number'),
		check('id')
			.exists()
			.withMessage('Id is required')
			.isMobilePhone('any')
			.withMessage('Id must be email or phone number'),
		check('id').exists().withMessage('Id is required').custom(checkExist),
	]),
	check('password').exists().withMessage('Password is required'),
]
