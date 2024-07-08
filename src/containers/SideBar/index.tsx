import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'
import FilterCard from '../../components/FilterCard'
import * as enums from '../../utils/enums/Task'
import { S } from './styles'
import { Button, Field, SearchBar, SearchButton } from '../../styles'
import { SetStateAction, useState } from 'react'
import { setFilteredItems } from '../../store/reducers/tasks'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const list = useSelector((state: any) => state.tasks.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { term } = useSelector((state: RootReducer) => state.filter)

  const [selectedEnum, setSelectedEnum] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleEnumChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedEnum(event.target.value)
    applyFilter()
  }

  const handleCategoryChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedCategory(event.target.value)
    applyFilter()
  }

  const applyFilter = () => {
    const filteredList = list.filter(
      (activity: { enum: string; category: string }) => {
        // Filtra por Enum
        if (selectedEnum && activity.enum !== selectedEnum) {
          return false
        }
        // Filtra por categoria
        if (selectedCategory && activity.category !== selectedCategory) {
          return false
        }
        return true
      }
    )
    dispatch(setFilteredItems(filteredList))
  }

  return (
    <S.Aside>
      <div>
        {showFilters ? (
          <>
            {/* <S.SearchBar> */}
            <Field
              type="text"
              placeholder="Buscar"
              value={term}
              onChange={(e) => dispatch(changeTerm(e.target.value))}
            />
            {/* <SearchButton className="filter-button"></SearchButton> */}
            {/* </S.SearchBar> */}

            <S.Filters value={selectedEnum} onChange={handleEnumChange}>
              <FilterCard
                value={enums.Priority.APROVADO}
                criterion="prioridade"
                label="Aprovado para MVP"
              />
              <FilterCard
                value={enums.Priority.AGUARDANDO_AVALIACAO}
                criterion="prioridade"
                label="Aguardando Avaliação"
              />
              <FilterCard
                value={enums.Priority.EM_ANALISE}
                criterion="prioridade"
                label="Em análise"
              />
              <FilterCard
                value={enums.Priority.REPROVADO}
                criterion="prioridade"
                label="Reprovado"
              />
              <FilterCard criterion="todos" label="Todas" />
            </S.Filters>
            <S.Filters value={selectedCategory} onChange={handleCategoryChange}>
              <option
                value={enums.Priority.APROVADO}
                label="Aprovado para MVP"
              />
              <option
                value={enums.Priority.AGUARDANDO_AVALIACAO}
                label="Aguardando Avaliação"
              />
              <option value={enums.Priority.EM_ANALISE} label="Em análise" />
              <option value={enums.Priority.REPROVADO} label="Reprovado" />
              <FilterCard criterion="todos" label="Todas" />
            </S.Filters>
          </>
        ) : (
          <Button type="button" onClick={() => navigate('/')}>
            Voltar para lista de tarefas
          </Button>
        )}
      </div>
    </S.Aside>
  )
}

export default SideBar
