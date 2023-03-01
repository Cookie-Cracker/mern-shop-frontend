import React from 'react'
import { Link } from 'react-router-dom'

import { Col, Row } from 'reactstrap'

const brandImg = require('../../assets/img/brand.jpg')



const BrandPag = ({ brand }) => {

    const content = (
        <Link key={brand._id.slice(1, 10)} to={`/dashboard/brands/${brand._id}`}
            className='brand-link d-block mb-3 p-1'
        >
            <Row className='delete'>
                <Col className='d-flex flex-row-reverse'>
                    <i className="bi bi-file-x-fill fs-2" onClick={(e) => {
                        e.preventDefault()
                        alert('Delete?')
                    }}></i>
                </Col>
            </Row>
            <img className='brand-logo' src={brandImg} alt='brand-logo' />
            <div className='d-flex align-items-center justify-content-between mb-2'>

                <h4 className='mb-0'>{brand.name}</h4>
            </div>
            <p className='brand-desc mb-2'>{brand.description.slice(0, 150)}...</p>

        </Link>
    )
    return content
}

export default BrandPag