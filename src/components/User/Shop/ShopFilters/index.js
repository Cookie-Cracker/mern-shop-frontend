import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Row, Col, CardTitle } from 'reactstrap'
import MultiRangeSlider from "multi-range-slider-react";

export const PriceFilter = (props) => {
    const { setMinPrice, setMaxPrice } = props

    const [minValue, set_minValue] = useState(0);
    const [maxValue, set_maxValue] = useState(500);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
        setMinPrice(e.minValue)
        setMaxPrice(e.maxValue)
    };
    const content = (
        <div className='filters'>

            <Card className='mb-3 shop-toolbar'>
                <CardTitle tag={'h5'} className={'m-2'}>Price</CardTitle>

                <CardBody>
                    <MultiRangeSlider
                        ruler='false'

                        min={0}
                        max={500}
                        step={5}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                            handleInput(e);
                        }}
                    />
                </CardBody>
            </Card>




            <Card className='mb-3 shop-toolbar'>
                <CardTitle tag={'h5'} className={'m-2'}>Other</CardTitle>
                <CardBody>Tags </CardBody>
            </Card>
        </div>
    )

    return content
}

