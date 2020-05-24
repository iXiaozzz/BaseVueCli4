import axios from 'axios'

const request = (url, data = {}, method = 'post') => {
  return new Promise((resolve) => {
    const options = {
      url,
      method,
      data
    }
    axios(options).then(res => {
      resolve(res)
    })
  })
}
const http = { request }
export default http
