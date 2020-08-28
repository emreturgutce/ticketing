import axios from 'axios'
import buildClient from '../api/build-client'

const LandingPage = ({ currentUser }) => <h1>This is 🐱‍👓 Landing Page</h1>

LandingPage.getInitialProps = async ({ req }) => {
  const { data } = await buildClient({ req }).get('/api/users/currentuser')

  return data
}

export default LandingPage
