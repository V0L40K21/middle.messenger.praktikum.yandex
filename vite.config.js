import {resolve} from 'path'
import {defineConfig} from 'vite'

import {handlebarsPlugin} from './hbs.config'
import handlebars from './vite.plugin.precompile'

export default defineConfig({
	root: resolve(__dirname, 'src'),
	build: {
		outDir: resolve(__dirname, 'dist'),
		rollupOptions: {
			input: {
				main: resolve('./src/index.html'),
				404: resolve('./src/pages/errors/404.html'),
				500: resolve('./src/pages/errors/500.html')
			}
		}
	},
	plugins: [handlebarsPlugin, handlebars()]
})
