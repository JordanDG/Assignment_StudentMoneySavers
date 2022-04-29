import React from 'react'
import styled from 'styled-components';
import breakpoint from '../../devices/breakpoints';
import BurgerNav from '../page-components/BurgerNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { keyframes } from 'styled-components';
import ContactForm from '../page-components/ContactForm';
// Headers for conditional rendering //
import LoggedInHeader from '../headers/LoggedInHeader';

const MainContainer = styled.div`  
    @media ${breakpoint.device.sm} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }    

    @media ${breakpoint.device.lg} {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
    }
`;

const ProblemTitle = styled.h1`
    font-size: 48px;
    font-weight: 500;
    word-spacing: 10px;
    letter-spacing: 2.5px;
`;

const ProblemText = styled.p`
    font-size: 24px;
    font-weight: 300;
    margin-top: 30px;
    width: 80%;
    text-align: center;
    word-spacing: 5px;
    letter-spacing: 0.5px;
`;

const ProblemThanks = styled.h1`
    font-size: 20px;
    margin-top: 20px;
    font-weight: 500;
    word-spacing: 10px;
    letter-spacing: 1.5px;
`;

const ProblemLeftContainer = styled.div`
    height: 80vh;
    min-width: 48vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProblemRightContainer = styled.div`
    height: 80vh;
    min-width: 48vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const hover = keyframes`
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
`;

const ProblemArrow = styled.div`
    @media ${breakpoint.device.lg} {
        display: none;
    }

    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    top: 30%;
    animation: ${hover} 2s linear infinite;
`;

const ProblemArrowH1 = styled.h1`
    font-size: 24px;
    font-weight: 500;
    background: -webkit-linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: -10px;
`;

export default function ContactPage() {
    return (
        <>  
            <BurgerNav />
            <LoggedInHeader />
            <MainContainer>
                <ProblemLeftContainer>
                    <ProblemTitle>Contact Us</ProblemTitle>
                    <ProblemText>Feedback, good or bad... We always welcome it! Submit your praises (or your complaints, we don't judge) in the form on this page. We'll do our best to respond within 3 days!</ProblemText>
                    <ProblemThanks>- The StudentMoneySavers Team</ProblemThanks>
                    <ProblemArrow>
                        <ProblemArrowH1>Scroll to contact us!</ProblemArrowH1>
                        <FontAwesomeIcon icon={faCaretDown} size="3x" color='#333'/>
                    </ProblemArrow>
                </ProblemLeftContainer>
                <ProblemRightContainer>
                    <ContactForm />
                </ProblemRightContainer>
            </MainContainer>
        </>
    );
};
