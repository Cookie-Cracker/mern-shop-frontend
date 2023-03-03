import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap'
import genrericImg from '../../../assets/img/generic-250x250.jpg'

const Product = ({ product }) => {

    const { name, description, price, image } = product
    const content = (
        <Col sm='2' lg='3' className='pb-2'>

            < Card body>
                <img
                    alt="Sample"
                    src={genrericImg}
                />
                <CardBody>
                    <CardTitle tag="h6">
                        ${price}
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
                    <Button>
                        Button
                    </Button>
                </CardBody>
            </Card >
        </Col >
    )
    return content
}

export default Product