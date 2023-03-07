import React, { useEffect, useState } from "react";
import { app } from "../../constants";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/auth/authSlice";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { useNavigate, Link, Form } from "react-router-dom";

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
  FormGroup,
} from "reactstrap";
import useAuth from "../../../hooks/useAuth";
import SearchBar from "../../../components/Common/SearchBar";
// import useAuth from "../../../hooks/useAuth";

const HeaderNavigation = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const { email, status, isAdmin, isModerator } = useAuth();

  const token = useSelector(selectCurrentToken);
  const tk = JSON.parse(localStorage.getItem("at"));
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
    <div className="bg-dark">
      <Navbar color="dark" dark expand="md" className="container">
        <NavbarBrand href="/">{app.name}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto ml-4" navbar>
            <SearchBar />
            <NavItem>
              <Button color="transparent" onClick={() => alert("Cart")}>
                <i className="bi bi-cart-fill cart-icon"></i> <Badge>0</Badge>
              </Button>
            </NavItem>
            <NavItem>
              <NavLink href="/shop">Shop</NavLink>
            </NavItem>

            {tk ? (
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
    </div>
  );
  return content;
};

export default HeaderNavigation;
