import React, { useState } from 'react'
import { styled } from 'styled-components'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogin } from '../hooks/useLogin'

const Container = styled.div`
    height: 100%;
    width: 100%;
`
const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: max-content;
    align-items: center;
    border-radius: 10px;
    padding: 50px;
    height: 400px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.5);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.5); 
`
const Title = styled.h1``
const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
`
const Input = styled.input`
    background-color: lightgray;
`
const Button = styled.button`
    background-color: gray;
    border: none;
`
const Header = styled.div`
    position: relative;
    height: 18rem;
    width: 100%;
    background: no-repeat fixed left bottom;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    filter: brightness(0.5);
`
const PasswordToggler = styled.button`
    background-color: transparent !important;
    border: none !important;
    color: lightgray !important;
    cursor: pointer !important;
    padding: 0;
    display: flex;
    justify-content: left;
    text-align: left;
    left: 0;
`
const Login = ({images}) => {
    const { user } = useAuthContext()
    const { login, isLoading, error } = useLogin()

    const [ loginPasswordType, setLoginPasswordType ] = useState('password')

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLoginUser = async (e) => {
        e.preventDefault();
        await login(email, password)
    }

    const toggleLoginPassword = () => {
        const password = document.getElementById('login-user-password')
        const type = password.getAttribute("type");
        if (type === "password") {
            setLoginPasswordType('text')
        } else {
            setLoginPasswordType('password')
        }
    }

    return (
        <Container>
            <Header style={{backgroundImage:`url('${images["header.jpg"]}')`}}></Header>
            <Wrapper>
                <Title>
                    User Login
                </Title>
                <FormContainer>
                    <Input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email' />
                    <Input value={password} onChange={e => setPassword(e.target.value)} type={loginPasswordType} id='login-user-password' placeholder='Password' />
                    <PasswordToggler type='button' onClick={toggleLoginPassword}>
                        {
                            loginPasswordType === 'password' 
                            ? 'Show Password'
                            : 'Hide Password'
                        }
                    </PasswordToggler>
                    <Button onClick={handleLoginUser}>Submit</Button>
                    {
                        error && (
                            <div style={{color:'red'}}>
                                {error}
                            </div> 
                        )
                    }
                </FormContainer>
            </Wrapper>
        </Container>
    )
}

export default Login
