import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  grid-column: 1 / -1; /* Faz o contêiner ocupar toda a largura da grade */
  background-color: #f9f9f9;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;

  h2 {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    margin-bottom: 1rem;

    label {
      margin-left: 0.5rem;
    }

    a {
      color: #0073e6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    margin-top: 1rem;
    a {
      color: #0073e6;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`

export const Logo = styled.img`
  width: 150px;
  margin-bottom: 1rem;
`

export const AltLogin = styled.div`
  text-align: center;
  margin-top: 1rem;
  width: 100%;

  p {
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    justify-content: space-around;
    width: 100%;

    button {
      width: 23%;
      margin: 0 0.5%;
    }
  }
`
