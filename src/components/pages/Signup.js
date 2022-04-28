import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logoMain from '../../images/LogoMain.png';
import { useAuth } from '../../contexts/AuthContext';

const MainContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 800px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    background-color: rgba(250, 250, 250, 0.85);
`;

const Signupheader = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Logo = styled.img`
    width: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const HeaderText = styled.h1`
    font-size: 28px;
    word-spacing: 5px;
    text-align: center;
    font-weight: 700;
    margin-bottom: -10px;
`;

const HeaderSplashText = styled.p`
    font-size: 20px;
    font-weight: 400;
    text-align: center;
    word-spacing: 2px;
    letter-spacing: 0.25px;
    width: 80%;
    margin-top: 20px;
`;

const Signupmain = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
`;

const SignupmainTitle = styled.h1`
    font-size: 28px;
    word-spacing: 5px;
    width: 100%;
    text-align: center;
`;

const SignupmainForm = styled.form`
    width: 100%;
    height: 430px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -15px;
    justify-content: flex-start;
`;

const SignupInputIdentifiers = styled.p`
    font-size: 21px;
    width: 310px;
    margin-bottom: 5px;

    &:not(:first-of-type) {
        margin-top: 10px;
    }
`;

const SignupmainInput = styled.input`
    width: 300px;
    height: 50px;
    outline: 0;
    border: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 28px;
    border-bottom: 5px solid #0040E4;
    padding-left: 10px;
    transition: all 0.5s ease-in-out;
    background-color: #c9c9c9;

    &::placeholder {
        color: #333;
        opacity: 0.65;
    }

    &:first-of-type {
        margin-bottom: 20px; 
    }

    &:hover {
        background-color: #cecece;
    }

    &:focus {
        background-color: #d9d9d9;
    }
`;

const SignUpSubmit = styled.button`
    margin-top: 30px;
    width: 200px;
    font-size: 24px;
    border-radius: 10px;
    border: 0;
    transition: all 0.5s ease-in-out;
    height: 50px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
    color: #fff;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
    }
`;

const ErrorAlert = styled.p`
    color: red;
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin-top: -10px;
`;

const SignupLoginRedirect = styled.p`
    color: #333;
    font-size: 18px;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
`;

const GoBackHome = styled(Link)`
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
    color: #333;
    text-decoration: none;
    font-size: 24px;
`;

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match - please try again!');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/dashboard');
        } catch {
            setError('Failed to create an account - Please try again!');
        }
        setLoading(false);
    }

  return (
    <>
        <MainContainer>
            <Signupheader>
                <Logo src={logoMain} alt="SMS Logo" />
                <HeaderText>Welcome to StudentMoneySavers</HeaderText>
                <HeaderSplashText>Helping you keep track of your finances, so you can focus on what matters.</HeaderSplashText>
            </Signupheader>
            <Signupmain>
                <SignupmainTitle>Sign-up:</SignupmainTitle>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                <SignupmainForm onSubmit={handleSubmit}>
                    <SignupInputIdentifiers>Email:</SignupInputIdentifiers>
                    <SignupmainInput type="email" required ref={emailRef} placeholder="Email Address" />
                    <SignupInputIdentifiers>Password:</SignupInputIdentifiers>
                    <SignupmainInput type="password" required ref={passwordRef} placeholder="Password" />
                    <SignupInputIdentifiers>Confirm Password:</SignupInputIdentifiers>
                    <SignupmainInput type="password" required ref={passwordConfirmRef} placeholder="Confirm Password" />
                    <SignUpSubmit type="submit" disabled={loading}>Sign Up</SignUpSubmit>
                </SignupmainForm>
                <GoBackHome to="/">Go Back</GoBackHome>
                <SignupLoginRedirect>Already have an account? <Link to="/login">Login</Link></SignupLoginRedirect>
            </Signupmain>
        </MainContainer>
    </>
  );
};