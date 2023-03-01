import React, { useEffect, useState } from 'react'
import { ButtonGroup, Button, h6 } from 'reactstrap'
import { useGetRolesQuery } from '../auth/authApiSlice'

const Roles = ({ setRoles }) => {

    const {
        data: roles,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetRolesQuery();
    const [roleSelected, setRoleSelected] = useState([]);

    const onCheckboxBtnClick = (e) => {
        e.preventDefault()
        const { value } = e.target
        if (roleSelected.includes(value)) {
            var index = roleSelected.indexOf(value)
            if (index !== -1) {
                roleSelected.splice(index, 1)
            }
        } else {

            roleSelected.push(value)
        }

        setRoleSelected([...roleSelected])

    }

    useEffect(() => {
        setRoles(roleSelected)
    }, [roleSelected, setRoles]);

    let content;





    if (isLoading) {
        content = <p>Loading..</p>
    } else if (isSuccess) {
        content = (
            <div>
                <h6>Roles</h6>
                <ButtonGroup>
                    {roles.map(role =>
                        <Button
                            key={role._id}
                            name={role.name}
                            color='secondary'
                            outline
                            value={role.name}
                            onClick={onCheckboxBtnClick}
                            active={roleSelected.includes(role.name)}
                        >
                            {roleSelected.includes(role.name) ? '✔️' : '❌'}
                            {` ${role.name}`}</Button>
                    )}
                </ButtonGroup>
                {/* <p>Selected: {JSON.stringify(roleSelected)}</p> */}
            </div>
        )
    }








    return content
}

export default Roles