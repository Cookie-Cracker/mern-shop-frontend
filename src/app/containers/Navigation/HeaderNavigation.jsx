import React, { useEffect, useState } from "react";
import { app } from "../../constants";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/auth/authSlice";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { useNavigate, Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import useAuth from "../../../hooks/useAuth";
// import useAuth from "../../../hooks/useAuth";

const HeaderNavigation = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, status, isAdmin, isModerator } = useAuth();

  const token = useSelector(selectCurrentToken);
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isError) return <p>Error: {error.data?.message}</p>;

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let content = (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">{app.name}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto ml-4" navbar>
          <NavItem>
            <Button color="transparent" onClick={() => alert("Cart")}>
              <i className="bi bi-cart-fill cart-icon"></i> <Badge>4</Badge>
            </Button>
          </NavItem>
          <NavItem>
            <NavLink href="/shop">Shop</NavLink>
          </NavItem>

          {token ? (
            <UncontrolledDropdown nav inNavbar direction="start">
              <DropdownToggle nav>
                {!email ? (
                  "Welcome"
                ) : (
                  <div>
                    <span>{`${email} `}</span>

                    <Badge className="p-l" color="primary">
                      {` ${status}`}
                    </Badge>
                  </div>
                )}
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  {" "}
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownItem>
                <DropdownItem>
                  {" "}
                  <Link onClick={sendLogout}>Logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>Welcome!</DropdownToggle>
              <DropdownMenu end>
                <DropdownItem>
                  <Link to="/signin">SignIn</Link>
                </DropdownItem>
                <DropdownItem>SignUp</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
  return content;
};

export default HeaderNavigation;
