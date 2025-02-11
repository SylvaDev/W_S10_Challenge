import { configureStore } from '@reduxjs/toolkit'
import { pizzaOrdersApi } from './pizzaOrdersApi'

const exampleReducer = (state = { count: 0 }) => {
  return state
}

export const resetStore = () => configureStore({
  reducer: {
    example: exampleReducer,
    [pizzaOrdersApi.reducerPath]: pizzaOrdersApi.reducer
  },
  middleware: getDefault => getDefault().concat(
    pizzaOrdersApi.middleware
  ),
})

export const store = resetStore()
