import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'
import SubPage from '../../components/Manager/SubPage'
import { useAddNewBrandMutation } from './brandsApiSlice'

import { successNotification } from '../../components/Common/Notifications'


const NewBrandForm = () => {

    const navigate = useNavigate()
    const brandNameRef = useRef(null)

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [errFieldError, seterrFieldError] = useState('');


    const onNameChange = e => setName(e.target.value)
    const onDescriptionChange = e => setDescription(e.target.value)
    const onIsActiveChange = e => setIsActive(prev => !prev)



    const [addNewBrand, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewBrandMutation()

    const canSave = [name, description].every(Boolean)
    useEffect(() => {
        brandNameRef.current.focus()
    }, []);

    useEffect(() => {

        if (isSuccess) {

            seterrFieldError('')
            setName('')
            setDescription('')
            setIsActive(false)
            successNotification('Brand Added')
            navigate('/dashboard/brands')
        }

    }, [isSuccess]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (canSave) {
            await addNewBrand({ name, description, isActive })
        }
        else {
            seterrFieldError("All Fields are Required")
        }
    };
    let add_brand_form = (
        <form onSubmit={handleSubmit}>
            <Row>

                <Col xs='12'>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                            id='name'
                            name='name'
                            innerRef={brandNameRef}

                            type='text'
                            value={name}
                            onChange={onNameChange}
                            placeholder='Brand Name'

                        />
                    </FormGroup>

                </Col>
                <Col xs='12' md='12'>
                    <FormGroup>
                        <Label for='description'>Description</Label>
                        <Input
                            id='description'
                            type='textarea'
                            value={description}
                            onChange={onDescriptionChange}
                            rows='4'
                            name='description'
                            placeholder='Description'

                        />
                    </FormGroup>
                </Col>
                <Col xs='12' lg='12'>

                    {/* TODO: create component */}
                    <FormGroup>
                        <div className="form-check form-switch form-control-lg">
                            {/* <label className="form-check-label fs-6" for="flexSwitchCheckDefault">Active?</label> */}
                            <Label for='isActive'><span className='fs-6'>Is Active?</span></Label>
                            <input
                                className="form-check-input "
                                type="checkbox"
                                role="switch"
                                // id="flexSwitchCheckDefault" 
                                id="isActive"
                                name='isActive'
                                checked={isActive}

                                onChange={onIsActiveChange}

                            />
                        </div>
                    </FormGroup>
                </Col>


            </Row>
            <p className='errmsg'>{errFieldError}</p>

            <Button block color='success'>Add Brand</Button>
        </form>
    )
    const content = (
        <section className='new-product'>

            <SubPage
                title='Add Brand'
                actionName='Cancel'
                handleAction={() => navigate(-1)}
            >
                {add_brand_form}
            </SubPage>


        </section>
    )
    return content
}

export default NewBrandForm