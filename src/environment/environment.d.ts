declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_LOCAL_PORT: number
			DB_HOST: string
			DB_PORT: number
			DB_USER: string
			DB_PASSWORD: string
			DB_NAME: string
		}
	}
}

export {}
