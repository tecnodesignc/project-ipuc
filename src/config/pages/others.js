//Layout container
import master from 'src/layouts/master'
import config from 'src/layouts/config'
import notFound from 'src/layouts/404'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Control panel page
	usreRegister: {
		permission: null,
		activated: true,
		path: '/register',
		name: 'user.register',
		layout: require('src/layouts/pages/user/register').default,
		containerLayout: master,
		title: 'Home',
		icon: 'fas fa-home',
		middleware: [auth]
	},
	pajonalesProfile:{
		permission: null,
		activated: true,
		path: '/provider',
		name: 'user.profile.provider',
		layout: require('src/layouts/pages/user/register').default,
		containerLayout: master,
		title: 'Provider',
		icon: 'fas fa-home',
		middleware: [auth]
	}

}