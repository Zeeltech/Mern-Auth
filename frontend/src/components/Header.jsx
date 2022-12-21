import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"; //slash fa is for font-awsome library only
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>{" "}
        {/*Em kye chhe ke Goalsetter ne link aapo / ni */}
      </div>
      {/* In index.css header class ma justify content space-between chhe etle bey left and right khune rhe chhe GoalSetter and Login,Register(UL) */}
      <ul>
        <li>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
