import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { successNotification, warnNotification } from '../../components/Common/Notifications';
import { useToggleActiveMutation } from './brandsApiSlice';
import { extraOptions } from '../../config/confirmAlertsOptions';


const brandImg = require('../../assets/img/brand.jpg')


const BrandPag = ({ brand }) => {

    const [deleteBrand, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useToggleActiveMutation()

    useEffect(() => {
        if (isSuccess)
            successNotification('Brand Deactivated.')
    }, [isSuccess]);

    const handleDeactivation = async () => {
        await deleteBrand({ id: brand._id })
    }

    let status = brand.isActive ? 'Deactivate' : 'Activate'
    let alertDialogOptions = {
        title: <i className="bi bi-info-circle-fill fs-5">Info</i>,
        message: `${status}  ${brand.name}`,
        buttons: [
            {
                label: "Yes",
                onClick: () => handleDeactivation(),
            },
            {
                label: "Cancel",
                onClick: () => { },
            },
        ],
    }
    alertDialogOptions = { ...alertDialogOptions, ...extraOptions }

    const onDeactivateBrandClick = () => {
        confirmAlert(alertDialogOptions)
    }

    const content = (
        <>
            <Row

                className='p-2'>

                <Col xs={{ size: 12, order: 1 }}
                    sm={{ size: 12, order: 1 }}
                    md={{ size: 12, order: 1 }}
                    lg={{ size: 10, order: 1 }}>

                    <Link key={brand._id.slice(1, 10)} to={`/dashboard/brands/${brand._id}`}
                        className='brand-link d-block mb-3 p-1'
                    >
                        <img className='brand-logo' src={brandImg} alt='brand-logo' />
                        <div className='d-flex align-items-center justify-content-between mb-2'>

                            <h4 className='mb-0'>{brand.name}</h4>
                        </div>
                        <p className='description-italic mb-2'>{brand.description.slice(0, 150)}...</p>

                    </Link>
                </Col>
                <Col xs={{ size: 12, order: 2 }}
                    sm={{ size: 12, order: 3 }}
                    md={{ size: 12, order: 3 }}
                    lg={{ size: 2, order: 2 }}>

                    {brand.isActive
                        ? (

                            <i className="bi bi-toggle-on brand-toggle active" onClick={() => onDeactivateBrandClick(brand._id)}></i>
                        ) :
                        (

                            <i class="bi bi-toggle-off brand-toggle inactive" onClick={() => onDeactivateBrandClick(brand._id)}></i>
                        )}
                </Col>
            </Row>

        </>

    )
    return content
}

export default BrandPag