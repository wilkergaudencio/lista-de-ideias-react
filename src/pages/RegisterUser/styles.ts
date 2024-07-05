import styled from 'styled-components'

export const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  grid-column: 1 / -1;
  background-color: #0a2f2a;
`

export const DivForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #041a17;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  max-width: 100%;

  h2 {
    margin-bottom: 1rem;
    color: #eee;
    font-family: Inter, sans-serif;
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
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
  &:disabled {
    background-color: #ccc;
    color: #eee;
    cursor: not-allowed;
  }
`

export const Select = styled.select`
  position: relative;
  width: 200px;
  margin-bottom: 20px;
`

export const Option = styled.option`
  padding: 5px;
  background-color: #fff;
  color: #eee;

  &:checked {
    background-color: #007bff; /* Cor da opção selecionada */
    color: #eee;
  }
`
