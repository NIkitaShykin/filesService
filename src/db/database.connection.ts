import { DataSource } from 'typeorm'
import { User } from './entities/user.js'
import { InvalidAccessToken } from './entities/invalid.access.tokens.js'

export const DatabaseConnection: DataSource = new DataSource({
	type: 'mysql',
	host: `${process.env.DB_HOST}`,
	port: process.env.DB_PORT,
	username: `${process.env.DB_USER}`,
	password: `${process.env.DB_PASSWORD}`,
	database: `${process.env.DB_NAME}`,
	// entities: ['src/db/entities/*{.ts,.js}'],
	entities: [User, InvalidAccessToken],
	logging: true,
	migrations: ['src/db/migrations/*{.ts,.js}'],
	synchronize: false,
})
