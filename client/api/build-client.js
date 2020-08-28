import axios from 'axios'

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // When on the Server
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      headers: req.headers,
    })
  } else {
    // When on the Browser
    return axios.create({
      baseURL: '/',
    })
  }
}
