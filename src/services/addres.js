import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  create(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/profile/addresses', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update(data, id_address) {
    return new Promise((resolve, reject) => {
      http.put(config('apiRoutes.api.api_url') + '/profile/addresses/' + id_address, data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete(id_address) {
    return new Promise((resolve, reject) => {
      http.delete(config('apiRoutes.api.api_url') + '/profile/addresses/'+id_address)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
}