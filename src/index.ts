import {Button} from './components/button'
import {ChatListItem} from './components/chatListItem/ChatListItem'
import {ChatsBottom} from './components/chatsBottom/ChatsBottom'
import {ChatsHeader} from './components/chatsHeader/ChatsHeader'
import {Input} from './components/input'
import {Link} from './components/link'
import {ProfileListItem} from './components/profileListItem/profile.listItem'
import './styles/main.scss'
import {registerComponent} from './utils/registerComponent'
import Router from './utils/router/Router'

registerComponent('Input', Input)
registerComponent('Button', Button)
registerComponent('Link', Link)
registerComponent('ProfileListItem', ProfileListItem)
registerComponent('ChatListItem', ChatListItem)
registerComponent('ChatsHeader', ChatsHeader)
registerComponent('ChatsBottom', ChatsBottom)

// export const router = new Router()
// router.use('/', Auth).use('/registration', Registration).start()

Router.start()
