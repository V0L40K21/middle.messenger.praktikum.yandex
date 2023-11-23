import handlebars from 'vite-plugin-handlebars'
import {resolve} from 'node:path'

import {context} from './hbs.context'

export const handlebarsPlugin = handlebars({
	partialDirectory: resolve('src/components'),
	context
})
