import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    height: fit-content;
    padding: 2%;
    backdrop-filter: blur(20px);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
`
const Title = styled.h1``
const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const Button = styled.button`
    background-color: white;
    border: none;
    border-radius: 10px;
    color: gray;
`
const Home = ( {images} ) => {
  return (
    <Container>
        <Wrapper>
            <Title>
                What do you need ?
            </Title>
            <ButtonContainer>
                <a className='link' href='/online-shopping'>
                    <Button>
                        Online Shopping
                    </Button>
                </a>
                <a className='link' href='/profile'>
                    <Button>
                        Check Loyalty Points
                    </Button>
                </a>
            </ButtonContainer>
        </Wrapper>
    </Container>
  )
}

export default Home