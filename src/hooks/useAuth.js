import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    const cookiet = JSON.parse(localStorage.getItem('at'))
    let isModerator = false
    let isAdmin = false
    let status = "User"
    if (cookiet) {
        const decoded = jwtDecode(cookiet)
        const { email, roles } = decoded.UserInfo



        isModerator = roles.includes('moderator')
        isAdmin = roles.includes('admin')

        if (isModerator) status = "moderator"
        if (isAdmin) status = "admin"


        return { email, roles, isModerator, isAdmin, status }

    }

    return { email: 'Not Logged', roles: [], isModerator, isAdmin, status }


}

export default useAuth