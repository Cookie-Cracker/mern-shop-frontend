import { Outlet } from "react-router-dom";

import React from "react";
import Header from "../app/containers/Navigation/Header";
import { Container } from "reactstrap";

import Footer from "../app/containers/Footer";
// import Breadcrumbs from "../app/containers/Navigation/Breadcrumbs";

const Layout = () => {
  return (
    <>
      <div className="application">
        <Header />
        {/* <Breadcrumbs /> */}
        <main className="main">
          <Container>
            <div className="wrapper">
              <Outlet />
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
