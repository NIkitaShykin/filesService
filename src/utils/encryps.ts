import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface payload {
	id: string
}

export class encrypt {
	static encryptPassword(password: string): string {
		return bcrypt.hashSync(password, 12)
	}

	static comparePasswords(hashPassword: string, password: string): boolean {
		return bcrypt.compareSync(password, hashPassword)
	}

	static generateAccessToken(payload: payload): string {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' })
	}

	static generateRefreshToken(payload: payload): string {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' })
	}
}
