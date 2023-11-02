import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from "react";
import { styled } from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateOrder from './pages/Home';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    transition: 0s !important;
`
const DashboardApp = ({ images }) => {
  const { user } = useAuthContext()


  return (
    <>
      <Container>
        <Routes>
          <Route index element={user ? <Home images={images} /> : <Navigate to='/dashboard/login' /> } />
          <Route path='login' element={!user ? <Login images={images} /> : <Navigate to='/dashboard' /> } />
          
          {/* <Route path='/online-shopping' element={client_user ? <ComingSoon images={images} /> : <Navigate to='/login' /> } /> */}
          {/* <Route path='/profile' element={client_user ? <Profile images={images} /> : <Navigate to='/login' /> } /> */}
        </Routes>
      </Container>
    </>
  );
}

export default DashboardApp;
