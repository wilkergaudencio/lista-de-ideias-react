import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  DivForm,
  Input,
  RegisterContainer,
  Select,
  Option
} from './styles'

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
    <RegisterContainer>
      <DivForm onSubmit={handleRegister}>
        <h2>Registrar Usuário</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <Option value="entrepreneur">Empreendedor</Option>
          <Option value="admin">Administrador</Option>
        </Select>
        <Button type="submit" disabled={username === '' || password === ''}>
          Registrar
        </Button>
      </DivForm>
    </RegisterContainer>
  )
}

export default RegisterUser
