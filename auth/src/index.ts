import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/users/currentuser', (req, res) =>
  res.json({ message: 'Hello World!' })
)

app.listen(3000, () => console.log('Auth Service running on port 3000'))
