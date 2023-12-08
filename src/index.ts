import {Button} from './components/button'
import {Input} from './components/input'
import {Link} from './components/link'
import './styles/main.scss'
import {registerComponent} from './utils/registerComponent'
import {render} from './utils/render'

registerComponent('Input', Input)
registerComponent('Button', Button)
registerComponent('Link', Link)

window.addEventListener('DOMContentLoaded', () => {
	render('auth')
})
