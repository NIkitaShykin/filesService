import { DataSource } from 'typeorm'

export const DatabaseConnection: DataSource = new DataSource({
	type: 'mysql',
	host: `${process.env.DB_HOST}`,
	port: process.env.DB_PORT,
	username: `${process.env.DB_USER}`,
	password: `${process.env.DB_PASSWORD}`,
	database: `${process.env.DB_NAME}`,
	entities: ['src/entity/*.js'],
	logging: true,
	migrations: ['src/migrations/*.js'],
	migrationsTableName: '',
})
