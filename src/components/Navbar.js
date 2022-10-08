import logo from "../assets/logo512.png";


const Navbar = () => {

  return (
    <div className="margin nav justify-content-between">
      <div >
        <img src={logo} alt="logo" className="logo" />
      </div>
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#home">Active</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#toto">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#tata">Link</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href='#tutu'>Disabled</a>
        </li>
      </ul>
    </div>
  )
}

export default Navbar;