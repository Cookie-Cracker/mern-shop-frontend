import React from "react";
import useAuth from "../../../hooks/useAuth";
import { Row, Col } from "reactstrap";
import ShopFilters from "./ShopFilters";

const Shop = () => {
  const { status } = useAuth();
  const content = (
    <div className="shop">
      <Row>
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 12, order: 1 }}
          lg={{ size: 3, order: 1 }}
        >
          <ShopFilters />
        </Col>
        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 12, order: 2 }}
          lg={{ size: 9, order: 2 }}
        >
          {/* <div class="text-bg-dark p-3">Header</div> */}
          <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="text-start text-md-left p-4 mt-3 mt-md-0 mb-1 mb-md-0"
            >
              <span>Product Count: 128</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className="text-end pr-0 d-none d-md-block"
            >
              <span>Sort:</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
              className="text-end"
            >
              <select className="d-block text-end">
                <option>More than</option>
                <option>Less than</option>
                <option>Equal than</option>
              </select>
            </Col>
          </Row>

          <h5 className="text-center">No products yet</h5>
        </Col>
      </Row>
    </div>
  );
  return content;
};

export default Shop;
