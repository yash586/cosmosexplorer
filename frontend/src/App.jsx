import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/errorhandler/ErrorBoundary';
import LoadingSpinner from './components/common/spinner/LoadingSpinner';
import NotFound from './components/common/errorhandler/NotFound';

const Home = lazy(() => import('./pages/Home'));
const Apod = lazy(() => import('./pages/apod/Apod'));
const NearEarth = lazy(() => import('./pages/nearEarth/NearEarth'));
const Discover = lazy(() => import('./pages/discover/Discover'));
const EarthEvents = lazy(() => import('./pages/earthEvents/EarthEvents'));

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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;