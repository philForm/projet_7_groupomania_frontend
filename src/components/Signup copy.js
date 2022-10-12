import React, { useState, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const Signup = (sign) => {
    const [validated, setValidated] = useState(false);

    console.log(sign)


    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const emailControl = useRef()
    const password = useRef()
    const passwordConfirm = useRef()
    const valid = useRef()
    const valid2 = useRef()

    console.log(process.env.REACT_APP_URL_API)

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation()
        console.log(valid)
        console.log(valid2)

        console.log(emailControl.current.innerText)

        console.log(password.current.value)
        console.log(passwordConfirm.current.value)

        if (password.current.value === passwordConfirm.current.value) {
            valid.current.classList.value = "invalid-feedback";
            valid2.current.classList.value = "invalid-feedback";

            axios.post(`${process.env.REACT_APP_URL_API}api/auth/signup`,
                {
                    firstname: firstName.current.value,
                    lastname: lastName.current.value,
                    email: email.current.value,
                    password: password.current.value,
                    picture: ""
                }
            ).then((res) => {
                if (res.status === 201) {
                    console.log(res)
                    sign.sign()
                }
                if (res.data.message) {
                    emailControl.current.classList.value = "my_red"
                    emailControl.current.innerText = res.data.message;
                    console.log(res.data.message)
                }
            })
                .catch(err => console.log(err))




        } else {
            valid.current.classList.value = "my_red"
            valid2.current.classList.value = "my_red"
            valid.current.innerText = "Veuillez retaper le mot de passe !";
            valid2.current.innerText = "Les mots de passe ne correspondent pas !";
            password.current.value = "";
            passwordConfirm.current.value = "";

        }
        // 

        // Pour changer l'attribut isvalid
        console.log(valid.current.attributes[0].value)

        // setValidated(true);
    }


    return (
        <div className='form'>
            <h2>Enregistrement</h2>
            <Form id="form" noValidate validated={validated} onSubmit={handleSubmit} >
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                            ref={firstName}
                            required
                            name='firtName'
                            type="text"
                            placeholder="First name"
                        />
                        <Form.Control.Feedback />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                            ref={lastName}
                            required
                            name='lastName'
                            type="text"
                            placeholder="Last name"
                        />
                        <Form.Control.Feedback />
                    </Form.Group>
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
                        <Form.Control.Feedback type="invalid" ref={emailControl} />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            ref={password}
                            type="password"
                            name='password'
                            placeholder="password"
                            required />
                        <Form.Control.Feedback type="invalid" ref={valid} />

                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Confirmation du mot de passe</Form.Label>
                        <Form.Control
                            ref={passwordConfirm}
                            type="password"
                            name='password-confirm'
                            placeholder="password confirm"
                            required />
                        <Form.Control.Feedback type="invalid" ref={valid2} />
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
                <Button type="submit">Inscription</Button>
            </Form>
        </div >
    );
};

export default Signup;