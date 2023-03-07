import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productSearch: ''
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.productSearch = action.payload

        },
        clearSearchProduct: (state) => {
            state.productSearch = ''
        }
    }
})


export const { searchProduct, clearSearchProduct } = productSlice.actions
export default productSlice.reducer

export const selectCurrentProductSearch = (state) => state.products.productSearch