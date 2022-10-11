import { Link } from "react-router-dom";
import logo from "../assets/logo512.png";


const Navbar = () => {

  return (
    <div className="margin nav justify-content-between">
      <div >
        <img src={logo} alt="logo" className="logo" />
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
      </ul>
    </div>
  )
}

export default Navbar;