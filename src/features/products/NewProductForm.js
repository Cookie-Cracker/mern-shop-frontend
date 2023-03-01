import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Input, Label, FormGroup, List, ListGroup, DropdownMenu, DropdownItem, ButtonGroup, Button, Container } from 'reactstrap'
import SubPage from '../../components/Manager/SubPage'
import { useGetBrandsQuery } from '../brands/brandsApiSlice'
import { useAddNewProductMutation } from './productsApiSlice'

const NewProductForm = () => {

    const [addNewProduct, {

        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewProductMutation()

    const navigate = useNavigate()
    const skuRef = useRef()

    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [taxable, setTaxable] = useState('');
    const [brandId, setBrandID] = useState('');
    const [isActive, setIsActive] = useState(true)
    const [image, setImage] = useState('')

    const [options, setOption] = useState('')
    const errClass = isError ? "errmsg" : "offscreen"
    const [errFieldError, seterrFieldError] = useState('');

    const [src, setSrc] = useState('');
    const [imgInputClass, setimgInputClass] = useState('d-none');


    useEffect(() => {
        !image ? setimgInputClass('d-none') : setimgInputClass('img-preview-show')
    }, [image]);

    const taxableOptions = (
        <>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
        </>
    )

    const {
        data: brands,
        isLoading: isBrandLoading,
        isSuccess: isBrandSuccess,
        isError: isBrandError,
        error: brandError
    } = useGetBrandsQuery()

    useEffect(() => {
        if (isSuccess) {
            seterrFieldError('')
        }
    }, [isSuccess]);


    useEffect(() => {
        skuRef.current.focus()
        if (isBrandSuccess) {

            const { ids: brandsIds, entities } = brands
            var options = brandsIds.map(brandId => {
                return (
                    <option key={brandId} value={brandId}>{entities[brandId].name}</option>
                )
            })
            setOption(options)
        }
    }, [isBrandSuccess, brands]);

    const canSave = [sku, name, description, price, quantity, taxable, brandId, image].every(Boolean)
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('image', image)
        console.log('submitted', canSave)
        // await addNewProduct({ sku, name, description, quantity, price, taxable, brand: brandId, isActive, image })
        if (canSave) {

            const formData = new FormData()
            formData.append('sku', sku)
            formData.append('name', name)
            formData.append('description', description)
            formData.append('quantity', quantity)
            formData.append('price', price)
            formData.append('taxable', taxable)
            formData.append('brand', brandId)
            formData.append('image', image)

            await addNewProduct(formData)
        }
        else {
            seterrFieldError('All Fields Required!!')
        }

    }


    const onSkuChange = e => setSku(e.target.value)
    const onNameChange = e => setName(e.target.value)
    const onDescritptionChanged = e => setDescription(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onQuantityChanged = e => setQuantity(e.target.value)
    const onTaxableChanged = e => setTaxable(e.target.value)
    const onBrandChanged = e => setBrandID(e.target.value)
    const onIsActiveChanged = e => setIsActive(prev => !prev)
    const onFileChange = e => {
        setImage(e.target.files[0])
        if (e.target.files.length > 0) {
            var src = URL.createObjectURL(e.target.files[0]);
            setSrc(src)
            setimgInputClass('img-preview-show')

        }

    }

    // validation
    useEffect(() => {

    }, [canSave]);


    let add_product_form = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Col xs='12' lg='6'>
                        <FormGroup>

                            <Label htmlFor='sku'>SKU</Label>
                            <Input
                                id='sku'
                                type='text'
                                name='sku'
                                value={sku}
                                onChange={onSkuChange}
                                placeholder='Product Sku'
                                innerRef={skuRef}

                            />
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id='name'
                                type='text'
                                name='name'
                                value={name}
                                onChange={onNameChange}
                                placeholder='Product Name'
                            />
                        </FormGroup>

                    </Col>
                    <Col xs='12' md='12'>
                        <FormGroup>
                            <Label htmlFor='description'>Description</Label>
                            <Input
                                id='description'
                                type='textarea'
                                rows='4'
                                name='description'
                                value={description}
                                onChange={onDescritptionChanged}
                                placeholder='Description'

                            />
                        </FormGroup>
                    </Col>

                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label htmlFor='quantity'>Quantity</Label>

                            <Input
                                id='quantity'
                                type='number'
                                name='quantity'
                                value={quantity}
                                onChange={onQuantityChanged}
                                placeholder='Quantity'

                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label htmlFor='quantity'>Price</Label>

                            <Input
                                id='price'
                                type='number'
                                name='price'
                                value={price}
                                onChange={onPriceChanged}
                                placeholder='Price'

                            ></Input>
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='12'>
                        <FormGroup>
                            <Label htmlFor='taxable'>Taxable</Label>
                            <Input
                                id='taxable'
                                name='taxable'
                                value={taxable}
                                onChange={onTaxableChanged}
                                type='select'
                            >
                                <option value={''}>-  Select an option   -</option>

                                {taxableOptions}
                            </Input>

                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='12'>
                        <FormGroup>
                            <Label htmlFor='brand'>Select Brand</Label>
                            <Input
                                id='brand'
                                name='brand'
                                type='select'
                                value={brandId}
                                onChange={onBrandChanged}
                            >
                                <option value={''}>-  Select a Brand   -</option>
                                {options}
                            </Input>

                        </FormGroup>
                    </Col>
                    <p>{isBrandError ? error.data.message : ''}</p>
                    <Col xs='12' lg='12'>
                        <div className={imgInputClass}>
                            <img src={src} alt="as" />
                        </div>
                    </Col>
                    <Col xs='12' lg='12'>
                        <FormGroup>
                            <Label htmlFor='image'>Image</Label>
                            <Input
                                id='image'
                                name='image'
                                type='file'

                                accept='image/jpeg, img/png'
                                placeholder='Select an Image. Formats: []'
                                onChange={onFileChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='12'>

                        {/* TODO: create component */}
                        <FormGroup>
                            <div className="form-check form-switch form-control-lg">
                                <Label for='isActive'><span className='fs-6'>Is Active?</span></Label>
                                <input
                                    className="form-check-input "
                                    type="checkbox"
                                    role="switch"
                                    // id="flexSwitchCheckDefault" 
                                    id="isActive"
                                    name='isActive'
                                    checked={isActive}

                                    onChange={onIsActiveChanged}

                                />
                            </div>

                        </FormGroup>
                    </Col>
                </Row>
                <p className='errmsg'>{errFieldError}</p>
                <Button block color='success'>Add Product</Button>
            </form>
        </>
    )

    const content = (
        <section className='new-product'>

            <SubPage
                title='Add Product'
                actionName='Cancel'
                handleAction={() => navigate(-1)}
            >
                {add_product_form}
            </SubPage>


        </section>
    )
    return content
}

export default NewProductForm