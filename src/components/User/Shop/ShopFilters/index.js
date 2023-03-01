import React from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap'

const ShopFilters = () => {
    const content = (
        <div className='filters'>
            <Card className='mb-3'>
                <CardHeader tag={'h4'}>Price</CardHeader>
                <CardBody>Double Slider </CardBody>
            </Card>
            <Card className='mb-3'>
                <CardHeader tag={'h4'}>Other</CardHeader>
                <CardBody>Tags </CardBody>
            </Card>
        </div>
    )

    return content
}

export default ShopFilters