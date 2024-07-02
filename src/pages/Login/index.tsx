import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { LoginContainer, Form, Input, Button, AltLogin, Logo } from './styles'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:5001/login', {
        username,
        password
      })
      localStorage.setItem('token', response.data.token)
      navigate('/')
    } catch (err) {
      console.error('Login failed', err)
    }
  }

  return (
    <LoginContainer>
      <Logo />
      <Form onSubmit={handleLogin}>
        <h2>Log in</h2>
        <Input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input type="checkbox" id="rememberMe" />
          <label htmlFor="rememberMe">Remember me</label>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <Button type="submit">Log in</Button>
        <p>
          Não tem uma conta?  <Link to="/register">Registre-se</Link>
        </p>
        <AltLogin>
          <div>
            <Button>SSO</Button>
          </div>
        </AltLogin>
      </Form>
    </LoginContainer>
  )
}

export default Login
