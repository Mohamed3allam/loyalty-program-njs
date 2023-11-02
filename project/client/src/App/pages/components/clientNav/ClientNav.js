import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useClientLogout } from '../../../hooks/useClientLogout';
import './clientNav.css'


const  ClientNav = ({ images }) => {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  const { logoutClient } = useClientLogout()

    return (
        <>
        <div style={{position:'fixed',zIndex:99,width:'100%',}}>

            <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
                <MDBContainer >
                    <MDBNavbarBrand href='#'>
                        <img src={images['logo.png']} className='img-fluid' width='150' />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNavColorThird(!showNavColorThird)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse show={showNavColorThird} navbar>
                        <MDBNavbarNav right fullWidth={false} className=' mb-2 mb-lg-0'>
                            <button className='btn btn-danger' onClick={logoutClient}>Logout</button>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>




            <MDBNavbar style={{
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
            }} expand='lg' light bgColor='light'>
                <MDBContainer style={{padding:'30px'}} >
                {/* <MDBNavbarBrand href='#'>Navbar</MDBNavbarBrand> */}
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNavColorSecond(!showNavColorSecond)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse navbar id='navbarColor02'>
                    <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0 gap-5 fs-50'>
                        <MDBNavbarItem className='active'>
                            <MDBNavbarLink className='nav-link navbar-links' aria-current='page' href='#'>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink className='nav-link navbar-links' href='vouchers'>Vouchers</MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink className='nav-link navbar-links' href='profile'>Profile</MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
            </div>
        
        </>
    );
}

export default ClientNav;