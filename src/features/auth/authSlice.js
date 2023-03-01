import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            // console.log('accessTokenSetCRedentilas', accessToken)
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
        }
    },

})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token