import { Collapse, Navbar, Nav } from "reactstrap";
import { useState } from "react";
const SideMenu = (props) => {
    const { links } = props

    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const content = (

        <div className="panel-sidebar">
            <button
                className={isMenuOpen ? 'menu-panel' : 'menu-panel collapse'}
                aria-expanded={isMenuOpen ? 'true' : 'false'}
                onClick={toggleMenu}
            >Dashboard Menu</button>

            <h3 className="panel-title">Account</h3>
            <Navbar expand="md">
                <Collapse isOpen={isMenuOpen} navbar>
                    <Nav vertical className="sidebar-links">

                        {/* <SideBarLink links={links} /> */}
                        {/* {links.map((link, i) =>
                            <NavItem key={`${link.name}`}>
                                <NavLink onClick={() => navigate(link.to)}>{link.name}</NavLink>
                            </NavItem>
                        )} */}


                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
    return content
}

export default SideMenu