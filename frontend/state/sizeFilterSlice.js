import { createSlice } from '@reduxjs/toolkit'

const sizeFilterSlice = createSlice({
  name: 'sizeFilter',
  initialState: 'All', // Default value
  reducers: {
    setSizeFilter: (state, action) => {
      return action.payload // Update the state with the new size filter
    }
  }
})

// Export the action to be used in the component
export const { setSizeFilter } = sizeFilterSlice.actions

// Export the reducer to be included in the store
export default sizeFilterSlice.reducer
