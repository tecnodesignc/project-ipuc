import users from '@imagina/quser/_config/pages'

//Replace routes form Quser
users.userProfile.layout = require('src/layouts/pages/user/Profile').default
users.userProfile.title = 'Perfil'
users.login.layout = require('src/components/quser/login').default
users.register.layout=require('src/layouts/pages/user/register').default
export default {
	users : users,
	licitations : require('src/config/pages/licitations').default,
	others : require('src/config/pages/others').default,
	application : require('src/config/pages/application').default, //<----- Last always
}