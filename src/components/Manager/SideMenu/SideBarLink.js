import React from 'react'
import { NavItem, NavLink } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

const SideBarLink = (props) => {

    const navigate = useNavigate()
    const { links } = props
    return (
        <>
            {links.map((link, i) =>
                <NavItem key={`${link.name}`}>
                    <NavLink onClick={() => navigate(link.to)}>{link.name}</NavLink>
                </NavItem>
            )}
        </>


    )
}

export default SideBarLink