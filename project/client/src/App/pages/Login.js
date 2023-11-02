import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../hooks/useAuthContext'
import { useClientAuthContext } from '../hooks/useClientAuthContext'
import { useLogin } from '../hooks/useLogin'
import { useClientLogin } from '../hooks/useClientLogin'
import { Link } from 'react-router-dom'
import './login.css'
import { mobile } from '../../responsive'
import { useClientSignup } from '../hooks/useClientSignup'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    background-image: linear-gradient(to top right, #707070, #363636);
    overflow-x: hidden;
    ${mobile({
        flexDirection:'column-reverse',
    })}
`
const Wrapper = styled.div`
    flex: 3;
    position: relative;
`
const Header = styled.div`
    height: 100vh;
    width: 100%;
    background: no-repeat fixed center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    filter: blur(5px);
`
const ContainerDiv = styled.div`
    position: absolute !important;
    top: 50% !important	;
    left: 50% !important	;
    transform: translate(-50%, -50%) !important	;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Logo = styled.img`
    width: 200px;
    filter: drop-shadow(0 14px 28px white);
`
const FormContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(54, 54, 54, 1);
    font-weight: bold;
    height: min-content;
    padding: 8%;
    border-radius: 10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 50%;
    /* height: 50%; */
    overflow: hidden;
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
const LoginDiv = styled.div``
const SignupDiv = styled.div``
const OverlayDiv = styled.div``



const Login = ( {images} ) => {

    const { user } = useAuthContext()
    const { client_user } = useClientAuthContext()
    const { login } = useLogin()
    const { loginClient, errorLogin, loginLoading } = useClientLogin()
    const { signupClient, errorSignup, signupLoading } = useClientSignup()

    const [ phoneLogin, setPhoneLogin ] = useState('')
    const [ passwordLogin, setPasswordLogin ] = useState('')

    const [ nameSignup, setNameSignup ] = useState('')
    const [ phoneSignup, setPhoneSignup ] = useState('')
    const [ passwordSignup, setPasswordSignup ] = useState('')

    const [ signupPasswordType, setSignupPasswordType ] = useState('password')
    const [ loginPasswordType, setLoginPasswordType ] = useState('password')

    const [ devicePhone, setDevicePhone ] = useState(false)
        
    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        await loginClient(phoneLogin, passwordLogin)
    }
    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        await signupClient(nameSignup, phoneSignup, passwordSignup)
    }

    

    const signupShow = () => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    const signInShow = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
    }

    const toggleSignupPassword = () => {
        const password = document.getElementById('signup-password')
        const type = password.getAttribute("type");
        if (type === "password") {
            setSignupPasswordType('text')
        } else {
            setSignupPasswordType('password')
        }
    }
    const toggleLoginPassword = () => {
        const password = document.getElementById('login-password')
        const type = password.getAttribute("type");
        if (type === "password") {
            setLoginPasswordType('text')
        } else {
            setLoginPasswordType('password')
        }
    }
    useEffect(() => {
        if (window.innerWidth < 768) {
            setDevicePhone(true)
        }
    }, [window.innerWidth])


    const toggleLoginSignup = () => {
        const wrapper = document.querySelector(".wrapper")
        if (wrapper.classList.contains('active')) {
            wrapper.classList.remove("active");
        } else {
            wrapper.classList.add("active");
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Header style={{backgroundImage:`url('${images["background.jpg"]}')`}}></Header>
                    <ContainerDiv>

                        <Logo src={images['logo.png']} className='img-fluid' />
                        {/* <div className="container animate__animated animate__fadeInUp" id="container">
                            <SignupDiv className="form-container sign-up-container">
                                <form autoComplete='off' onSubmit={handleSignupSubmit}>
                                    <h1>Create Account</h1>
                                    <div className="social-container"></div>
                                    <input value={nameSignup} onChange={e=>setNameSignup(e.target.value)} type="text" placeholder="Name" maxLength='30'/>
                                    <input value={phoneSignup} onChange={e=>setPhoneSignup(e.target.value)} type="tel" placeholder="Phone Number" maxLength='12' autoComplete='false' />
                                    <input id='signup-password' value={passwordSignup} onChange={e=>setPasswordSignup(e.target.value)} type={signupPasswordType} placeholder="Password" />
                                    <PasswordToggler type='button' onClick={toggleSignupPassword}>
                                        {
                                            signupPasswordType === 'password' 
                                            ? 'Show Password'
                                            : 'Hide Password'
                                        }
                                    </PasswordToggler>
                                    <button>Sign Up</button>
                                    {errorSignup && ( 
                                        <div style={{color:'red'}}>
                                            {errorSignup}
                                        </div> 
                                    )}
                                </form>
                            </SignupDiv>

                            <LoginDiv className="form-container sign-in-container">
                                <form>
                                    <h1>Sign in</h1>
                                    <div className="social-container"></div>
                                    <input value={phoneLogin} onChange={e=>setPhoneLogin(e.target.value)} type="tel" placeholder="Phone Number" maxLength='12' />
                                    <input id='login-password'  value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)} type={loginPasswordType} placeholder="Password" />
                                    <a href="#">Forgot your password?</a>
                                    <PasswordToggler type='button' onClick={toggleLoginPassword}>
                                        {
                                            loginPasswordType === 'password' 
                                            ? 'Show Password'
                                            : 'Hide Password'
                                        }
                                    </PasswordToggler>
                                    <button onClick={handleLoginSubmit} disabled={loginLoading}>Login</button>
                                    {errorLogin && ( 
                                        <div style={{color:'red'}}>
                                            {errorLogin}
                                        </div> 
                                    )}
                                </form>
                            </LoginDiv>

                            <OverlayDiv className="overlay-container">
                                <div className="overlay">
                                    <div className="overlay-panel overlay-left">
                                        <h1>Welcome Back!</h1>
                                        <p>To keep connected with us please login with your personal info</p>
                                        <button onClick={signInShow} className="ghost" id="signIn">Log In</button>
                                    </div>
                                    <div className="overlay-panel overlay-right">
                                        <h1>Hello, Friend!</h1>
                                        <p>Enter your personal details and start journey with us</p>
                                        <button onClick={signupShow} className="ghost" id="signUp">Sign Up</button>
                                    </div>
                                </div>
                            </OverlayDiv>
                        </div> */}

                        <section className="wrapper">
                            <div className="form signup">
                                <header onClick={toggleLoginSignup}>Signup</header>
                                <form>
                                    <input value={nameSignup} onChange={e=>setNameSignup(e.target.value)} type="text" placeholder="Full name" required />
                                    <input value={phoneSignup} onChange={e=>setPhoneSignup(e.target.value)} type="tel" placeholder="Phone Number" required />
                                    <input id='signup-password' value={passwordSignup} onChange={e=>setPasswordSignup(e.target.value)} type="password" placeholder="Password" required />
                                    {/* <div className="checkbox">
                                        <input type="checkbox" id="signupCheck" />
                                        <label for="signupCheck">I accept all terms & conditions</label>
                                    </div> */}
                                    <input onClick={handleSignupSubmit} disabled={signupLoading} type="submit" value="Signup" />
                                    {errorSignup && ( 
                                        <div style={{color:'red'}}>
                                            {errorSignup}
                                        </div> 
                                    )}
                                </form>
                            </div>
                            <div className="form login">
                                <header onClick={toggleLoginSignup}>Login</header>
                                <form>
                                    <input value={phoneLogin} onChange={e=>setPhoneLogin(e.target.value)} type="tel" placeholder="Phone Number" required />
                                    <input id='login-password'  value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)} type="password" placeholder="Password" required />
                                    {/* <a href="#">Forgot password?</a> */}
                                    <input onClick={handleLoginSubmit} disabled={loginLoading} type="submit" value="Login" />
                                    {errorLogin && ( 
                                        <div style={{color:'red'}}>
                                            {errorLogin}
                                        </div> 
                                    )}
                                </form>
                            </div>
                            {/* <script>
                                
                            </script> */}
                            </section>
                    </ContainerDiv>
                </Wrapper>
                
            </Container>
        </>
    )
}

export default Login