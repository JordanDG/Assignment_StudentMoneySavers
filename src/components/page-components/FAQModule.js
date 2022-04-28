import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import breakpoint from '../../devices/breakpoints';

const FAQMainModule = styled.div`
    @media ${breakpoint.device.xs} {
        width: 60vw;
        height: 60px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: ${props => props.open === false ? "15px" : "0px"};
        border-bottom-left-radius: ${props => props.open === false ? "15px" : "0px"};
        box-shadow: ${props => props.open === false ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" : "rgba(0, 0, 0, 0.35) 0px 5px 15px;"};
        background-color: #fafafa; 
        line-height: 60px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        transition: all 0.5s ease-in-out;
    }


    @media ${breakpoint.device.sm} {
        width: 60vw;
        height: 60px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: ${props => props.open === false ? "15px" : "0px"};
        border-bottom-left-radius: ${props => props.open === false ? "15px" : "0px"};
        box-shadow: ${props => props.open === false ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" : "rgba(0, 0, 0, 0.35) 0px 5px 15px;"};
        background-color: #fafafa; 
        line-height: 60px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        transition: all 0.5s ease-in-out;
    }

    @media ${breakpoint.device.lg} {
        width: 600px;
        height: 60px;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: ${props => props.open === false ? "15px" : "0px"};
        border-bottom-left-radius: ${props => props.open === false ? "15px" : "0px"};
        box-shadow: ${props => props.open === false ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;" : "rgba(0, 0, 0, 0.35) 0px 5px 15px;"};
        background-color: #fafafa; 
        line-height: 60px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        transition: all 0.5s ease-in-out;
    }
`;

const FAQTitle = styled.h1`
    @media ${breakpoint.device.xs} {
        font-size: 20px;
        font-weight: 500;
        word-spacing: 8px;
        letter-spacing: 2px;
        text-align: left;
        width: 80%;
    }

    @media ${breakpoint.device.sm} {
        font-size: 20px;
        font-weight: 500;
        word-spacing: 8px;
        letter-spacing: 2px;
        text-align: left;
        width: 80%;
    }

    @media ${breakpoint.device.lg} {
        font-size: 28px;
        font-weight: 500;
        word-spacing: 8px;
        letter-spacing: 2px;
        text-align: left;
        width: 80%;
    }
`;

const FontAwesomeIconArrow = styled(FontAwesomeIcon)`
    margin-right: 10px;
    transform: ${props => props.open === false ? "rotate(0deg)" : "rotate(180deg)"};
    transition: all 0.5s ease-in-out;
`;

const FAQAnswer = styled.div`
    width: 600px;
    padding: 10px;
    position: relative;
    z-index: -1;
    background-color: #ededed;
    opacity: ${props => props.open === false ? "0" : "1"};
    transition: all 0.5s ease-in-out;
    height: ${props => props.open === false ? "0px" : "200px"};
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const ModuleContainer = styled.div`
    @media ${breakpoint.device.sm} {
        display: block;
        height: ${props => props.open === false ? "100px" : "260px"};
        margin-bottom: ${props => props.open === false ? "20px" : "50px"};
        transition: all 0.5s ease-in-out;
    }

    @media ${breakpoint.device.lg} {
        display: block;
        height: 260px;
        margin-bottom: 50px;
        transition: all 0.5s ease-in-out;
    }
`;

const FAQAnswerText = styled.p`
    font-size: 20px;
    font-weight: 500;
    padding-top: 10px;
    width: 100%;
    height: 95%;
`;

export default function FAQModule(props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <ModuleContainer open={open}>
            <FAQMainModule open={open} onClick={() => setOpen(!open)}>
                <FAQTitle>{props.title}</FAQTitle>
                <FontAwesomeIconArrow open={open} icon={faCaretDown} size="3x" color='#333' onClick={() => setOpen(!open)}/>
            </FAQMainModule>
            <FAQAnswer open={open}>
                <FAQAnswerText>{props.content}</FAQAnswerText>
            </FAQAnswer>
            </ModuleContainer>
        </>
    );
};
