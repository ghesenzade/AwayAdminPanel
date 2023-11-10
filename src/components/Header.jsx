import { Link } from "react-router-dom";
import awayLogo from "../assets/images/Away_Logo.jpg";

export const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="logo">
            <Link to="/" className="awayLogo">
              <img src={awayLogo} alt="awayLogo" />
            </Link>
          </div>
          <div className="link">
            <Link to="/create" className="createLink">
              Create
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
