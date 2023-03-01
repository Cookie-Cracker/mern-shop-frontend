import { useLocation, Navigate, Outlet } from "react-router-dom"

import React from 'react'
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    // const token = useSelector(selectCurrentToken)
    const location = useLocation()
    const { roles } = useAuth()

    return (
        roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/signin" state={{ from: location }} replace />


    )
}

export default RequireAuth