import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './reducers/tasks'
import filterReducer from './reducers/filter'
import filterCategoryReducer from './reducers/filterCategory'

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filterReducer,
    filterCategory: filterCategoryReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
export default store
