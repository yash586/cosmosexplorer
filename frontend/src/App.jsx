import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import './styles/index.css';


const Home = lazy(() => import('./pages/Home'));
const Apod = lazy(() => import('./pages/Apod'));
const NearEarth = lazy(() => import('./pages/NearEarth'));
const Discover = lazy(() => import('./pages/Discover'));
const EarthEvents = lazy(() => import('./pages/EarthEvents'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apod" element={<Apod />} />
              <Route path="/near-earth" element={<NearEarth />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/earth-events" element={<EarthEvents />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;