import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { tokenService } from "../services/service";
import logo from "../assets/logo512.png";


const Navbar = () => {

  const navigate = useNavigate();

  const isLogged = () => {
    if (tokenService.isLogged) {
      console.log(tokenService.isLogged)
      return true
    } else {
      console.log(tokenService.isLogged)
      return false

    }
  }

  const logout = () => {
    tokenService.logOut();
    navigate('/');
  }



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
          <Link className="nav-link" to="/form">Inscription</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/tata">Link</Link>
        </li>
        {isLogged && <Button onClick={logout}>Déconnexion</Button>}
      </ul>

    </div>
  )
}

export default Navbar;