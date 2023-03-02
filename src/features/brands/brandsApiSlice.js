import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const brandsAdapter = createEntityAdapter({})
const initialState = brandsAdapter.getInitialState()

export const brandsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBrands: builder.query({
            query: () => ({
                url: '/api/brand/',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedBrands = responseData.map(brand => {
                    brand.id = brand._id
                    return brand
                });
                return brandsAdapter.setAll(initialState, loadedBrands)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Brand', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Brand', id }))
                    ]
                } else return [{ type: 'Brand', id: 'LIST' }]
            },
        }),

        addNewBrand: builder.mutation({
            query: initialBrandData => ({
                url: '/api/brand/',
                method: 'POST',
                body: {
                    ...initialBrandData
                }
            }),
            invalidatesTags: [
                { type: 'Brand', id: 'LIST' }
            ]
        }),

        updateBrand: builder.mutation({
            query: initialBrandData => ({
                url: '/api/brand/',
                method: 'PATCH',
                body: {
                    ...initialBrandData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Brand', id: 'LIST' }
            ]
        }),

        deleteBrand: builder.mutation({
            query: ({ id }) => ({
                url: '/api/brand/',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Brand', id: 'LIST' }
            ]
        }),

        getBrandsByTitle: builder.query({
            // query: ({ page = 1, size = 10, brand = '' }) => `/api/brand/search?brand=${brand}&page=${page}&size=${size}`,
            query: (brand = '') => `/api/brand/search?brand=${brand}`,
            // transformResponse: responseData => {
            //     const loadedBrands = responseData.map(brand => {
            //         brand.id = brand._id
            //         return brand
            //     });
            //     return brandsAdapter.setAll(initialState, loadedBrands)
            // },
            // providesTags: (result, error, arg) => {
            //     if (result?.ids) {
            //         return [
            //             { type: 'Brand', id: 'LIST' },
            //             ...result.ids.map(id => ({ type: 'Brand', id }))
            //         ]
            //     } else return [{ type: 'Brand', id: 'LIST' }]
            // },
        }),

        getBrandsPaginated: builder.query({
            query: ({ brand = '', size = 10, page = 1, isActive = true }) => `/api/brand/search?brand=${brand}&page=${page}&size=${size}&active=${isActive}`,
            // transformResponse: ({data}) => {
            //     const loadedBrands = data.itemsList.map(brand => {
            //         brand.id = brand._id
            //         return brand
            //     });
            //     return brandsAdapter.setAll(initialState, loadedBrands)
            // },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Brand', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Brand', id }))
                    ]
                } else return [{ type: 'Brand', id: 'LIST' }]
            },
        })


    })
})

export const {
    useGetBrandsQuery,
    useAddNewBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
    useGetBrandsByTitleQuery,
    useGetBrandsPaginatedQuery,
} = brandsApiSlice

export const selectBrandsResult = brandsApiSlice.endpoints.getBrands.select()
// export const selectBrandsPaginatedResult = brandsAdapter.endpoints.getBrandsPaginated.select()

const selectBrandsData = createSelector(
    selectBrandsResult,
    brandResult => brandResult.data
)
// const selectBrandPaginatedData = createSelector(
//     selectBrandsPaginatedResult,
//     brandPResult => brandPResult.data
// )

export const {
    selectAll: selectAllBrands,
    selectById,
    selectIds: selectBrandId
} = brandsAdapter.getSelectors(state => selectBrandsData(state) ?? initialState)

