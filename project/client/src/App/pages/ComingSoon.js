import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
    height: 100%;
    width: 100%;
    position: relative;
`
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`
const Title = styled.h1`
    border-radius: 10px;
    padding: 20px;
    color: white;
    font-size: 50px;
    text-shadow: 0px 0px 10px black;
    backdrop-filter: blur(10px);
`
const ComingSoon = () => {
    return (
        <Container>
            <Wrapper>
                <Title>
                    Coming Soon...
                </Title>
            </Wrapper>
        </Container>
    )
}

export default ComingSoon
