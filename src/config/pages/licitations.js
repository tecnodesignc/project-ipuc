//Layout container
import master from 'src/layouts/master'
import config from 'src/layouts/config'
import notFound from 'src/layouts/404'

//Middleware
import auth from '@imagina/quser/_router/middlewares/auth'
import access from '@imagina/quser/_router/middlewares/access'

export default {
	//Control panel page
	controlPanel: {
		permission: null,
		activated: true,
		path: '/panel-de-control',
		name: 'licitation.index',
		layout: require('src/layouts/pages/tenders/index').default,
		containerLayout: master,
		title: 'Panel de Control',
		subHeading: 'Tus accesos de interés',
		icon: 'apps',
		middleware: [auth]
	},
	//Control panel page
	licitationMe: {
		permission: 'iauctions.auctions.index',
		activated: true,
		path: '/licitation',
		name: 'licitation.me',
		layout: require('src/layouts/pages/tenders/me').default,
		containerLayout: master,
		title: 'Licitaciones',
		subHeading: 'Licitaciones disponibles',
		icon: 'speaker_notes',
		middleware: [auth]
	},
	//Control panel page
	licitationShow: {
		permission: null,
		activated: true,
		path: '/licitation/:id',
		name: 'licitation.show',
		layout: require('src/layouts/pages/tenders/show').default,
		containerLayout: master,
		title: 'Home',
		icon: 'fas fa-home',
		middleware: [auth]
	},
	//Control panel page
	auctionsIndex: {
		permission: null,
		activated: true,
		path: '/licitation/:id/auctions',
		name: 'auctions.index',
		layout: require('src/layouts/pages/auctions/index').default,
		containerLayout: master,
		title: 'Home',
		icon: 'fas fa-home',
		middleware: [auth]
	},
	//Control panel page
	productsIndex: {
		permission: 'iauctions.products.index',
		activated: true,
		path: '/products',
		name: 'products.index',
		layout: require('src/layouts/pages/products/index').default,
		containerLayout: master,
		title: 'Productos',
		subHeading: 'Productos',
		icon: 'widgets',
		middleware: [auth]
	},
}