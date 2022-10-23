import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../services/service";
// import logo from "../assets/logo512.png";
import logo from "../../assets/icon-left-font-monochrome-black.png";

import "./navbar.css"


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
    <div className="fixe nav">
      <div >
        <img src={logo} alt="logo" className="logo App-logo" />
      </div>
      <ul className="nav">
        <li className="">
          <Link className="" aria-current="page" to="/">Accueil</Link>
        </li>
        <li className="">
          <Link className="nav-link" ref={signup} to="/form">Inscription</Link>
        </li>
        {isLogged(logged) &&
          <li className="">
            <button onClick={logout} ref={deconnect}>Déconnexion</button>
          </li>
        }
      </ul>
    </div >
  )
}

export default Navbar; 