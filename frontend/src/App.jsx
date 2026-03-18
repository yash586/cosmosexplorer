import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Apod from './pages/Apod';
import NearEarth from './pages/NearEarth';
import Discover from './pages/Discover';
import EarthEvents from './pages/EarthEvents';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/apod"         element={<Apod />} />
          <Route path="/near-earth"   element={<NearEarth />} />
          <Route path="/discover"     element={<Discover />} />
          <Route path="/earth-events" element={<EarthEvents />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;