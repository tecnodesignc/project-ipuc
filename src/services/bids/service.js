import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  index(id, filter, take, page, fields, include, refresh) {
    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;
    return new Promise((resolve, reject) => {
      remember.async("auctions/bids" + key, 3600 * 3, () => {
        return http.get(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+id+'/bids', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }, refresh).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  show(id, include) {
    let key = JSON.stringify(id);
    return new Promise((resolve, reject) => {
      return http.get(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+id+'/bids', {
        params: {
          include: include
        }
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
    });
  },

  create(id, data) {  
    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+id+'/bids', data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update(data, id) {
    return new Promise((resolve, reject) => {
      http.put(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+id +'/bids', data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      http.delete(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+id+'/bids')
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },  
}