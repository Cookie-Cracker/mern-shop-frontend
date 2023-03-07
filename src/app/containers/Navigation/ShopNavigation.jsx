import React, { useState, useEffect } from "react";
import {
  Nav,
  Navbar,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import LoadingBar from "../../../components/Common/Spinner/Loading";
import BrandMenu from "../../../components/User/Shop/Navigation/BrandMenu";
import { useGetBrandsPaginatedQuery } from "../../../features/brands/brandsApiSlice";

const ShopNavigation = () => {
  const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  const [skip, setSkip] = useState(true);
  const toggle = () => {
    setBrandMenuOpen((prevState) => !prevState);
    setSkip((prev) => !prev);
    console.log("skip", skip);
  };

  let content;
  content = (
    <Navbar>
      <Nav className="m-auto">
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
            <BrandMenu sk={skip} />
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );

  return content;
};

export default ShopNavigation;
