import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials } from "../../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3900',
    credentials: 'include',
    // credentials: 'same-origin',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }

})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // console.log(args) // request url, method, body
    // console.log(api) // signal, dispatch, getState()
    // console.log(extraOptions) //custom like {shout: true}

    let result = await baseQuery(args, api, extraOptions)
    // console.log('result baseQueryWithReauth', result)
    if (result?.error?.originalStatus === 403) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('/api/auth/refreshtoken', api, extraOptions)
        console.log('refreshResult', refreshResult)

        if (refreshResult?.data) {
            // const email = api.getState().auth.email
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }))

            //retry original with new accesstoken
            result = await baseQuery(args, api, extraOptions)
        } else {
            if (refreshResult?.error.status === 403) {
                refreshResult.result.data.message = "Your Login has Expired. "
                return refreshResult
            }

            // api.dispatch(logOut())
        }

    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    //TODO: tag types
    tagTypes: ['User', 'Brand', 'Product'],
    endpoints: builder => ({})
})