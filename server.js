import express from 'express'
import {resolve} from 'node:path'

const app = express()

app.use(express.static(resolve('dist')))

app.listen(process.env.port || 3000, () =>
	console.log(`App listening on port ${process.env.port ?? 3000}`)
)
