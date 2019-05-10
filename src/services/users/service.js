import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {
  register(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/profile/v1/auth/register', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
}