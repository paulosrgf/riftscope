import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import ChainDivider from "./ChainDivider";

function Navbar() {
  const location = useLocation();
  const isValorant = location.pathname.startsWith("/valorant");
  const isHome = location.pathname === "/" || location.pathname === "/valorant";

  return (
    <header className="rs-navbar">
      <div className="rs-navbar-left">
        <Link to="/" className="rs-navbar-logo">
          <span className="rs-navbar-mark" aria-hidden="true" />
          RiftScope
        </Link>
        <nav className="rs-navbar-links">
          <Link
            to="/"
            className={
              !isValorant
                ? "rs-navbar-link rs-navbar-link--active"
                : "rs-navbar-link"
            }
          >
            League
          </Link>
          <Link
            to="/valorant"
            className={
              isValorant
                ? "rs-navbar-link rs-navbar-link--active"
                : "rs-navbar-link"
            }
          >
            Valorant
          </Link>
          <a
            href="https://github.com/paulosrgf"
            target="_blank"
            rel="noreferrer"
            className="rs-navbar-link"
          >
            Sobre
          </a>
        </nav>
      </div>

      {!isHome && (
        <div className="rs-navbar-search">
          <SearchBar variant="compact" game={isValorant ? "valorant" : "lol"} />
        </div>
      )}

      <ChainDivider className="rs-navbar-chain" />
    </header>
  );
}

export default Navbar;
