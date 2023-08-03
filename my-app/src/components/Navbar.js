import '../components-css/Navbar.css';

function Navbar() {
    return (
      <div className="navbar">
        <h1>Pre Entrega 1</h1>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/productos">Productos</a>
          </li>
          <li>
            <a href="/carrito">Carrito</a>
          </li>
        </ul>
      </div>
    );
  }
  
  export default Navbar;