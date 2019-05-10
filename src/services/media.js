import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  delete(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/profile/users/media/delete', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
}