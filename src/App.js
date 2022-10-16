import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';
const Home = React.lazy(() => import('./pages/Home'));
const Reservations = React.lazy(() => import('./pages/Reservations'));
const MyReservations = React.lazy(() => import('./pages/MyReservations'));

const TRACKING_ID = 'UA-213425407-1';
ReactGA.initialize(TRACKING_ID);

const App = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <div className="App">
            <div className="page-container">
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/rezervacijos"
                            element={
                                <PrivateRoute>
                                    <Reservations />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/mano-rezervacijos"
                            element={
                                <PrivateRoute>
                                    <MyReservations />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
