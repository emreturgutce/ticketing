import { useState } from 'react'
import useRequest from '../../hooks/use-request'
import Router from 'next/router'

export default () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  })

  const handleSubmit = e => {
    e.preventDefault()

    doRequest()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label>Email Address</label>
        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className='form-control'
        />
      </div>
      {errors}
      <button className='btn btn-primary'>Sign Up</button>
    </form>
  )
}
