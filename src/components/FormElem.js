import Button from "react-bootstrap/Button";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";


const FormElem = () => {

    const [displaySignup, setDisplaySignup] = useState(true)
    const [displayLogin, setDisplayLogin] = useState(false)

    const displayForm = (e) => {
        if (e.target.id === "signup") {
            setDisplaySignup(true);
            setDisplayLogin(false);
        } else {
            setDisplaySignup(false);
            setDisplayLogin(true);
        }




    }

    return (
        <div className="form_1">
            <Button className="primary wid" onClick={displayForm} id="signup">
                Inscription
            </Button>
            <Button className="primary wid" onClick={displayForm}>
                Connexion
            </Button>
            {displaySignup && <Signup />}
            {displayLogin && <Login />}
        </div>
    )
}

export default FormElem
