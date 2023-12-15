declare module '*.hbs' {
	import {TemplateDelegate} from 'handlebars/runtime'

	declare const template: TemplateDelegate

	export default template
}
