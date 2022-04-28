import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import breakpoint from '../../devices/breakpoints';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const BurgerBtn = styled.button`
    @media ${breakpoint.device.lg} {
        display: none;
    }

    width: 75px;
    display: block;
    height: 75px;
    position: absolute;
    z-index: 1000;
    top: 50px;
    right: 50px;
    border-radius: 15px;
    border: 3px solid #fff;
    outline: 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
    transition: all 0.5s ease-in-out;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
    }
`;

const HambugerMenu = styled.div`
    @media ${breakpoint.device.xs} and (max-width: 501px) {
        width: 40vw;
    }

    @media ${breakpoint.device.lg} {
        display: none;
        width: 30vw;
    }
    
    width: 30vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
    position: absolute;
    z-index: 100;
    top: 0;
    right: 0;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background: linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
`;

const HamburgerMask = styled.div`
    @media ${breakpoint.device.lg} {
        display: none;
    }
    
    width: 70vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.75);
    z-index: 50;
`;

const HamBurgerNavigationLinks = styled.h2`
    @media ${breakpoint.device.lg} {
        display: none;
    }

    margin-right: 50px;
    margin-bottom: 20px;

    &:first-of-type {
        margin-top: 180px;
    } 
`;

const NavigationLinkText = styled(Link)`
    font-size: 30px;
    font-weight: 500;
    color: #fafafa;
    transition: all 0.5s ease-in-out;
    border-bottom: 3px solid transparent;  
    text-decoration: none;

    &:hover {
        color: #fff;
        cursor: pointer;
        border-bottom: 3px solid #fff;
    }
`;

export default function BurgerNav() {
    const [showMenu, setShowMenu] = useState(false);

    let menu;
    let menuMask;

    if(showMenu) {
        menu = 
        <HambugerMenu>
            <HamBurgerNavigationLinks><NavigationLinkText to="/home">Home</NavigationLinkText></HamBurgerNavigationLinks>
            <HamBurgerNavigationLinks><NavigationLinkText to="/about">About</NavigationLinkText></HamBurgerNavigationLinks>
            <HamBurgerNavigationLinks><NavigationLinkText to="/contact">Contact</NavigationLinkText></HamBurgerNavigationLinks>
        </HambugerMenu>
        menuMask = <HamburgerMask onClick={() => setShowMenu(false)}></HamburgerMask>
    }

    return (
        <>
            <nav>
                <BurgerBtn onClick={() => setShowMenu(!showMenu)}>
                    <FontAwesomeIcon icon={showMenu ? faXmark : faBars} size="4x" color='#ffffff'/>
                </BurgerBtn>
                { menuMask }
                { menu }
            </nav>
        </>
    );
};
