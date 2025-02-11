import { configureStore } from '@reduxjs/toolkit'
import { pizzaOrdersApi } from './pizzaOrdersApi'
import sizeFilterReducer from './sizeFilterSlice'

export const resetStore = () => configureStore({
  reducer: {
    sizeFilter: sizeFilterReducer,
    [pizzaOrdersApi.reducerPath]: pizzaOrdersApi.reducer,
    
  },
  middleware: getDefault => getDefault().concat(
    pizzaOrdersApi.middleware
  ),
})

export const store = resetStore()
