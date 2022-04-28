import React from 'react'
import styled from 'styled-components';
import BurgerNav from '../page-components/BurgerNav';
import ReportProblem from '../page-components/ReportProblem';
import breakpoint from '../../devices/breakpoints';
import FAQModule from '../page-components/FAQModule';
import { Link } from 'react-router-dom';
// Headers for conditional rendering //
import LoggedOutHeader from '../headers/LoggedOutHeader';
import LoggedInHeader from '../headers/LoggedInHeader';
import { useAuth } from '../../contexts/AuthContext';

const FAQMainContainer = styled.div`
@media ${breakpoint.device.xs} {
    min-height: 80vh;
    width: 95vw;
    margin-left: 2.5vw;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

@media ${breakpoint.device.sm} {
    min-height: 80vh;
    overflow: auto;
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    margin-left: 0vw;
}

@media ${breakpoint.device.lg} {
    min-height: 80vh;
    overflow: auto;
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
    margin-left: 0vw;
}
`;

const FAQTitle = styled.h1`
    font-size: 32px;
    font-weight: 500;
    word-spacing: 10px;
    margin-bottom: 20px;
    letter-spacing: 2.5px;
    text-align: left;
    width: 100%;
    text-align: center;
`;

const FAQModuleOrganiser = styled.div`
@media ${breakpoint.device.xs} {
    width: 100px;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

@media ${breakpoint.device.sm} {
    width: 90%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}

@media ${breakpoint.device.lg} {
    width: 60%;
    height: 70%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
}
`;

const ContactUsBanner = styled.div`
    margin-top: -2vh;
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ContactUsLink = styled(Link)`
    color: #333;
    text-decoration: none;
    font-size: 24px;
    transition: all 0.5s ease-in-out;
    border-bottom: 3px solid transparent;

    &:hover {
        border-bottom: 3px solid #0040E4;
    }
`;

export default function FAQ() {
    const { currentUser } = useAuth();
    let status = false;

    if (currentUser === null) {
        status = false;
    } else {
        status = true;
    }

    return (
        <>
            <BurgerNav />
            { status ? <LoggedInHeader /> : <LoggedOutHeader/> }
            <FAQMainContainer>
                <FAQTitle>Frequently Asked Questions</FAQTitle>
                <FAQModuleOrganiser>
                    <FAQModule title="Q: How Does This Work?" content="A: Its simple! Simply sign up (or log in), and begin tracking your finances. You'll also recieve super useful tips to help you stay happy and healthy, all so you can focus on your studies!" />
                    <FAQModule title="Q: Is it free to use?" content="Yes, and always will be. (The idea of an application designed to help students save money, costing money, seemed a little obsolete.)" />
                    <FAQModule title="Q: Is this app for all students?" content="For the purposes of the overarching research study, this application is exclusively for use by existing Southampton students at a university level. In the future, this may change, however, so keep an eye out!" />
                    <FAQModule title="Q: What will this achieve?" content="As much as you let it! Frequent use of this will hypothetically increase your overall awareness of your financial situation, which may in turn have a positive impact on your social and academic lives." />
                    <FAQModule title="Q: How do I report a problem?" content="We try our best to get things working immediately, but if (for whatever reason) things aren't up to your standar, feel free to contact us through the 'Contact' page." />
                    <FAQModule title="Q: What tips will I be shown?" content="Tips are randomly generated based on a number of factors, ensuring they remain valid to your own financial situation." />
                    <ContactUsBanner>
                        <ContactUsLink to="/contact">Can't find what You're looking for? Contact us!</ContactUsLink>
                    </ContactUsBanner>
                </FAQModuleOrganiser>
            </FAQMainContainer>
            <ReportProblem />
        </>
    );
};
