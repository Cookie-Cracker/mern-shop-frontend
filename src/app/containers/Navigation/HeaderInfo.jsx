import React from "react";
import { Col, Row } from "reactstrap";

const HeaderInfo = () => {
  return (
    <header className="header-info">
      <Row>
        <Col md="4" className="text-center d-none d-md-block">
          <i className="bi bi-rocket-fill"></i>
          <span>Free returns Within 90 days</span>
        </Col>
        <Col md="4" className="text-center d-none  d-md-block">
          <i className="bi bi-truck-front-fill"></i>
          <span>Get $80 Coupons </span>
        </Col>
        <Col md="4" className="text-center d-none  d-md-block">
          <i className="bi bi-telephone-plus-fill"></i>
          <span>Free Shipping. On All orders</span>
        </Col>
        <Col xs="12" className="text-center d-block  d-md-none">
          <i className="bi bi-airplane-engines-fill"></i>
          <span>Free Shipping. On All orders</span>
        </Col>
      </Row>
    </header>
  );
};

export default HeaderInfo;
