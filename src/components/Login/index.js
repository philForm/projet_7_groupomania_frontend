import axios from 'axios';
import React, { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { tokenService } from '../../services/service';


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
            <form noValidate onSubmit={handleSubmit}>
                <div className='disp_flex_column'>
                    <label htmlFor='connect_email'>Email</label>
                    <input className=''
                        ref={email}
                        id='connect_email'
                        type="email"
                        name='email'
                        placeholder="Email"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <span type="invalid" ref={validPassword} />
                </div>
                <div className='disp_flex_column'>
                    <label htmlFor='connect_pass'>Mot de passe</label>
                    <input
                        ref={password}
                        id="connect_pass"
                        type="password"
                        placeholder="Mot de passe"
                        required
                    />
                    <span type="invalid" ref={validPassword} />
                </div>
                <button className='btn-primary' type="submit">Connexion</button>
            </form>
        </div >
    )
}


export default Login