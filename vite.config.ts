import {resolve} from 'path'
import {defineConfig} from 'vite'

import {handlebarsPlugin} from './hbs.config'
import handlebars from './vite.plugin.precompile'

const rollupOptions = {
	input: {
		main: resolve('./src/index.html'),
		auth: resolve('./src/pages/auth/index.html'),
		registration: resolve('./src/pages/registration/index.html'),
		chats: resolve('./src/pages/chats/index.html'),
		profile: resolve('./src/pages/profile/index.html'),
		404: resolve('./src/pages/errors/404.html'),
		500: resolve('./src/pages/errors/500.html')
	}
}

export default defineConfig({
	root: resolve(__dirname, 'src'),
	build: {
		outDir: resolve(__dirname, 'dist')
		// rollupOptions
	},
	plugins: [handlebarsPlugin, handlebars()]
})
