import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Row, Col } from "reactstrap";
import SideMenu from "../../components/Manager/SideMenu/SideMenu";
import SubPage from "../../components/Manager/SubPage";

const Welcome = () => {
  const props = { isMenuOpen: true };

  const content = (
    <div className="admin">
      <Row>
        <Col xs="12" ms="5" xl="3">
          <SideMenu {...props} />
        </Col>
        <Col xs="12" md="7" xl="9">
          <SubPage />
          <Outlet />
          {/* <UsersList /> */}
        </Col>
      </Row>
    </div>
  );

  return content;
};
export default Welcome;
