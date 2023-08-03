import { NavLink } from 'react-router-dom';
import '../components-css/Navbar.css';

function Navbar() {
    return (
      <div className="navbar">
        <h1>Pre Entrega 1</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <NavLink to={"/productos"}>
            <li>
              <a href="">Productos</a>
            </li>
          </NavLink>
          <NavLink to={"/cart"}>
            <li>
              <a href="">Carrito</a>
            </li>
          </NavLink>
        </ul>
      </div>
    );
  }
  
  export default Navbar;