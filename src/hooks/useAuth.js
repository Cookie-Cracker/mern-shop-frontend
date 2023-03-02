import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    // console.log('useAuth token: ', token)
    let isModerator = false
    let isAdmin = false
    let status = "user"

    if (token) {
        const decoded = jwtDecode(token)
        const { email, roles } = decoded.UserInfo



        isModerator = roles.includes('moderator')
        isAdmin = roles.includes('admin')

        if (isModerator) status = "moderator"
        if (isAdmin) status = "admin"


        return { email, roles, isModerator, isAdmin, status }

    }

    return { email: '', roles: [], isModerator, isAdmin, status }


}

export default useAuth