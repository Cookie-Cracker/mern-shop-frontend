import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Label, FormGroup, Button, } from 'reactstrap'
import { useFormik } from 'formik'
import { useUpdateBrandMutation } from './brandsApiSlice';
import { useNavigate } from 'react-router-dom';

import SubPage from '../../components/Manager/SubPage';


const EditBrandForm = ({ brand }) => {
    const navigate = useNavigate()
    const [name, setName] = useState(brand.name);
    const [description, setDescription] = useState(brand.description);
    const [isActive, setIsActive] = useState(brand.isActive);

    const onNameChange = e => setName(e.target.value)
    const onDescriptionChange = e => setDescription(e.target.value)
    const onIsActiveChange = e => setIsActive(e.target.value)

    // const [updateBrand, {

    // }] = 

    const handleSubmit = () => {

    }

    const validate = values => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }

        if (!values.description) {
            errors.description = 'Required';
        } else if (values.description.length < 20) {
            errors.description = 'Must be 20 characters or less';
        }

        // if (!values.isActive) {
        //   errors.email = 'Required';
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //   errors.email = 'Invalid email address';
        // }

        return errors;
    };




    const formik = useFormik({
        initialValues: {
            name: name,
            description: description,
            isActive: isActive
        },
        validate,
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
            const { name, description, isActive } = formik.values
            await updateBrand({ id: brand.id, name: name, description: description, isActive: isActive })
        },


    })

    const [updateBrand, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateBrandMutation()
    const errClass = (isError) ? "errmsg" : "offscreen"

    useEffect(() => {
        if (isSuccess) {
            navigate(-1)
        }
    }, [isSuccess, navigate]);

    let edit_brand_form = (


        <form onSubmit={formik.handleSubmit}>
            <Row>

                <Col xs='12'>
                    <FormGroup>
                        <Label for='name'>Name</Label>
                        <Input
                            id='name'
                            name='name'

                            type='text'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Brand Name'

                        />
                        {formik.errors.name && formik.touched.name ? <p className='errmsg'>{formik.errors.name}</p> : null}
                    </FormGroup>

                </Col>
                <Col xs='12' md='12'>
                    <FormGroup>
                        <Label for='description'>Description</Label>
                        <Input
                            id='description'
                            type='textarea'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            rows='4'
                            name='description'
                            placeholder='Description'

                        />

                        {formik.errors.description && formik.touched.description ? <p className='errmsg'>{formik.errors.description}</p> : null}

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
                                // checked={isActive}

                                checked={formik.values.isActive}
                                onChange={formik.handleChange}

                            />
                        </div>
                    </FormGroup>
                </Col>


            </Row>
            {/* <p className='errmsg'>{errFieldError}</p> */}

            <Button type='submit' block color='success'>Save</Button>
        </form>

    )
    const content = (
        <section className='new-product'>

            <SubPage
                title='Edit Brand'
                actionName='Cancel'
                handleAction={() => navigate(-1)}
            >
                {edit_brand_form}
            </SubPage>


        </section>
    )
    return content
}

export default EditBrandForm