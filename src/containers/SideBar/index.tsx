import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'
import FilterCard from '../../components/FilterCard'
import * as enums from '../../utils/enums/Task'
import { S } from './styles'
import { Button, Field, SearchBar, SearchButton } from '../../styles'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { term } = useSelector((state: RootReducer) => state.filter)

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

            <S.Filters>
              <FilterCard
                value={enums.Priority.APROVADO}
                criterion="status"
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
