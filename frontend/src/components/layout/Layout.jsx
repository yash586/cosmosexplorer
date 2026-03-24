import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import OfflineBanner from "../common/errorhandler/OfflineBanner";
import styles from './Layout.module.css';

/**
 * Layout component wraps all pages
 * Provides consistent Navbar, Footer and OfflineBanner
 * @param {React.ReactNode} children Page content
 * @returns {JSX.Element} Full page layout
 */
const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <OfflineBanner />
    </div>
  );
};

export default Layout;