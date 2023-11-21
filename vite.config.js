import {resolve} from 'path'
import {defineConfig} from 'vite'

import handlebars from './vite.plugin.precompile'

export default defineConfig({
	root: resolve(__dirname, 'src'),
	build: {
		outDir: resolve(__dirname, 'dist')
	},
	plugins: [handlebars()]
})
