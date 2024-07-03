import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterUser: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('entrepreneur')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5001/register', {
        username,
        password,
        role
      })
      navigate('/login')
    } catch (err) {
      console.error('Registration failed', err)
    }
  }

  return (
    <div>
      <h1>Registrar Usuário</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="entrepreneur">Empreendedor</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

export default RegisterUser
