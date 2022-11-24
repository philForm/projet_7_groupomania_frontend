import React, { useState, useRef } from 'react';
import axios from 'axios';
import { requiredForm } from '../../functions/users_functions.js';

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

/**
 * Enregistre un utilisateur :
 * @param {*} props 
 */
const Signup = (props) => {

    const [validInput, setValidInput] = useState({
        bool: true,
        text: "Champ requis !"
    })
    const [verifEmail, setVerifEmail] = useState({
        bool: false,
        text: "L'email est invalide"
    });
    const [verifPassword, setVerifPassword] = useState({
        bool: false,
        text: {
            valid: "Veuillez retaper le mot de passe !",
            validConfirm: "Les mots de passe ne correspondent pas !"
        }
    });


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


    const handleSubmit = (e) => {

        e.preventDefault();

        validInput.bool = true;

        requiredForm(firstName, firstNameControl, validInput, "my_red", "invalid-feedback");
        requiredForm(lastName, lastNameControl, validInput, "my_red", "invalid-feedback");
        requiredForm(email, emailControl, validInput, "my_red", "invalid-feedback");
        requiredForm(password, valid, validInput, "my_red", "invalid-feedback");
        requiredForm(passwordConfirm, valid2, validInput, "my_red", "invalid-feedback");

        // Si le champ de l'email n'est pas vide
        if (email.current.value.length !== 0) {
            // Si l'email est valide
            if (regexEmail.test(email.current.value)) {

                emailControl.current.classList.value = "invalid-feedback";
                verifEmail.bool = true;
            }
            // Si l'email n'est pas valide
            else {
                emailControl.current.classList.value = "my_red";
                emailControl.current.innerText = verifEmail.text;
                verifEmail.bool = false;
            }
        }

        // Si les champs du mot de passe ne sont pas vides :
        if (password.current.value.length !== 0 || passwordConfirm.current.value.length !== 0) {
            // Si les deux mots de passe correspondent :
            if (password.current.value === passwordConfirm.current.value) {
                valid.current.classList.value = "invalid-feedback";
                valid2.current.classList.value = "invalid-feedback";
                verifPassword.bool = true;
            }
            else {
                valid.current.classList.value = "my_red";
                valid2.current.classList.value = "my_red";
                valid.current.innerText = verifPassword.text.valid
                valid2.current.innerText = verifPassword.text.validConfirm
                password.current.value = "";
                passwordConfirm.current.value = "";
                verifPassword.bool = false;
            }
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
                // Si tout s'est bien passé, l'utilisateur est créé :
                if (res.status === 201) {
                    props.dispForm();
                }
                // Si l'email existe déjà dans la BDD :
                if (res.data.message) {
                    emailControl.current.classList.value = "my_red";
                    emailControl.current.innerText = res.data.message;
                }
                // Si le mot de passe n'est pas assez sécurisé :
                if (res.data.message2) {
                    valid.current.classList.value = "my_red";
                    valid.current.innerText = res.data.message2.pass;
                    valid2.current.classList.value = "my_red";
                    valid2.current.innerText = res.data.message2.pass2;

                }
            })
                .catch(err => console.error(err));
        };

        // Pour changer l'attribut isvalid
        console.log(valid.current.attributes[0].value)

    };

    return (
        <div className='form'>
            <h2>Enregistrement</h2>
            <form id="form" noValidate onSubmit={handleSubmit} ref={formVerif} name="signup_form">
                <div className='disp_flex_column'>
                    <label htmlFor='signup_firstname'>Prénom</label>
                    <input
                        ref={firstName}
                        id='signup_firstname'
                        name='firtName'
                        type="text"
                        placeholder="Prénom"
                        required
                    />
                    <span ref={firstNameControl} />
                </div>
                <div className='disp_flex_column'>
                    <label htmlFor='signup_lastname'>Nom</label>
                    <input
                        ref={lastName}
                        required
                        id='signup_lastname'
                        name='lastName'
                        type="text"
                        placeholder="Nom"
                    />
                    <span ref={lastNameControl} />
                </div>
                <div className='disp_flex_column'>
                    <label htmlFor='signup_email'>Email</label>
                    <input className=''
                        ref={email}
                        id='signup_email'
                        type="email"
                        name='email'
                        placeholder="Email"
                        required
                    />
                    <span type="invalid" ref={emailControl}>
                        {/* {verifEmail.text} */}
                    </span>
                </div>
                <div className='disp_flex_column'>
                    <label htmlFor='signup_pass'>Mot de passe</label>
                    <input
                        ref={password}
                        id='signup_pass'
                        type="password"
                        name='password'
                        placeholder="Mot de passe"
                        required />
                    <span type="invalid" ref={valid} >
                        {/* {verifPassword.text.valid} */}
                    </span >
                </div>
                <div className='disp_flex_column'>
                    <label htmlFor='signup_pass_confirm'>Confirmation du mot de passe</label>
                    <input
                        ref={passwordConfirm}
                        id='signup_pass_confirm'
                        type="password"
                        name='password-confirm'
                        placeholder="Confirmation du mot de passe"
                        required />
                    <span type="invalid" ref={valid2} >
                        {/* {verifPassword.text.validConfirm} */}
                    </ span>
                </div>
                <button className='btn-primary' type="submit">Inscription</button>
            </form>
        </div>
    );
};

export default Signup;