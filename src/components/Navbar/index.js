import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../services/service";
import profile from "../../assets/un-jeune-homme.png";

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
    <div className="fixe nav nav__pad">
      <div>
        <img src={logo} alt="logo" className="logo App-logo" />
      </div>
      <div className="nav">
        <ul className="nav">
          <li className="">
            <Link className="" aria-current="page" to="/">Accueil</Link>
          </li>
          <li className="nav">
            <Link className="nav-link" ref={signup} to="/form">Inscription</Link>
          </li>
        </ul>
        {isLogged(logged) &&
          <div className="connect" ref={deconnect}>
            <div className='nav__avatar'>
              <Link to={"/form/profil"}>
                <img src={profile} alt="avatar" />
              </Link>
            </div>
            <div className="">
              <button onClick={logout} >Déconnexion</button>
            </div>
          </div>
        }
      </div>
    </div >
  )
}

export default Navbar; 