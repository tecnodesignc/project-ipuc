import {Cookies, LocalStorage} from 'quasar'
import config from 'src/config/index'
import http from "axios"
import {remember} from '@imagina/qhelper/_plugins/remember'

export default {

  indexRemember(filter, take, page, fields, include, refresh) {
    filter = JSON.stringify(filter);
    let key = ":" + JSON.stringify(filter + take + page + fields + include);
    key = key == ":null" ? "" : key;
    return new Promise((resolve, reject) => {
      remember.async("products" + key, 3600 * 3, () => {
        return http.get(config('apiRoutes.api.api_url') + '/iauctions/products', {
          params: {
            filter: filter,
            take: take,
            page: page,
            fields: fields,
            include: include
          }
        })
      }, true).then(response => {
        resolve(response);
      })
        .catch(error => {
          reject(error);
        });
    });
  },

  index(filter, take, page, fields, include) {
    return new Promise((resolve, reject) => {
      return http.get(config('apiRoutes.api.api_url') + '/iauctions/products',{
        params: {
          filter: filter,
          take: take,
          page: page,
          fields: fields,
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

  show(id) {
    let key = JSON.stringify(id);
    return new Promise((resolve, reject) => {
      return http.get(config('apiRoutes.api.api_url') + '/iauctions/products/' + id, {params:{}})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  create(data) {  
    return new Promise((resolve, reject) => {
      http.post(config('apiRoutes.api.api_url') + '/iauctions/products', data)
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
      http.put(config('apiRoutes.api.api_url') + '/iauctions/products/' + id, data)
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
      http.delete(config('apiRoutes.api.api_url') + '/iauctions/products/'+id)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  addProducts(id,  data) {
    return new Promise((resolve, reject) => {
      let pathRequest = config('apiRoutes.api.api_url') + '/iauctions/products/' + id + '/join'
      http.put(pathRequest,data)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  
}