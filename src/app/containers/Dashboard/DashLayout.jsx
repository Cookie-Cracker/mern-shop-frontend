import { Outlet } from "react-router-dom";
import SideMenu from "../../../components/Manager/SideMenu/SideMenu";

import useAuth from "../../../hooks/useAuth";
import sideMenuLinks from "./sideMenuLinks";

import { Row, Col } from "reactstrap";

const DashLayout = () => {
  const { email, status, isAdmin, isModerator } = useAuth();

  const links = isAdmin ? sideMenuLinks.admin : sideMenuLinks.moderator;
  // console.log("sideMenuLinks.admin", sideMenuLinks.admin);
  return (
    <>
      {/* <DashHeader /> */}
      {/* <div className="container"> */}
      {/* // <AccountMenu />
      // <Outlet /> */}
      {/* </div> */}
      {/* <DashFooter /> */}
      <Row>
        <Col xs="12" ms="5" xl="3">
          <SideMenu links={links} />
        </Col>
        <Col xs="12" md="7" xl="9">
          {/* <SubPage /> */}
          {/* // <UsersList />  */}
          <Outlet />
        </Col>
      </Row>
    </>
  );
};
export default DashLayout;
