import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem,
  NavbarToggler,
  Collapse,
  Row,
  Col,
  List,
  ListGroupItem,
} from "reactstrap";
import BrandMenu from "../../../components/User/Shop/Navigation/BrandMenu";

const brands = [
  "dior",
  "nike",
  "adidas",
  "converse",
  "gucci",
  "asx",
  "zara",
  "giorgio armani",
  "dior",
  "nike",
  "adidas",
  "converse",
  "gucci",
  "asx",
  "zara",
  "giorgio armani",
  "dior",
  "nike",
  "adidas",
  "converse",
  "gucci",
  "asx",
  "zara",
  "giorgio armani",
  "dior",
  "nike",
  "adidas",
  "converse",
  "gucci",
  "asx",
  "zara",
  "giorgio armani",
];

const ShopNavigation = () => {
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const toggle = () => setBrandMenuOpen((prevState) => !prevState);

  let content = (
    <Navbar color="light">
      <Nav className="m-auto">
        {brands && brands.length > 0 && (
          <Dropdown
            nav
            inNavbar
            isOpen={brandMenuOpen}
            // toggle={toggle}
            onClick={toggle}
            direction="end"
          >
            <DropdownToggle color="light">BRAND</DropdownToggle>
            <DropdownMenu className="p-3 m-1">
              <BrandMenu brands={brands} />
            </DropdownMenu>
          </Dropdown>
        )}
      </Nav>
    </Navbar>
  );

  return content;
};

export default ShopNavigation;
