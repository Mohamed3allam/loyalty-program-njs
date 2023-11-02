import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from "react";
import { styled } from 'styled-components';
import { useAuthContext } from './hooks/useAuthContext';
import Home from '../App/pages/Home';
import Login from './pages/Login';
import CreateOrder from './pages/CreateOrder';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    transition: 0s !important;
`
const OrderPanel = ({ images }) => {
  const { user } = useAuthContext()


  return (
    <>
      <Container>
        <Routes>
          <Route index element={user ? <Navigate to='/order-panel/create-order' /> : <Navigate to='/order-panel/login' /> } />
          <Route path='create-order' element={user ? <CreateOrder images={images} /> : <Navigate to='/order-panel/login' /> } />
          <Route path='login' element={!user ? <Login images={images} /> : <Navigate to='/order-panel/create-order' /> } />
          
          {/* <Route path='/online-shopping' element={client_user ? <ComingSoon images={images} /> : <Navigate to='/login' /> } /> */}
          {/* <Route path='/profile' element={client_user ? <Profile images={images} /> : <Navigate to='/login' /> } /> */}
        </Routes>
      </Container>
    </>
  );
}

export default OrderPanel;
