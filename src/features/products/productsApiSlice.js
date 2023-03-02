import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

const productsAdapter = createEntityAdapter({})
const initialState = productsAdapter.getInitialState()

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/api/product/',
            providesTags: [{ type: 'Product', id: 'LIST' }]
        }),
        addNewProduct: builder.mutation({
            query: formData => ({
                url: '/api/product',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: [{ type: 'Product', id: 'LIST' }]
        }),
        getProductsPaginated: builder.query({
            query: ({
                name = '',
                size = 10,
                page = 1,
                isActive = true
            }) => `/api/brand/search?name=${name}&page=${page}&size=${size}&active=${isActive}`,
        })
    })
})

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useLazyGetProductsPaginatedQuery

} = productApiSlice