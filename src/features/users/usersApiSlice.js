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
        getMe: builder.query({
            query: ({ id }) => ({
                url: `/api/user/${id}`,
                method: 'GET',

            })
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
        }),
        getTopFiveLogins: builder.query({
            query: ({
                id,
                page = 1,
                size = 5
            }) => `api/auth/loginstop5?id=${id}&page=${page}&size=${size}`
        })


    })
})

export const {
    useGetUsersQuery,
    useGetMeQuery,
    useAddNewUserMutation,
    useDeleteUserMutation,
    useGetTopFiveLoginsQuery,
} = usersApiSlice

