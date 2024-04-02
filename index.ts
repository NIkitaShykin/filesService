import app from './src/app.js'
import 'dotenv/config'

const PORT: number =
	process.env.NODE_DOCKER_PORT || process.env.NODE_LOCAL_PORT || 3000
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
