import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootReducer } from '../../store'
import { changeTerm, changeFilter } from '../../store/reducers/filter'
import { changeFilterCategory } from '../../store/reducers/filterCategory'
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
  const { term, criterion, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  // Remova os `useState`
  // const [selectedPriority, setSelectedPriority] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState('');

  const handlePriorityChange = (event: { target: { value: any } }) => {
    dispatch(
      changeFilter({ criterion: 'prioridade', value: event.target.value })
    )
  }

  const handleCategoryChange = (event: { target: { value: any } }) => {
    dispatch(
      changeFilterCategory({
        criterionCategory: 'categoria',
        valueCategory: event.target.value
      })
    )
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

            <S.Filters onChange={handlePriorityChange}>
              <FilterCard
                value={enums.Priority.APROVADO}
                criterion="prioridade"
                label="Aprovado para MVP"
              />
              <FilterCard
                value={enums.Priority.AGUARDANDO_AVALIACAO}
                criterion="prioridade"
                label="Aguardando avaliação"
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
              <FilterCard criterion="todos" label="Todos" />
            </S.Filters>
            <S.Filters onChange={handleCategoryChange}>
              <FilterCard
                valueCategory={enums.Category.AUMENTO}
                criterion="todos"
                label="Aumento de Vendas"
                isCategory
              />
              <FilterCard
                valueCategory={enums.Category.REDUCAO}
                criterion="todos"
                label="Redução de Custos ou Aumento de Produtividade"
                isCategory
              />
              <FilterCard
                valueCategory={enums.Category.SUSTENTABILIDADE}
                criterion="todos"
                label="Sustentabilidade, Diversidade e Inclusão"
                isCategory
              />
              <FilterCard
                valueCategory={enums.Category.EXPERIENCIA}
                criterion="todos"
                label="Experiência do Funcionário e Marca Empregador"
                isCategory
              />
              <FilterCard
                valueCategory={enums.Category.CLIENTE}
                criterion="todos"
                label="Experiência do Cliente (Digital ou Farmácia)"
                isCategory
              />
              <FilterCard
                valueCategory={enums.Category.VISIBILIDADE}
                criterion="todos"
                label="Visibilidade da Marca RD Saúde"
                isCategory
              />
              <FilterCard criterion="todos" label="Todos" isCategory />
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
