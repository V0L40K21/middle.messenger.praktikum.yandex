import {resolve} from 'node:path'
import handlebars from 'vite-plugin-handlebars'

export const handlebarsPlugin: any = handlebars({
	partialDirectory: resolve('src/components')
})
