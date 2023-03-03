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
                minPrice = 0,
                maxPrice = 5000,
                isActive = true,
                page = 1,
                size = 10
            }) => `/api/product/search?name=${name}&active=${isActive}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`,
            providesTags: [{ type: 'Product', id: 'LIST' }]
        })
    })
})

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useGetProductsPaginatedQuery

} = productApiSlice