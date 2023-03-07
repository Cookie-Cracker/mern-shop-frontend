import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import genrericImg from '../../../assets/img/generic-250x250.jpg'
import otherGenericImage from '../../../assets/img/mike-petrucci-c9FQyqIECds-unsplash.jpg'
import QuickLookModal from './QuickLook';

const Product = ({ product }) => {
    const apiURL =
        process.env.NODE_ENV === "production"
            ? "https://mern-shop-api.onrender.com/"
            : "http://localhost:3900/";

    const { name, description, price, image } = product
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const content = (
        <>
            <Col sm='2' lg='3' className='pb-2'>
                < Card className='card-link'>
                    <img
                        className='shop-img-card'
                        alt="Sample"
                        // src={otherGenericImage}
                        src={`${apiURL}${image}`}
                    />
                    <CardBody>
                        <CardTitle tag="h6">
                            ${price}
                            <Button size='sm' onClick={toggle}><i class="bi bi-eye-fill"></i></Button>
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="span"
                        >
                            <span className='description-italic'> {description.slice(0, 32)}</span>
                        </CardSubtitle>
                        <CardText>
                            {name}
                        </CardText>

                    </CardBody>
                </Card >
            </Col >

            <QuickLookModal modal={modal} product={product} toggle={toggle} />

        </>



    )
    return content
}

export default Product