import {resolve} from 'node:path'
import handlebars from 'vite-plugin-handlebars'

import {context} from './hbs.context'

export const handlebarsPlugin: any = handlebars({
	partialDirectory: resolve('src/components'),
	context
})
