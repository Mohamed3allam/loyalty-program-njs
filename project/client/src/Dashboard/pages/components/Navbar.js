import React from 'react'
import { styled } from 'styled-components'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
    width: 100%;
    padding: 20px;
    -webkit-box-shadow: 2px 4px 10px 1px gray;
    box-shadow: 2px 4px 10px 1px gray; 
    height: fit-content;
    z-index: 999;
`
const Wrapper = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
`
const LinksContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const NavLink = styled.button`
    background-color: gray;
    border: none;
    cursor: pointer;
    transition: 0.2s all ease !important;

    &:hover {
        box-shadow: 0px 0px 7px black;
        background-color: rgba(58, 58, 58, 1);
    }
`
const Logo = styled.img`
    filter: drop-shadow(0px 0px 4px darkorange);
`
const Header = styled.h1`
    font-weight: bold !important;
`
const Navbar = ({ images }) => {
    const { user } = useAuthContext()
    const { logout } = useLogout()


    const handleLogout = () => {
        logout()
    }

    return (
        <Container>
            <Wrapper>
                <LinksContainer>
                    <NavLink onClick={handleLogout}>
                        Logout
                    </NavLink>
                    
                </LinksContainer>
                <div>
                    <Header>
                        DASHBOARD
                    </Header>
                </div>
            </Wrapper>
        </Container>
    )
}

export default Navbar
