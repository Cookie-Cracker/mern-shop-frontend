import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/user/',
            // keepUnusedDataFor: 5,
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    console.log('result', result)
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/api/user/',
                method: 'POST',
                body: {
                    ...initialUserData
                }
            }),


        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/api/user/',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                // { type: 'User', id: arg.id }
                { type: 'User', id: 'LIST' }
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useDeleteUserMutation } = usersApiSlice

