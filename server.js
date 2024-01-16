import express from 'express'
import {resolve} from 'node:path'
import fallback from 'express-history-api-fallback'

const app = express()

app.use(express.static(resolve('dist')))
app.use(fallback('index.html', {root: resolve('dist')}))

app.listen(process.env.port || 3000, () =>
	console.log(`App listening on port ${process.env.port ?? 3000}`)
)
