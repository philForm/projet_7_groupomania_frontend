import axios from 'axios';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Login = () => {

    const [validated, setValidated] = useState(false);

    const email = useRef();
    const password = useRef();
    const validEmail = useRef();
    const validPassword = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(validEmail)
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        // e.preventDefault();
        // e.stopPropagation();

        axios.post(`${process.env.REACT_APP_URL_API}api/auth/login`,
            {
                email: email.current.value,
                password: password.current.value,
            }
        ).then((res) => {
            if (res.status === 200) {
                console.log(res.data)

            } else {
                validEmail.current.className = "";
                validPassword.current.className = ""
            }
        })
            .catch(err => console.log(err))
    }

    // setValidated(true);
    // };

    return (
        <div className='form'>
            <h2>Connexion</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-2">

                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                ref={email}
                                type="email"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid" ref={validEmail}>
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={password}
                            type="password"
                            placeholder="password"
                            required
                        />
                        <Form.Control.Feedback type="invalid" ref={validPassword}>
                            Please provide a valid password.
                        </Form.Control.Feedback>
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