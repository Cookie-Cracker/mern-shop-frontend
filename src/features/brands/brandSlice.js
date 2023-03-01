import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    brandSearch: ''
}
const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {
        searchBrand: (state, action) => {
            state.brandSearch = action.payload

        },
        clearSearchBrand: (state) => {
            state.brandSearch = ''
        }
    }
})


export const { searchBrand, clearSearchBrand } = brandSlice.actions
export default brandSlice.reducer

export const selectCurrentSearch = (state) => state.brands.brandSearch