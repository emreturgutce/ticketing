import axios from 'axios'

const LandingPage = ({ currentUser }) => <h1>This is 🐱‍👓 Landing Page</h1>

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    // When on the Server
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers,
      }
    )

    return data
  } else {
    // When on the Browser
    const { data } = await axios.get('/api/users/currentuser')

    return data
  }
}

export default LandingPage
