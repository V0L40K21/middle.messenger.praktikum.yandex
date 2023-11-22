import handlebars from 'vite-plugin-handlebars'
import {resolve} from 'node:path'

const context = {
	main: {
		test: 'abc'
	}
}

export const handlebarsPlugin = handlebars({
	partialDirectory: resolve('src/pages'),
	context
})
