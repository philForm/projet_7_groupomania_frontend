import React, { useState, useRef } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

const Signup = (sign) => {
    const [validated, setValidated] = useState(false);
    const [validInput, setValidInput] = useState({
        bool: true,
        text: "Champ requis !"
    })
    const [verifEmail, setVerifEmail] = useState({
        bool: false, text: "L'email est invalide"
    });
    const [verifPassword, setVerifPassword] = useState({
        bool: false,
        text: {
            valid: "Veuillez retaper le mot de passe !",
            validConfirm: "Les mots de passe ne correspondent pas !"
        }
    });

    console.log(sign)


    const firstName = useRef();
    const firstNameControl = useRef();
    const lastName = useRef();
    const lastNameControl = useRef()
    const email = useRef();
    const emailControl = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const valid = useRef();
    const valid2 = useRef();
    const formVerif = useRef();

    console.log(process.env.REACT_APP_URL_API)



    const handleSubmit = (e) => {

        e.preventDefault();
        e.stopPropagation()
        console.log(valid)
        console.log(valid2)
        console.log(emailControl.current.innerText)
        console.log(password.current.value)
        console.log(passwordConfirm.current.value)

        console.log(formVerif)
        console.log(firstName.current.required)
        console.log(firstName.current.value.length)


        if (firstName.current.value.length === 0) {
            firstNameControl.current.classList.value = "my_red";
            firstNameControl.current.innerText = validInput.text;
            validInput.bool = false;
        }
        if (lastName.current.value.length === 0) {
            lastNameControl.current.classList.value = "my_red";
            lastNameControl.current.innerText = validInput.text;
            validInput.bool = false;
        }
        if (email.current.value.length === 0) {
            emailControl.current.classList.value = "my_red";
            emailControl.current.innerText = validInput.text;
            validInput.bool = false;
        }
        if (password.current.value.length === 0) {
            valid.current.classList.value = "my_red";
            valid.current.innerText = validInput.text;
            validInput.bool = false;
        }
        if (passwordConfirm.current.value.length === 0) {
            valid2.current.classList.value = "my_red";
            valid2.current.innerText = validInput.text;
            validInput.bool = false;
        }

        if (email.current.value.length !== 0) {

            if (regexEmail.test(email.current.value) && email.current.value.length !== 0) {
                emailControl.current.classList.value = "invalid-feedback";
                verifEmail.bool = true;
            }
            else {
                emailControl.current.classList.value = "my_red";
                emailControl.current.innerText = verifEmail.text;
                verifEmail.bool = false;
            }
        }

        console.log(verifEmail.bool)


        if (password.current.value === passwordConfirm.current.value) {
            valid.current.classList.value = "invalid-feedback";
            valid2.current.classList.value = "invalid-feedback";
            verifPassword.bool = true
        }
        else {
            valid.current.classList.value = "my_red"
            valid2.current.classList.value = "my_red"
            password.current.value = "";
            passwordConfirm.current.value = "";
            verifPassword.bool = false;
        }

        if (verifEmail.bool && verifPassword.bool && validInput.bool) {

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
        }





        // 

        // Pour changer l'attribut isvalid
        console.log(valid.current.attributes[0].value)

        // setValidated(true);
    }

    return (
        <div className='form'>
            <h2>Enregistrement</h2>
            <Form id="form" noValidate validated={validated} onSubmit={handleSubmit} ref={formVerif}>
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
                        <Form.Control.Feedback ref={firstNameControl} />
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
                        <Form.Control.Feedback ref={lastNameControl} />
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Label>Email</Form.Label>
                        <div className='disp_flex'>
                            <InputGroup.Text id="inputGroupPrepend" className='border_arob'>@</InputGroup.Text>
                            <Form.Control className='border_mail form-control'
                                ref={email}
                                type="email"
                                name='email'
                                placeholder="Email"
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                        </div>
                        <Form.Control.Feedback type="invalid" ref={emailControl}>
                            {/* {verifEmail.text} */}
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control
                            ref={password}
                            type="password"
                            name='password'
                            placeholder="password"
                            required />
                        <Form.Control.Feedback type="invalid" ref={valid} >
                            {verifPassword.text.valid}
                        </Form.Control.Feedback >

                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                        <Form.Label>Confirmation du mot de passe</Form.Label>
                        <Form.Control
                            ref={passwordConfirm}
                            type="password"
                            name='password-confirm'
                            placeholder="password confirm"
                            required />
                        <Form.Control.Feedback type="invalid" ref={valid2} >
                            {verifPassword.text.validConfirm}
                        </ Form.Control.Feedback>
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
        </div>
    );
};

export default Signup;