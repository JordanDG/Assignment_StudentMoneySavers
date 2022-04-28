import React, { useState } from 'react'
import styled from 'styled-components';
import BurgerNav from '../page-components/BurgerNav';
import LoggedOutHeader from '../headers/LoggedOutHeader';
import ReportProblem from '../page-components/ReportProblem';
import breakpoint from '../../devices/breakpoints';
// Import Thumbnails //
import Figma from '../../images/Figma.PNG';
import Survey from '../../images/Survey.PNG';
import Feedback from '../../images/Responses.PNG';

const AboutContainer = styled.div`
    @media ${breakpoint.device.sm} {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        min-height: 120vh;
    }    

    @media ${breakpoint.device.lg} {
        width: 100vw;
        min-height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        align-items: space-between;
    }
`;

const AboutHeader = styled.h1`
    font-size: 48px;
    font-weight: 500;
    word-spacing: 10px;
    letter-spacing: 2.5px;
    text-align: center;
    width: 100%;
`;

const AboutSplash = styled.p`
    @media ${breakpoint.device.sm} {
        width: 80%;
        font-size: 20px;
        text-align: center;
        margin-top: 50px;
    }

    @media ${breakpoint.device.lg} {
        width: 80%;
        font-size: 24px;
        font-weight: 300;
        margin-top: 30px;
        text-align: center;
        word-spacing: 5px;
        letter-spacing: 0.5px;
    }
`;

const AboutPlanningFeaturette = styled.div`
    @media ${breakpoint.device.sm} {
        width: 90vw;
        height: 200px;
        margin-top: 5vh;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
    }
    
    @media ${breakpoint.device.lg} {
        width: 50vw;
        height: 200px;
        margin-top: 5vh;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-around;
    }
`;

const AboutPlanningFeature = styled.div`
    height: 100%;
`;

const AboutPlanningImg = styled.img`
    width: 300px;
    height: 100%;
    border: 3px solid #0040E4;

    &:hover {
        cursor: pointer;
    }
`;

const AboutPlanningLink = styled.a`
    color: #333;
    font-size: 20px;
    text-align: center;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    border-bottom: 3px solid transparent;
    text-align: center;
    display: block;
    margin-top: 10px;
    transition: all 0.5s ease-in-out;

    &:hover {
        color: #000;
    }
`;

const AboutContainerLeft = styled.div`
    @media ${breakpoint.device.sm} {
        height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media ${breakpoint.device.lg} {
        width: 50vw;
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const AboutContainerRight = styled.div`
    @media ${breakpoint.device.sm} {
        height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    @media ${breakpoint.device.lg} {
        width: 50vw;
        height: 80vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;

const RightContentsMain = styled.iframe`
    @media ${breakpoint.device.sm} {
        width: 80vw;
        height: 40vh;
    }

    @media ${breakpoint.device.lg} {
        width: 70%;
        height: 60%;
    }
`;

const RightContentsHeader = styled.h1`
    font-size: 48px;
    font-weight: 500;
    word-spacing: 10px;
    letter-spacing: 2.5px;
    text-align: center;
    margin-top: -20px;
    margin-bottom: 20px;
`

export default function AboutPage() {
    const [display, setDisplay] = useState("Figma");
    let RightContents;
    let RightContentsTitle;

    if(display === "Figma") {
        RightContents =
        <RightContentsMain title="Figma Design" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FJwYPCEGrXGlciaSd1jjqGu%2FStudentMoneySavers%3Fnode-id%3D0%253A1" allowfullscreen></RightContentsMain>;
        RightContentsTitle =
        <RightContentsHeader>Figma Design:</RightContentsHeader>
    } else if(display === "Survey") {
        RightContents =
        <RightContentsMain title="Initial Survey" src="https://docs.google.com/forms/d/e/1FAIpQLSd9bYlMkCDuHOEzdufFvUA4pcZnRZ6W-_ZeFAy3bot6N9ti2g/viewform?embedded=true" width="640" height="4355" frameborder="0" marginheight="0" marginwidth="0">Loading…</RightContentsMain>
        RightContentsTitle =
        <RightContentsHeader>Initial Survey:</RightContentsHeader>
    }

    return (
        <>
            <BurgerNav />
            <LoggedOutHeader />
            <AboutContainer>
            <AboutContainerLeft>
                <AboutHeader>About StudentMoneySavers</AboutHeader>
                <AboutSplash>This website was created for the benefit of university students to effectively measure the correlation between financial stability and a students' academic capabilities. This was implemented to test the hypothesis that the utilization of an application such as this to track finances may improve student mental-wellbeing and financial stability, making students less likely to seek out full-time employment and more likely to focus on their studies to achieve their full academic potential. Click on the Figma design or Survey thumbnails to view an embed of them, or simply navigate to any of the below links through the titles.</AboutSplash>
                <AboutPlanningFeaturette>
                    <AboutPlanningFeature>
                        <AboutPlanningImg src={Figma} alt="Figma" onClick={() => setDisplay("Figma")}/>
                        <AboutPlanningLink href="https://www.figma.com/file/JwYPCEGrXGlciaSd1jjqGu/StudentMoneySavers?node-id=0%3A1">Figma Design</AboutPlanningLink>
                    </AboutPlanningFeature>
                    <AboutPlanningFeature>
                        <AboutPlanningImg src={Survey} alt="Survey" onClick={() => setDisplay("Survey")} />
                        <AboutPlanningLink href="https://forms.gle/tEk3EKS6fT2AxjC97">Initial Survey</AboutPlanningLink>
                    </AboutPlanningFeature>
                    <AboutPlanningFeature>
                        <a href="/contact">
                            <AboutPlanningImg src={Feedback} alt="Feedback" />
                        </a>
                        <AboutPlanningLink href="/contact">Site Feedback</AboutPlanningLink>
                    </AboutPlanningFeature>
                </AboutPlanningFeaturette>
            </AboutContainerLeft>
            <AboutContainerRight>
                { RightContentsTitle }
                { RightContents }
            </AboutContainerRight>
            </AboutContainer>
            <ReportProblem />
        </>
    )
}
