import React from 'react'
import styled from 'styled-components';
import logoMain from '../../images/LogoMain.png';
import { Link } from 'react-router-dom';
import breakpoint from '../../devices/breakpoints';

const Logo = styled.img`
    width: 250px;
    margin-top: 20px;
    margin-bottom: 20px;

    &:hover {
        cursor: pointer;
    }
`;

const HeaderMainContainer = styled.div`

@media ${breakpoint.device.sm} {
    width: 80vw;
    height: 15vh;
    margin-left: 10vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

@media ${breakpoint.device.lg} {
    width: 90vw;
    margin-left: 5vw;
    height: 15vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}


`;

const FlexContainer = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const NavigationLinkUL = styled.ul`
    @media ${breakpoint.device.xs} {
        display: none;
    } 
    
    @media ${breakpoint.device.sm} {
        display: none;
    }    

    @media ${breakpoint.device.lg} {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: row;
    }
`;

const NavigationLinkLi = styled.li`
    display: inline-block;
    margin-left: 100px;
`;

const NavigationLinkText = styled(Link)`
    color: #333;
    font-size: 28px;
    text-decoration: none;
    border-bottom: 3px solid transparent;
    transition: all 0.5s ease-in-out;

    &:hover {
        border-bottom: 3px solid #0040E4;
    }
`;

export default function LoggedInHeader() {
    return (
    <>
        <HeaderMainContainer>
            <FlexContainer>
                <Logo src={logoMain} alt="SMS Logo"/>
                <NavigationLinkUL>
                    <NavigationLinkLi><NavigationLinkText to="/dashboard">Home</NavigationLinkText></NavigationLinkLi>
                    <NavigationLinkLi><NavigationLinkText to="/update-profile">Account</NavigationLinkText></NavigationLinkLi>
                    <NavigationLinkLi><NavigationLinkText to="/contact">Contact</NavigationLinkText></NavigationLinkLi>
                    <NavigationLinkLi><NavigationLinkText to="/faq">FAQ</NavigationLinkText></NavigationLinkLi>
                </NavigationLinkUL>
            </FlexContainer>
        </HeaderMainContainer>
    </>
  );
};
