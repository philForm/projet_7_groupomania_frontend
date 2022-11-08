import { useRef, useState } from "react";
import Signup from "../Signup";
import Login from "../Login";

import './formElem.css'


const FormElem = () => {

    const [displaySignup, setDisplaySignup] = useState(true)
    const [displayLogin, setDisplayLogin] = useState(false)

    const signup = useRef();
    const login = useRef();
    const span = useRef();

    const formDisplayAfterValid = () => {
        login.current.classList = "disp_none";
        span.current.classList = "disp_bloc";
        setDisplaySignup(false);
        setDisplayLogin(true)
    }

    const displayForm = (e) => {
        if (e.target.id === "signup") {
            login.current.className = "wid btn-primary";
            signup.current.className = "disp_none";
            setDisplaySignup(true);
            setDisplayLogin(false);
        } else {
            login.current.className = "disp_none";
            signup.current.className = "wid btn-primary";
            setDisplaySignup(false);
            setDisplayLogin(true);
        }
    }

    return (
        <div className="App" >
            <div className="form_1" >
                <button className="btn-primary disp_none" onClick={displayForm} id="signup" ref={signup}>
                    Aller au formulaire d'inscription
                </button>

                <button className="btn-primary wid" onClick={displayForm} id="login" ref={login}>
                    Aller au formulaire de connexion
                </button>
                {displaySignup &&
                    <Signup sign={formDisplayAfterValid} />
                }
                {displayLogin &&
                    <Login />
                }
                <span className="disp_none" ref={span}>
                    Vous pouvez vous connecter !
                </span>
            </div>
        </div>
    )
}

export default FormElem
