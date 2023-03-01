import React from "react";
import { Col, Row } from "reactstrap";
import CarouselSlider from "./Common/CarouselSlider";
const Home = () => {
    const content = (
        <div className="homepage">
            <Row className="flex-row">
                <Col xs="12" lg="6" className="order-lg-2 mb-3 px-3 px-md-2">
                    <div className="home-carousel">
                        <CarouselSlider></CarouselSlider>
                    </div>
                </Col>
                <Col xs="12" lg="3" className="order-lg-1 mb-3 px-3 px-md-2">
                    <div className="d-flex flex-column h-100 justify-content-between">
                        <img
                            src={require("../assets/img/homepage/portfolio-1.jpg")}
                            className="mb-3"
                            alt="banner"
                        />
                        <img
                            src={require("../assets/img/homepage/portfolio-2.jpg")}


                            alt="banner1"
                        />
                    </div>
                </Col>
                <Col xs="12" lg="3" className="order-lg-3 mb-3 px-3 px-md-2">
                    <div className="d-flex flex-column h-100 justify-content-between">
                        <img
                            src={require("../assets/img/homepage/portfolio-3.jpg")}


                            className="mb-3"
                            alt="banner"
                        />
                        <img
                            src={require("../assets/img/homepage/portfolio-4.jpg")}


                            alt="banner1"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );

    return content;
};

export default Home;
