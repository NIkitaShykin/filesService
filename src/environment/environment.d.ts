declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_LOCAL_PORT: number
			NODE_DOCKER_PORT: number
			DB_HOST: string
			DB_PORT: number
			DB_USER: string
			DB_PASSWORD: string
			DB_NAME: string
			JWT_SECRET: string
		}
	}
}

export {}
