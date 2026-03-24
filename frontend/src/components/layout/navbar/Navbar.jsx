import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ICONS } from '../../../constants/icons';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Home', path: '/'},
  { label: 'APOD', path: '/apod'},
  { label: 'Near Earth', path: '/near-earth' },
  { label: 'Discover', path: '/discover' },
  { label: 'Earth Events', path: '/earth-events' },
];

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

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>

      {/* Logo */}
      <div
        className={styles.logo}
        onClick={() => { navigate('/'); handleNavClick(); }}
      >
        <FontAwesomeIcon
          icon={ICONS.LOGO}
          className={styles.logoIcon}
        />
        <span className={styles.logoBrand}>CosmosExplorer</span>
      </div>

      {/* Desktop links */}
      <div className="d-none d-md-flex align-items-center gap-2">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Hamburger */}
      <button
        className={`${styles.hamburger} d-flex d-md-none`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
              }
              onClick={handleNavClick}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;