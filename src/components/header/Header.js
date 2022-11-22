import Logo from "../../assets/logo/inStock-Logo_1x.png";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={Logo} alt="BrainFlix Logo" />
      </Link>
      <nav className="header__menu">
        <Link className="header__menu-link header__warehouses" to="/warehouses">
          Warehauses
        </Link>
        <Link className="header__menu-link header__inventory" to="/inventory">
          Inventory
        </Link>
      </nav>
    </header>
  );
}



export default Header;
