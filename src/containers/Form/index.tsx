import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MainContainer, Title, Field, SaveButton } from '../../styles'
import { S } from './styles'
import * as enums from '../../utils/enums/Task'
import { register } from '../../store/reducers/tasks'
import axios from 'axios'

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [registration, setRegistration] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [classification, setClassification] = useState<string[]>([])
  const [priority, setPriority] = useState(enums.Priority.NORMAL)

  const registerIdea = async (e: FormEvent) => {
    e.preventDefault()

    const newIdea = {
      name,
      registration,
      title,
      description,
      classification,
      status: 'Aguardando avaliação',
      evaluationNote: 'Aguardando avaliação',
      priority, // Add the priority field
      stats: enums.Stats.PENDENTE // Add the stats field
    }

    try {
      await axios.post('http://localhost:5001/ideas', newIdea)
      dispatch(register(newIdea))
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  const handleClassificationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const options = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    )
    setClassification(options)
  }

  return (
    <MainContainer>
      <Title>Nova Ideia</Title>
      <S.Form onSubmit={registerIdea}>
        <Field
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Seu nome"
        />
        <Field
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
          type="text"
          placeholder="Sua matrícula"
        />
        <Field
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Título da Ideia"
        />
        <Field
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Descrição da Ideia"
        />
        <S.Options>
          <label>Classificação da Ideia</label>
          <select multiple onChange={handleClassificationChange}>
            <option value="Classificação 1">Classificação 1</option>
            <option value="Classificação 2">Classificação 2</option>
            <option value="Classificação 3">Classificação 3</option>
            <option value="Classificação 4">Classificação 4</option>
          </select>
        </S.Options>
        <SaveButton type="submit">Cadastrar</SaveButton>
      </S.Form>
    </MainContainer>
  )
}

export default Form
