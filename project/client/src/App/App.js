import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from "react";
import { styled } from 'styled-components';
// import Login from './pages/Login';
// import Home from './pages/Home';
import { useClientAuthContext } from './hooks/useClientAuthContext';
// import Profile1 from './pages/profile/Profile1';
import ClientNav from './pages/components/clientNav/ClientNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// import VoucherGenerator from './pages/vouchers/VoucherGenerator';
import Loading from './pages/components/loading/Loading';

const Profile1 = lazy(() => import("./pages/profile/Profile1"));
const Login = lazy(() => import("./pages/Login"));
// const ClientNav = lazy(() => import("./pages/components/clientNav/ClientNav"));
const VoucherGenerator = lazy(() => import("./pages/vouchers/VoucherGenerator"));

const Container = styled.div`
    height: 100%;
    width: 100vw;
    transition: 0.3s !important;
    overflow-x: hidden;
`
const Header = styled.div`
    height: 100%;
    width: 100%;
    background: no-repeat fixed center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
`
function App({ images }) {
  const { client_user } = useClientAuthContext()
  return (
    <>
    <Suspense fallback={<Loading />}>
      <Container>
          {
            client_user && (
              <>
              <ClientNav images={images}/>
                    <Header style={{backgroundImage:`url('${images["background.jpg"]}')`,overflow:'hidden'}}></Header>

              <div style={{backdropFilter:'brightness(0.2)', height:'100%',overflow:'hidden'}}>
              <Routes>
                <Route exact path='profile' element={<Profile1 images={images} />} />
                <Route exact path='vouchers' element={<VoucherGenerator images={images} />} />
                <Route path="*" element={<Navigate to="/profile" />}/>
              </Routes>
              </div>
              </>
            )
          }
          {
            !client_user && (
              <>
              <Routes>
                <Route path='login-or-signup' element={!client_user ? <Login images={images} /> : <Navigate to='/' /> } />
                <Route path="*" element={<Navigate to="/login-or-signup" />}/>
              </Routes>
              </>
            )
          }
          {/* <Route index element={client_user ? <Home images={images} /> : <Navigate to='/login-or-signup' /> } />
          <Route path='online-shopping' element={client_user ? <ComingSoon images={images} /> : <Navigate to='/login-or-signup' /> } />
          <Route path='profile' element={client_user ? <Profile images={images} /> : <Navigate to='/login-or-signup' /> } /> */}
      </Container>
    </Suspense>
    </>
  );
}

export default App;
