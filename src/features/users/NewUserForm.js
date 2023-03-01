import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Row, Col, Input, Label, FormGroup, List, ListGroup, DropdownMenu, DropdownItem, ButtonGroup, Button, Container } from 'reactstrap'
import SubPage from '../../components/Manager/SubPage'
import Roles from './Roles'
import { regex } from '../../app/constants'
import InputMask from 'react-input-mask';
import { useAddNewUserMutation } from './usersApiSlice'


const NewUserForm = () => {
    const navigate = useNavigate()
    const usernameRef = useRef(null)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false);
    const [roles, setRoles] = useState([])
    const [errFieldError, seterrFieldError] = useState('');

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()


    const canSave = [validEmail, validPhone].every(Boolean)

    useEffect(() => {
        usernameRef.current.focus();

    }, []);
    useEffect(() => {
        setValidEmail(regex.email.test(email))


    }, [email]);


    useEffect(() => {
        setValidPhone(regex.phone.test(phone))
    }, [phone]);

    useEffect(() => {
        if (isSuccess) {
            seterrFieldError('')
            setRoles([])
            navigate('/dashboard/users')
        }
    }, [isSuccess, navigate]);

    const onUsernameChange = e => setUsername(e.target.value)
    const onEmailChange = e => { setEmail(e.target.value) }
    const onPasswordChange = e => setPassword(e.target.value)
    const onPhoneChange = e => {
        setPhone(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, email, password, phone, roles })

        }
        else {
            seterrFieldError('All Fields are Required')
        }


    }
    const validEmailClass = !validEmail ? 'form-input-incomplete' : ''
    const validPhoneClass = !validPhone ? 'form-input-incomplete' : ''
    const errClass = isError ? 'errmsg' : 'offscreen'

    let add_user_form = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <Form onSubmit={handleSubmit} >
                <pre>{JSON.stringify(roles)}</pre>
                <Row>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label for='username'>Username</Label>
                            <Input
                                id='username'
                                type='text'
                                placeholder='Username'
                                innerRef={usernameRef}
                                value={username}
                                autoComplete="off"
                                onChange={onUsernameChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label for='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={onPasswordChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label for='email'>Email</Label>
                            <Input
                                id='email'
                                type='text'
                                placeholder='Email'
                                className={`${validEmailClass}`}
                                value={email}
                                onChange={onEmailChange}
                                autoComplete="off"
                            />
                        </FormGroup>
                    </Col>
                    <Col xs='12' lg='6'>
                        <Roles setRoles={setRoles} />
                    </Col>
                    <Col xs='12' lg='6'>
                        <FormGroup>
                            <Label for='phone'>Phone</Label>
                            <Input
                                id='phone'
                                type='phone'
                                placeholder='Phone Number'
                                className={validPhoneClass}
                                value={phone}
                                onChange={onPhoneChange}
                            />
                            {/* <div>

                                <InputMask
                                    mask='999 999 9999'
                                    id='phone'
                                    value={phone}
                                    onChange={onPhoneChange}
                                    className={validPhoneClass}
                                    alwaysShowMask

                                />
                            </div> */}
                            <div style={{ paddingTop: '12px' }}>Phone: {phone}</div>
                        </FormGroup>
                    </Col>



                </Row>
                <p>{errFieldError}</p>
                <Col xs='12' lg='6'>
                    <FormGroup>

                        <Button type='submit' block color='success'>Add</Button>
                    </FormGroup>
                </Col>
            </Form>
        </>

    )
    let content = (
        <section className='new-user'>

            <SubPage
                title='Add User'
                actionName='Cancel'
                handleAction={() => navigate(-1)}
            >
                {add_user_form}
            </SubPage>


        </section>


    )
    return content
}

export default NewUserForm