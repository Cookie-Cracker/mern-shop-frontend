import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Page404 = (props) => {
    const navigate = useNavigate()
    const { message, status } = props
    return (

        <div className="page-404">
            <h1 className="display-1 fw-bold">{status ? status : '404'}</h1>
            {message}
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
                The page you’re looking for doesn’t exist.
            </p>
            {
                status ?
                    (<Link className="btn btn-success" to={'/signin'}>SignIn Again</Link>) :
                    (<Link className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</Link>)

            }
        </div>
    )
}

export default Page404