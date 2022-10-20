import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../services/service";
import { Button } from "react-bootstrap";
import logo from "../assets/logo512.png";


const Navbar = () => {

  const deconnect = useRef();
  const signup = useRef();

  const navigate = useNavigate();

  console.log(deconnect);

  const [logged, setLogged] = useState(false)


  const isLogged = (logged) => {
    if (tokenService.isLogged()) {
      logged = true;
    } else {
      logged = false;
    }
    return logged
  };



  const logout = () => {
    tokenService.logOut()
    deconnect.current.classList.value = "disp_none";
    isLogged(logged)
  };


  return (
    <div className="margin nav justify-content-between">
      <div >
        <img src={logo} alt="logo" className="logo App-logo" />
      </div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Accueil</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" ref={signup} to="/form">Inscription</Link>
        </li>

        {isLogged(logged) &&
          <li className="nav-item">
            <Button onClick={logout} ref={deconnect}>Déconnexion</Button>
          </li>
        }
      </ul>

    </div >
  )
}

export default Navbar; 