import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken

            // const decoded = jwtDecode(accessToken)
            // const { UserInfo } = decoded
            localStorage.setItem('at', JSON.stringify(accessToken))
        },
        logOut: (state, action) => {
            state.email = null
            state.token = null
            localStorage.removeItem('at')
        }
    },

})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
