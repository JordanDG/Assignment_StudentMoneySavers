import React from 'react';
import styled from 'styled-components';
import BurgerNav from '../page-components/BurgerNav';
import ReportProblem from '../page-components/ReportProblem';
import { Link } from 'react-router-dom';
import LoggedInHeader from '../headers/LoggedInHeader';
// Import Image //
import Error404Image from '../../images/Error404Image.png';

const Error404Container = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Error404Header = styled.img`
    width: 400px;
`;

const Error404Splash = styled.p`
    font-size: 32px;
    font-weight: 500;
    color: #333;
`;

const Error404Button = styled.button`
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

const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
`;

export default function Error404() {
    return (
        <>
            <BurgerNav />
            <LoggedInHeader />
                <Error404Container>
                    <Error404Header src={Error404Image} alt="Error 404: Page not found!" />
                    <Error404Splash>Error 404: Page not found. Please go back to safety!</Error404Splash>
                    <Error404Button ><StyledLink to="/">Return Home</StyledLink></Error404Button>
                </Error404Container>
            <ReportProblem />
        </>   
    );
};
