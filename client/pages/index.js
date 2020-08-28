import axios from 'axios'
import buildClient from '../api/build-client'

const LandingPage = ({ data }) => {
  return data.currentUser ? (
    <h1>This is 🐱‍👓 Landing Page</h1>
  ) : (
    <h1>You are not signed in</h1>
  )
}

LandingPage.getInitialProps = async ({ req }) => {
  const { data } = await buildClient({ req }).get('/api/users/currentuser')
  console.log(data)
  return data
}

export default LandingPage
