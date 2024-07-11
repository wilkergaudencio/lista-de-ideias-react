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
  const [priority, setPriority] = useState(enums.Priority.APROVADO)

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
      priority,
      stats: enums.Stats.PENDENTE
    }

    const token = localStorage.getItem('token')

    try {
      await axios.post('http://localhost:5001/ideas', newIdea, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
            <option value={enums.Category.AUMENTO} label="Aumento de Vendas" />
            <option
              value={enums.Category.REDUCAO}
              label="Redução de Custos ou Aumento de Produtividade"
            />
            <option
              value={enums.Category.SUSTENTABILIDADE}
              label="Sustentabilidade, Diversidade e Inclusão"
            />
            <option
              value={enums.Category.EXPERIENCIA}
              label="Experiência do Funcionário e Marca Empregador"
            />
            <option
              value={enums.Category.CLIENTE}
              label="Experiência do Cliente (Digital ou Farmácia)"
            />
            <option
              value={enums.Category.VISIBILIDADE}
              label="Visibilidade da Marca RD Saúde"
            />
          </select>
        </S.Options>
        <SaveButton type="submit">Cadastrar</SaveButton>
      </S.Form>
    </MainContainer>
  )
}

export default Form
