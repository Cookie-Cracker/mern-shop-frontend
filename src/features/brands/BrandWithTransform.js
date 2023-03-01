import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectById, useGetBrandsQuery } from './brandsApiSlice'
import { Button, Col, Row } from 'reactstrap'
const brandImg = require('../../assets/img/brand.jpg')


const Brand = ({ brandId }) => {
    const { brand } = useGetBrandsQuery('brandsList', {
        selectFromResult: ({ data }) => ({

            brand: data?.entities[brandId]
        }),
    })
    // const navigate = useNavigate()

    // const handleEdit = () => {

    //     navigate(`/dashboard/brands/edit`)
    //     alert(`clicked ${brandId}`)
    // }


    return <Link key={brand._id.slice(1, 10)} to={`/dashboard/brands/${brandId}`}
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

}

export default Brand