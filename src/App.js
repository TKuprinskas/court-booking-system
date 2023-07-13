import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
import PrivatumoPolitika from './components/PrivatumoPolitika';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
const Home = React.lazy(() => import('./pages/Home'));
const Reservations = React.lazy(() => import('./pages/Reservations'));
const MyReservations = React.lazy(() => import('./pages/MyReservations'));
const Rules = React.lazy(() => import('./pages/Rules'));
const News = React.lazy(() => import('./pages/News'));
const Gallery = React.lazy(() => import('./pages/Gallery'));
const TourRegister = React.lazy(() => import('./pages/TourRegister'));

const TRACKING_ID = 'UA-213425407-1';
ReactGA.initialize(TRACKING_ID);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className='App'>
      <div className='page-container'>
        <div className='content-wrapper'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/rezervacijos'
              element={
                <PrivateRoute>
                  <Reservations />
                </PrivateRoute>
              }
            />
            <Route
              path='/mano-rezervacijos'
              element={
                <PrivateRoute>
                  <MyReservations />
                </PrivateRoute>
              }
            />
            <Route
              path='/turnyro-registracija'
              element={
                <PrivateRoute>
                  <TourRegister />
                </PrivateRoute>
              }
            />
            <Route path='/taisykles' element={<Rules />} />
            <Route path='/naujienos' element={<News />} />
            <Route path='/galerija' element={<Gallery />} />
            <Route path='/privacy-policy' element={<PrivatumoPolitika />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
