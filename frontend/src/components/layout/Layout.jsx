import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import OfflineBanner from "../common/errorhandler/OfflineBanner";

const Layout = ({children}) => {
  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection: 'column',backgroundColor: '#0B0E1A',}}>
      <Navbar/>
      <main style={{ flex: 1, paddingTop:'64px'}}>
        {children}
      </main>
      <Footer />
      <OfflineBanner />
    </div>
  )
}

export default Layout;