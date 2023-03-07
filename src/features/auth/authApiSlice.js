import { apiSlice } from "../../app/api/apiSlice";

import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signIn: builder.mutation({
            query: credentials => ({
                url: '/api/auth/signin',
                method: 'POST',
                body: { ...credentials }
            }
            ),

        }


        ),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // const { data } =
                    await queryFulfilled
                    // console.log('data:queryFulfilled', data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())

                    // dispatch(apiSlice.util.prefetch('brandsList', undefined, { force: true }))
                    // dispatch(apiSlice.util.prefetch('productList', undefined, { force: true }))

                } catch (error) {
                    console.log('error', error)
                }
            },
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/api/auth/refreshtoken',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // console.log('qFulflill', data)
                    const { accessToken } = data
                    // dispatch(setCredentials(data))
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        getRoles: builder.query({
            query: () => ({
                url: '/api/auth/roles/',
                method: 'GET'
            })
        })
    })
})

export const {
    useSignInMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useGetRolesQuery
} = authApiSlice