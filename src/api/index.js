import axios from 'axios'
import Config from '../config'

const request = axios.create({
  baseURL: Config.apiUrl,
  // headers: {'X-Custom-Header': 'foobar'}
})

export default request
