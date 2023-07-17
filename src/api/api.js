import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.timeout = 3000

export default {
    get: function(path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(path, {
                params: data
            }).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    post: function(path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(path, data).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}