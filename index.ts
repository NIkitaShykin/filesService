import { app } from './src/app.js'
import 'dotenv/config'

const PORT = 3000

app.listen(process.env.PORT || PORT, () =>
	console.log(`Server running on ${process.env.PORT || PORT}`)
)
