import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="rs-navbar">
      <Link to="/" className="rs-navbar-logo">RiftScope</Link>
      {!isHome && (
        <div className="rs-navbar-search">
          <SearchBar variant="compact" />
        </div>
      )}
    </header>
  );
}

export default Navbar;