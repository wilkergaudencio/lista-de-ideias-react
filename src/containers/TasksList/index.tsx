import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Task from '../../components/Task'
import { MainContainer, Title } from '../../styles'
import { RootReducer } from '../../store'
import { setFilteredItems } from '../../store/reducers/tasks' // Importe a ação

const TasksList = () => {
  const { term, criterion, value } = useSelector(
    (state: RootReducer) => state.filter
  )
  const { criterionCategory, valueCategory } = useSelector(
    (state: RootReducer) => state.filterCategory
  )
  const dispatch = useDispatch()

  const [ideas, setIdeas] = useState<any[]>([])

  useEffect(() => {
    const fetchIdeas = async () => {
      const token = localStorage.getItem('token')

      try {
        const response = await axios.get('http://localhost:5001/ideas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setIdeas(response.data)
        dispatch(setFilteredItems(response.data))
      } catch (err) {
        console.error(err)
      }
    }

    fetchIdeas()
  }, [])

  const applyFilter = () => {
    let tasksFilter = ideas

    if (term !== undefined) {
      tasksFilter = tasksFilter.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )
    }

    if (
      value?.toLowerCase() === 'todos' &&
      valueCategory?.toLowerCase() === 'todos'
    ) {
      tasksFilter = ideas
    } else {
      if (criterion === 'prioridade' && value?.toLowerCase() !== 'todos') {
        tasksFilter = tasksFilter.filter((item) => item.status === value)
      }
      if (
        criterionCategory === 'categoria' &&
        valueCategory?.toLowerCase() !== 'todos'
      ) {
        tasksFilter = tasksFilter.filter(
          (item) => item.classification?.[0] === valueCategory
        )
      }
    }

    dispatch(setFilteredItems(tasksFilter))
  }

  useEffect(() => {
    applyFilter()
  }, [term, criterion, value, ideas, criterionCategory, valueCategory])

  const filteredTasks = useSelector(
    (state: RootReducer) => state.tasks.filteredItems
  )

  const showFilteredResult = (amount: number) => {
    let message = ''
    const complement =
      term !== undefined && term.length > 0 ? `e "${term}"` : ''

    if (criterion === 'todos') {
      message = `${amount} ideia(s) encontrada(s) como: todas ${complement}`
    } else {
      message = `${amount} ideia(s) encontrada(s) como: "${`${criterion} = ${value}`}" ${complement}`
    }

    return message
  }

  const messages = showFilteredResult(filteredTasks.length)

  return (
    <MainContainer>
      <Title as="p">{messages}</Title>
      <ul>
        {filteredTasks.map((t: any, index: number) => (
          <li key={index}>
            <Task
              id={t.id}
              title={t.title}
              description={t.description}
              priority={t.priority}
              stats={t.stats}
            />
            <p>
              <strong>Nome:</strong> {t.name}
            </p>
            <p>
              <strong>Matrícula:</strong> {t.registration}
            </p>
            <p>
              <strong>Classificação:</strong>{' '}
              {t.classification ? t.classification.join(', ') : 'N/A'}
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
