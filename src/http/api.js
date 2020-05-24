import http from '@/http/'
// let test = 'http://uatpc.study.aihuaol.com/api'
let test = 'https://testwshop.aihuaol.com/api'
const baseUrl = process.env.NODE_ENV === 'development' ? test : '/api'

const  api = {
    test(){
        return http.request(baseUrl +'/login','','post')
    }
}


export default api