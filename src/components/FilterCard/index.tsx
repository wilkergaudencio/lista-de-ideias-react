import { useDispatch, useSelector } from 'react-redux'
import { S } from './styles'
import { changeFilter } from '../../store/reducers/filter'
import { changeFilterCategory } from '../../store/reducers/filterCategory'
import * as enums from '../../utils/enums/Task'
import { RootReducer } from '../../store'

export type Props = {
  label: string
  criterion: 'prioridade' | 'status' | 'todos'
  value?: enums.Priority | enums.Stats
  valueCategory?: enums.Category
  isCategory?: boolean
}

const FilterCard = ({
  label,
  criterion,
  value,
  valueCategory,
  isCategory = false
}: Props) => {
  const dispatch = useDispatch()
  const { filter, tasks } = useSelector((state: RootReducer) => state)

  const filtering = () => {
    if (isCategory && valueCategory) {
      dispatch(
        changeFilterCategory({
          criterionCategory: 'categoria',
          valueCategory
        })
      )
    } else if (!isCategory) {
      dispatch(
        changeFilter({
          criterion,
          value
        })
      )
    }
  }

  const checkIsActive = () => {
    const sameCriterion = filter.criterion === criterion
    const sameValue = filter.value === value

    return sameCriterion && sameValue
  }

  // const countTasks = () => {
  //   if (criterion === 'todos') return tasks.filteredItems.length
  //   if (criterion === 'prioridade') {
  //     return tasks.filteredItems.filter((item) => item.status === value).length
  //   }
  // }

  const active = checkIsActive()
  // const counter = countTasks()

  return (
    <S.Card value={label} active={active} onClick={filtering}>
      <S.Label>{label}</S.Label>
    </S.Card>
  )
}

export default FilterCard
