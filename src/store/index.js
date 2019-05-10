import Vue from 'vue'
import Vuex from 'vuex'

//Modules Store
import app from 'src/store/app/index'; //Application
import auth from '@imagina/quser/_store/index'; //User

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth
  }
});

export default store
