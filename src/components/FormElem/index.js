import { useRef, useState } from "react";
import Signup from "../Signup";
import Login from "../Login";

import './formElem.css';
import Button from "../../Bouton";

/**
 * Formulaires d'enregistrement et de connexion :
 */
const FormElem = () => {

    const [displaySignup, setDisplaySignup] = useState(false)
    const [displayLogin, setDisplayLogin] = useState(true)

    const signup = useRef();
    const login = useRef();


    /**
     * Alterne l'affichage entre signup et login
     */
    const displayForm = () => {
        if (login.current.className === "disp_none") {
            login.current.className = "wid btn-primary";
            signup.current.className = "disp_none";
            console.log(signup);
            setDisplaySignup(false);
            setDisplayLogin(true);

        } else {
            login.current.className = "disp_none";
            signup.current.className = "wid btn-primary";
            setDisplaySignup(true);
            setDisplayLogin(false);
        };
    };

    return (
        <div className="App" >
            <div className="form_1" >
                <Button
                    class="disp_none"
                    click={displayForm}
                    id="signup"
                    innerRef={signup}
                >Aller au formulaire de connexion</Button>
                <Button
                    class="wid"
                    click={displayForm}
                    id="login"
                    innerRef={login}
                >Aller au formulaire d'inscription</Button>
                {displaySignup &&
                    <Signup dispForm={displayForm} />
                }
                {displayLogin &&
                    <Login />
                }
            </div>
        </div>
    );
};

export default FormElem;
