import Handlebars from 'handlebars'
import {PluginOption} from 'vite'

export default function handlebars(): PluginOption {
	const fileRegexp = /\.hbs$|\.handlebars$/
	return {
		name: 'vite.plugin.precompile',
		transform(src: string, id: string) {
			if (!fileRegexp.test(id)) {
				return null
			}
			const code = `
				import Handlebars from 'handlebars/runtime'
				export default Handlebars.template(${Handlebars.precompile(src)})
			`
			return {code}
		}
	}
}
