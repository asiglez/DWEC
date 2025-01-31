import { Link } from "react-router-dom";
import "./AppMenu.css";

function AppMenu() {
  return (
    <nav className="navegacion">
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/mantenimiento">Mantenimiento</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AppMenu;
