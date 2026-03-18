import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const Layout = ({children}) => {
  return (
    <div
      style={{
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        backgroundColor: '#0B0E1A',
      }}>
        <Navbar/>
        <main style={{ flex: 1}}>
          {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout;