import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Task from '../../components/Task'
import { MainContainer, Title } from '../../styles'
import { RootReducer } from '../../store'

const TasksList = () => {
  const { term, criterion, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  const [ideas, setIdeas] = useState<any[]>([])

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get('http://localhost:5001/ideas')
        setIdeas(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchIdeas()
  }, [])

  const filterTasks = () => {
    let tasksFilter = ideas
    if (term !== undefined) {
      tasksFilter = tasksFilter.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (criterion === 'prioridade') {
        tasksFilter = tasksFilter.filter((item) => item.priority === value)
      } else if (criterion === 'status') {
        tasksFilter = tasksFilter.filter((item) => item.status === value)
      }

      return tasksFilter
    } else {
      return ideas
    }
  }

  const showFilteredResult = (amount: number) => {
    let message = ''
    const complement = term !== undefined && term.length > 0 ? `e "${term}"` : ''

    if (criterion === 'todos') {
      message = `${amount} ideia(s) encontrada(s) como: todas ${complement}`
    } else {
      message = `${amount} ideia(s) encontrada(s) como: "${`${criterion} = ${value}`}" ${complement}`
    }

    return message
  }

  const tasks = filterTasks()
  const messages = showFilteredResult(tasks.length)

  return (
    <MainContainer>
      <Title as="p">{messages}</Title>
      <ul>
        {tasks.map((t, index) => (
          <li key={index}>
            <Task
              id={t.id}
              title={t.title}
              description={t.description}
              priority={t.priority}
              stats={t.status}
            />
            <p>
              <strong>Nome:</strong> {t.name}
            </p>
            <p>
              <strong>Matrícula:</strong> {t.registration}
            </p>
            <p>
              <strong>Classificação:</strong> {t.classification.join(', ')}
            </p>
            <p>
              <strong>Status:</strong> {t.status}
            </p>
            <p>
              <strong>Observação:</strong> {t.evaluationNote}
            </p>
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default TasksList
