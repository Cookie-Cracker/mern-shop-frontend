import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react";
import { Navbar, Nav, NavItem, NavLink, Container } from "reactstrap";
import { useRoutes } from "react-router-dom";

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();

    return (
        <Container>

            <Navbar >
                <Nav>

                    {breadcrumbs.map(({ breadcrumb, match }, index) => {
                        let isLast = (index < breadcrumbs.length - 1) ? true : false
                        let isActiveClass = isLast ? '' : 'active'
                        return (

                            <NavItem key={`${match.pathname}`}>
                                <NavLink href={match.pathname} className={`breadcrumb-item ${isActiveClass}`}>
                                    {breadcrumb}
                                </NavLink>
                                {isLast && <i className="bi bi-chevron-right"></i>}
                            </NavItem>
                        )

                    }

                        // <div className="bc" key={match.url}>
                        //     <Link to={match.url || ""}>{breadcrumb}</Link>
                        //     {index < breadcrumbs.length - 1 && ">"}
                        // </div>



                    )}
                </Nav>
            </Navbar>
        </Container>
    )
};

export default Breadcrumbs