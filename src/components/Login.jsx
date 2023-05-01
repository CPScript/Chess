import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setUsername(e.target.value)
  }
  function handleSubmit() {
    if(username.length < 4) return
    navigate('/new-game')
  }

  if(user) {
    return <Navigate to='/' />
  }
  
  return (
    <div>
      <label>Choose a name</label>
      <input type='text' value={username} onChange={handleChange} />
      <button onClick={handleSubmit}>Let's Go!</button>
    </div>
  )
}