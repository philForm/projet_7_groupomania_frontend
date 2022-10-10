import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";


const FormElem = () => {

    const [displaySignup, setDisplaySignup] = useState(true)
    const [displayLogin, setDisplayLogin] = useState(false)

    const signup = useRef();
    const login = useRef();

    console.log(signup)

    const displayForm = (e) => {
        if (e.target.id === "signup") {
            login.current.className = "primary wid btn btn-primary";
            signup.current.className = "disp_none";
            setDisplaySignup(true);
            setDisplayLogin(false);
        } else {
            login.current.className = "disp_none";
            signup.current.className = "primary wid btn btn-primary";
            setDisplaySignup(false);
            setDisplayLogin(true);
        }
    }

    return (
        <div className="form_1">
            <Button className="disp_none" onClick={displayForm} id="signup" ref={signup}>
                Inscription
            </Button>
            <Button className="primary wid" onClick={displayForm} id="login" ref={login}>
                Connexion
            </Button>
            {displaySignup && <Signup />}
            {displayLogin && <Login />}
        </div>
    )
}

export default FormElem
