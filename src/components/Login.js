import axios from 'axios';
import React, { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

import { tokenService } from '../services/service';


// axios.interceptors.request.use((config) => {
//     config.headers.authorization = `Bearer ${tokenElt}`;
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

const Login = () => {

    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();

    const email = useRef();
    const password = useRef();
    const validEmail = useRef();
    const validPassword = useRef();

    console.log(axios)

    const handleSubmit = async (e) => {

        e.preventDefault();

        const dataLogin = {
            email: email.current.value,
            password: password.current.value
        }

        console.log(validEmail)


        axios.post(`${process.env.REACT_APP_URL_API}api/auth/login`, dataLogin)

            .then((res) => {
                if (res.status === 200) {
                    console.log(res)
                    tokenService.saveToken(JSON.stringify(res.data))
                    navigate("/");
                    return res
                }
            })
            .catch(err => console.log(err))

        // axios.interceptors.request.use((config) => {
        //     config.headers.authorization = `Bearer ${tokenElt}`;
        //     return config;
        // }, (error) => {
        //     return Promise.reject(error);
        // });
    }

    // setValidated(true);
    // };

    return (
        <div className="form">
            <h2>Connexion</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-2">

                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
                        <div className='disp_flex'>
                            <InputGroup.Text id="inputGroupPrepend" className='border_arob'>@</InputGroup.Text>
                            <Form.Control className='border_mail'
                                ref={email}
                                type="email"
                                name='email'
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={password}
                            type="password"
                            placeholder="password"
                            required
                        />
                        <Form.Control.Feedback type="invalid" ref={validPassword} />
                    </Form.Group>
                </Row>
                {/* <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group> */}
                <Button type="submit">Connexion</Button>
            </Form>
        </div>
    )
}


export default Login