import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as enums from '../../utils/enums/Task'

type FilterState = {
  termCategory?: string
  criterionCategory: 'categoria' | 'todos'
  valueCategory?: enums.Category
}

const initialState: FilterState = {
  termCategory: '',
  criterionCategory: 'todos'
}

const FilterCategorySlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeTerm: (state, action: PayloadAction<string>) => {
      state.termCategory = action.payload
    },
    changeFilterCategory: (state, action: PayloadAction<FilterState>) => {
      state.criterionCategory = action.payload.criterionCategory
      state.valueCategory = action.payload.valueCategory
    }
  }
})

export const { changeTerm, changeFilterCategory } = FilterCategorySlice.actions
export default FilterCategorySlice.reducer
