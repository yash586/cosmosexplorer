import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICONS } from '../../../constants/icons';
import styles from './Footer.module.css';

/**
 * Footer component
 * Displays branding, NASA API credit and author info
 * @returns {JSX.Element} Site footer
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`d-flex justify-content-center align-items-center gap-2 ${styles.brand}`}>
        <FontAwesomeIcon
          icon={ICONS.LOGO}
          className={styles.brandIcon}
        />
        <span className={styles.brandName}>CosmosExplorer</span>
      </div>
      <p className={styles.text}>
        Powered by
        <a
          href="https://api.nasa.gov"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
        {' '}NASA Open APIs
        </a>
        {' '}Built by Yash Kalan{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;