import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Signup = () => {
    const [validated, setValidated] = useState(false);

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const passwordA = useRef()
    const passwordB = useRef()
    const pass = useRef()




    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation()
        console.log(pass)

        console.log(pass.current.attributes[0].value)

        const submitObj = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            email: email.current.value,
        }
        console.log(submitObj)

        // Pour changer l'attribut isvalid
        pass.current.attributes[0].value = ""

        // setValidated(true);
    }



    return (
        <div className='form'>
            <h2>Enregistrement</h2>
            <Form id="form" noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            ref={firstName}
                            required
                            name='firtName'
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            ref={lastName}
                            required
                            name='lastName'
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                ref={email}
                                type="text"
                                name='email'
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={passwordA}
                            type="password"
                            name='password'
                            placeholder="password"
                            required />
                        <Form.Control.Feedback type="invalid" ref={pass}>
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            ref={passwordB}
                            type="password"
                            name='passwordB'
                            placeholder="password confirm"
                            required />
                        <Form.Control.Feedback type="invalid">
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
                <Button type="submit">Submit form</Button>
            </Form>
        </div>
    );
};

// render(<FormExample />);
export default Signup;