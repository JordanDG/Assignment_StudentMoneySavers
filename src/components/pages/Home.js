import React from 'react';
import styled from 'styled-components';
import logo from '../../images/Logo.png';
import { Link } from 'react-router-dom';

// Import Elements //
import LoggedInHeader from '../headers/LoggedInHeader';
import BurgerNav from '../page-components/BurgerNav';
import breakpoint from '../../devices/breakpoints';
import ReportProblem from '../page-components/ReportProblem';

const HomeContainer = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
`;

const HomeMainContentContainer = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const HomeLogoMain = styled.img`
    width: 150px;
    margin-top: -10vh;
`;

const HomeTitleMain = styled.h1`
    font-size: 48px;
    font-weight: 500;
    word-spacing: 10px;
    text-align: center;
    width: 100%;
    letter-spacing: 2.5px;
`;

const Underline = styled.div`
    width: 225px;
    height: 5px;
    margin-top: 10px;
    background: linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
    border-radius: 15px;
`;

const HomeSplashMain = styled.p`
    @media ${breakpoint.device.xs} {
        width: 90%;
    }

    @media ${breakpoint.device.sm} {
        width: 60%;
    }

    @media ${breakpoint.device.lg} {
        width: 30%;
    }

    font-size: 24px;
    font-weight: 300;
    margin-top: 30px;
    text-align: center;
    word-spacing: 5px;
    letter-spacing: 0.5px;
`;

const HomeButtonContainer = styled.div`
    @media ${breakpoint.device.xs} {
        width: 90%;
    }

    @media ${breakpoint.device.sm} {
        width: 50%;
    }

    @media ${breakpoint.device.lg} {
        width: 20%;
    }

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
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

const HomeOr = styled.p`
    font-size: 24px;
    font-weight: 500;
    margin-top: 30px;
`;

const HomeOrLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    font-size: 24px;
`;

export default function Home() {
    return (
        <>
            <BurgerNav />
            <HomeContainer>
                <LoggedInHeader />
                <HomeMainContentContainer>
                    <HomeLogoMain src={logo} alt="Student Money Savers Logo" />
                    <HomeTitleMain>Student Money Savers</HomeTitleMain>
                    <Underline />
                    <HomeSplashMain>Our aim is to help you better keep track of your finances, so while at university you can focus on the things that truly matter... Your studies! Login or sign up to keep track of your finances and ensure you never need to worry about your money while being able to focus on your time at university.</HomeSplashMain>
                    <HomeButtonContainer>
                        <SignUpSubmit><HomeOrLink to="/login">Login</HomeOrLink></SignUpSubmit>
                        <HomeOr>OR</HomeOr>
                        <SignUpSubmit><HomeOrLink to="/signup">Signup</HomeOrLink></SignUpSubmit>
                    </HomeButtonContainer>
                </HomeMainContentContainer>
                <ReportProblem />
            </HomeContainer>
        </>
    );
};
