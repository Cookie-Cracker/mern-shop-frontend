import React from "react";
import Breadcrumbs from "./Breadcrumbs";
import HeaderInfo from "./HeaderInfo";
import HeaderNavigation from "./HeaderNavigation";
import ShopNavigation from "./ShopNavigation";

const Header = () => {
  return (
    <>
      <header>
        <HeaderInfo />
        <HeaderNavigation />
        <ShopNavigation />
        <Breadcrumbs />
      </header>
    </>
  );
};

export default Header;
