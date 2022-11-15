import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../../services/storage_service";

import logo from "../../assets/logo_groupomania_navbar.png";
import shut from "../../assets/button-icon-shut-cliparts.png"

import "./navbar.css"

/**
 * Barre de navigation :
 */
const Navbar = () => {

  const deconnect = useRef();
  const signup = useRef();

  const navigate = useNavigate();

  console.log(deconnect);

  const [logged, setLogged] = useState(false);
  const [userId, setUserId] = useState(tokenService.idCompare());
  const [data, setData] = useState([]);

  console.log(tokenService.idCompare())

  /**
   * Récupère un utilisateurs de la BDD
   */
  const fetchUser = async () => {
    try {
      const result = await axios.get(`${process.env.REACT_APP_URL_API}api/auth/${userId}`);
      // Le résultat est assigné à data du useState
      setData(result.data);
      console.log(result.data)
    }
    catch (error) {
      console.error(error);
    };
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(data.user_picture);

  /**
   * Connecte un utilisateur :
   * @param {boolean} logged 
   * @returns {boolean}
   */
  const isLogged = (logged) => {
    if (tokenService.isLogged()) {
      logged = true;
    } else {
      logged = false;
    }
    return logged;
  };

  /**
   * Déconnecte un utilisateur :
   */
  const logout = () => {
    tokenService.logOut();
    deconnect.current.classList.value = "disp_none";
    isLogged(logged);
    setLogged(false);
    setUserId(null);
    navigate("/form");
  };

  console.log("================= isLogged(logged)")
  console.log(isLogged(logged))


  return (
    <div className="fixe nav nav__pad nav__height">
      <div>
        <img src={logo} alt="logo" className="logo App-logo" />
      </div>
      <div className="nav">
        <ul className="nav nav_mob">
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
                <img id="user_avatar" src={data.user_picture} alt="avatar" />
              </Link>
            </div>
            <div className="nav__deconnect">
              <button onClick={logout} className="nav__deconnect">
                <img src={shut} alt="icone de déconnexion" />
              </button>
            </div>
          </div>
        }
      </div>
    </div >
  )
};

export default Navbar; 