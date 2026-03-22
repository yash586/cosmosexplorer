import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const handleNavClick = () => setMenuOpen(false);

   const navLinks = [
        { label: 'Home', path:'/'},
        { label: 'APOD', path: '/apod'},
        { label: 'Near Earth', path: '/near-earth'},
        { label: 'Discover', path: '/discover'},
        { label: 'Earth Events', path: '/earth-events'},
   ];
   return (
    <nav className={`cosmos-navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* logo */}
      <div
        className="cosmos-navbar_logo"
        onClick={() => { navigate('/'); handleNavClick(); }}
      >
        <span className='cosmos-navbar_star'>✦</span>
        <span className='cosmos-navbar_brand'>CosmosExplorer</span>
      </div>
      <div className='d-none d-md-flex align-items-center gap-2'>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `cosmos-navbar_link ${isActive ? 'cosmos-navbar_link-active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
      <button
        className="cosmos-navbar_hamburger d-flex d-md-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      {menuOpen && (
        <div className="cosmos-navbar_mobile">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `cosmos-navbar_mobile-link ${
                  isActive ? 'cosmos-navbar_mobile-link--active' : ''
                }`
              }
              onClick={handleNavClick}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
   )
}

export default Navbar;