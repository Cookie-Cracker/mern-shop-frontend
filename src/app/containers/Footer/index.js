import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
const Footer = () => {
    const infoLinks = [
        { icon: "facebook", to: "/" },
        { icon: "twitter", to: "/" },
        { icon: "google", to: "/" },
        { icon: "instagram", to: "/" },
        { icon: "whatsapp", to: "/" },
        { icon: "linkedin", to: "/" },
        { icon: "github", to: "/" },
    ];
    const footerLinks = infoLinks.map((link, index) => {
        return (
            <Link
                key={`${index}${link.icon}`}
                to={link.to}
                className="me-4 text-reset"
            >
                <i className={`bi bi-${link.icon}`}></i>
            </Link>
        );
    });
    const content = (
        <footer className="footer px-0 px-lg-3">
            <Container fluid >
                <section className="d-flex justify-content-center justify-content-lg-between p-4">
                    <div className="me-5 d-none d-lg-block ">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div className="footer-social-icons">{footerLinks}</div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Company name
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer
                                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                    elit.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Angular
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        React
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Vue
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Laravel
                                    </a>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Pricing
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Settings
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Orders
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Help
                                    </a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home me-3"></i> New York, NY 10012, US
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    info@example.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3"></i> + 01 234 567 88
                                </p>
                                <p>
                                    <i className="fas fa-print me-3"></i> + 01 234 567 89
                                </p>
                            </div>
                        </div>
                    </div>
                </section>




                <p className='copyright text-center'>
                    © {new Date().getFullYear()}{" "}
                    <Link to={'#'}>Some Place</Link>, better.
                </p>
            </Container>
        </footer>
    )

    return content
}

export default Footer