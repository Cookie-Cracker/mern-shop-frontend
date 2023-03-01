import { apiSlice } from "../../app/api/apiSlice";

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
        })
    })
})

export const {
    useGetProductsQuery,
    useAddNewProductMutation,

} = productApiSlice