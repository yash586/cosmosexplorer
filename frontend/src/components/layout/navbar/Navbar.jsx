import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const navigate = useNavigate();

   useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   const navLinks = [
        { label: 'APOD', path: '/apod'},
        { label: 'Near Earth', path: '/near-earth'},
        { label: 'Discover', path: '/discover'},
        { label: 'Earth Events', path: '/earth-events'},
   ];

   return (
    <nav className={`cosmos-navbar ${scrolled} ? 'scrolled' : '' `}>
      {/* logo */}
      <div className='cosmos-navbar_logo' onClick={() => navigate("/")}>
        <span className='cosmos-navbar_star'>✦</span>
        <span className='cosmos-navbar_brand'>CosmosExplorer</span>
      </div>
      <div className='d-flex align-items-center gap-2'>
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
    </nav>
   )
}

export default Navbar;