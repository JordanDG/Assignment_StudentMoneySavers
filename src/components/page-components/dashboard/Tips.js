import React, { useState } from 'react';
import tipIcon from '../../../images/tipIcon.png';
import styled from 'styled-components';
import breakpoint from '../../../devices/breakpoints';
// Firestore Stuff //
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const SectionHeader = styled.h1`
    padding: 20px;
    fonts-size: 24px;
    color: #333;
`;

const SectionScrollable = styled.div`
    width: 100%;
    height: ${props => props.long ? "50.5vh" : "30vh"};
    overflow-y: scroll;
    background: #e1e1e1;
    box-shadow: inset 0 0 10px #333;
`;

const TipsParentContainer = styled.div`

    @media ${breakpoint.device.xs} {
        width: 90vw;
        margin-top: 1.6vh;
        height: 42vh;
    }

    @media ${breakpoint.device.sm} {
        width: 90vw;
        margin-top: 1.6vh;
        height: 42vh;
    }

    @media ${breakpoint.device.lg} {
        width: 90%;
        height: 42vh;
        margin-top: 2.5vh;
    }

    background: #fafafa;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
`;

const TipContainer = styled.div`
    width: 80%;
    margin-left: 5%;
    height: 100px;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const TipIconImg = styled.img`
    width: 65px;
    margin-left: 20px;
`;

const TipContents = styled.div`
    width: 80%;
    height: 100%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TipHeader = styled.h1`
    @media ${breakpoint.device.xs} {
        text-align: left;
        font-size: 16px;
    }

    @media ${breakpoint.device.sm} {
        text-align: left;
        font-size: 20px;
    }

    @media ${breakpoint.device.lg} {
        text-align: left;
        font-size: 28px;
    }
    
    text-align: left;
    width: 100%;
    font-weight: 700;
    font-size: 28px;
`;

const TipText = styled.p`
    @media ${breakpoint.device.sm} {
        text-align: left;
        font-size: 20px;
    }

    @media ${breakpoint.device.lg} {
        text-align: left;
        font-size: 24px;
    }

    width: 100%;
    font-weight: 500;
    margin-top: 8px;
`;

export default function Tips() {

    const [tips, setTips] = useState([]);
    const TipsColRef = collection(db, 'tips');
    
    const queryTip = query(TipsColRef, /*where("email", "===", "currentUser.email"), */orderBy('number', 'asc'));
    onSnapshot(queryTip, (snapshot) => {
        let tipsarray = []
        snapshot.docs.forEach((doc) => {
            tipsarray.push({ ...doc.data(), id: doc.id });
        });
        setTips(tipsarray);
    });

    return (
    <>
        <TipsParentContainer>
            <SectionHeader>Tips:</SectionHeader>
            <SectionScrollable>
                {tips.map(tip => (
                    <TipContainer key={tip.id}>
                        <TipIconImg src={tipIcon} alt="Tip Icon" />
                            <TipContents>
                                <TipHeader>Tip #{tip.number}</TipHeader>
                                <TipText>{tip.tip}</TipText>
                            </TipContents>
                    </TipContainer>
                ))}
            </SectionScrollable>
        </TipsParentContainer>
    </>
    )
}
