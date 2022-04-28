import React, { useState, useRef } from 'react';
import styled from 'styled-components';
// Firestore Stuff //
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query, addDoc, Timestamp, where } from 'firebase/firestore';
// Import Helpers //
import breakpoint from '../../../devices/breakpoints';
import { useAuth } from '../../../contexts/AuthContext';
// Import Images //
import incoming from '../../../images/incoming.png';
import outgoing from '../../../images/outgoing.png';

const ActivityPostContainer = styled.div`
    @media ${breakpoint.device.xs} {
        width: 85%;
    }

    @media ${breakpoint.device.sm} {
        width: 70%;
    }

    @media ${breakpoint.device.lg} {
        width: 70%;
    }

    height: 10vh;
    border-radius: 20px;
    margin-left: 10%;
    margin-top: 2vh;
    background: #fafafa;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    &:last-of-type {
        margin-bottom: 2vh;
    }
`;

const ActivityIcon = styled.img`
    width: 50px;
`;

const ActivityDetailsTitleContainer = styled.div`
    height: 100%;
    width: 20%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ActivityDetailsContainer = styled.div`
    height: 100%;
    width: 60%;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ActivityPostTitleMain = styled.h1`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }

    font-weight: 500;
    width: 100%;
    text-align: right;
`;

const ActivityPostDescriptionMain = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }

    font-weight: 500;
    width: 100%;
    text-align: right;
`;

const ActivityPostDetailsMain = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }
    
    font-weight: 500;
    width: 100%;
    text-align: right;
`;

const ActivityPostTitle = styled.h1`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }
    
    font-weight: 500;
    width: 100%;
    text-align: left;
`;

const ActivityPostDescription = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }
    
    font-weight: 500;
    width: 100%;
    text-align: left;
`;

const ActivityPostDetails = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 18px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 22px;
    }

    @media ${breakpoint.device.lg} {
        font-size: 26px;
    }
    
    font-weight: 500;
    width: 100%;
    text-align: left;
`;

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

// Add Activity Button //
const ActivityOverlayToggle = styled.button`
    margin-top: 15px;
    margin-left: 20px;
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

const ActivityLabel = styled.label`
    width: 80%;
    font-size: 26px;
    font-weight: 300;
    margin-bottom: 5px;
`;

const ActivityInput = styled.input`
    background-color: #c9c9c9;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    outline: 0;
    border: 0;
    border-bottom: 3px solid #0040E4;
    width: 80%;
    height: 5vh;
    margin-bottom: 50px;
    font-size: 24px;
    padding-left: 10px;
`;

const ActivityHeader = styled.h1`
    width: 100%;
    font-size: 38px;
    font-weight: 500;
    margin-top: 50px;
    text-align: center;
    margin-bottom: 50px;
`;

const AddActivity = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ActivityWindow = styled.div`
    width: 50vw;
    height: 70vh;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ActivityBtnContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: -30px;
`;

const ActivityAddBtn = styled.button`
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

const ActivityOr = styled.p`
    margin-left: 20px;
    margin-right: 20px;
    font-size: 28px;
    margin-top: 30px;
`;

const ActivityClose = styled.p`
    margin-top: 10px;
`;

export default function Activity() {
    const [ActivityOpen, setActivityOpen] = useState(false);
    const { currentUser } = useAuth();
    const activityTitleRef = useRef();
    const activityDescriptionRef = useRef();
    const activityValueRef = useRef();
    const activityOwnerRef = useRef();
    const [activityCount, setActivityCount] = useState(0);

    const [activities, setActivities] = useState([]);
    const ActivityColRef = collection(db, 'activity');
    const queryActivity = query(ActivityColRef, where("email", "==", currentUser.email), orderBy('time', 'desc'));
    onSnapshot(queryActivity, (snapshot) => {
        let activityarray = []
        snapshot.docs.forEach((doc) => {
            activityarray.push({ ...doc.data(), id: doc.id });
        });
        setActivities(activityarray);
        setActivityCount(snapshot.size);
    });

    const handleNewOutgoing = async () => {
        // const docRef = doc(db, "activity", "activity001");
        // const payload = { title: activityTitleRef.current.value, description: activityDescriptionRef.current.value, value: activityValueRef.current.value, owner: activityOwnerRef.current.value, email: currentUser.email}
        // await addDoc(docRef, payload);
        const OutgoingcollectionRef = collection(db, "activity");
        const Outgoingpayload = { title: activityTitleRef.current.value, description: activityDescriptionRef.current.value, value: activityValueRef.current.value, owner: activityOwnerRef.current.value, email: currentUser.email, activitytype: 'Outgoing', time: Timestamp.now()}
        await addDoc(OutgoingcollectionRef, Outgoingpayload);
        activityTitleRef.current.value = "";
        activityDescriptionRef.current.value = "";
        activityValueRef.current.value = "";
        activityOwnerRef.current.value = "";
        alert("Successfully added new activity!");
    }

    const handleNewIncoming = async () => {
        const IncomingcollectionRef = collection(db, "activity");
        const Incomingpayload = { title: activityTitleRef.current.value, description: activityDescriptionRef.current.value, value: activityValueRef.current.value, owner: activityOwnerRef.current.value, email: currentUser.email, activitytype: 'Incoming', time: Timestamp.now()}
        await addDoc(IncomingcollectionRef, Incomingpayload);
        activityTitleRef.current.value = "";
        activityDescriptionRef.current.value = "";
        activityValueRef.current.value = "";
        activityOwnerRef.current.value = "";
        alert("Successfully added new activity!");
    }

    return (
        <>
        { ActivityOpen && 
        <AddActivity>
            <ActivityWindow>
                <ActivityHeader>Add New Activity</ActivityHeader>
                <ActivityLabel>Add Activity Name:</ActivityLabel>
                <ActivityInput type="text" required ref={activityTitleRef} placeholder="What was the occasion?"/>
                <ActivityLabel>Add Activity Description:</ActivityLabel>
                <ActivityInput type="text" ref={activityDescriptionRef} placeholder="Add a little detail if you like!"/>
                <ActivityLabel>Add Activity Value (£):</ActivityLabel>
                <ActivityInput type="number" required ref={activityValueRef} placeholder="How much did it come to?"/>
                <ActivityLabel>Add recipient / sender:</ActivityLabel>
                <ActivityInput type="text" required ref={activityOwnerRef} placeholder="Who did you send it to or recieve it from?"/>
                <ActivityBtnContainer>
                    <ActivityAddBtn onClick={handleNewOutgoing}>Add Outgoing</ActivityAddBtn>
                    <ActivityOr>OR</ActivityOr>
                    <ActivityAddBtn onClick={handleNewIncoming}>Add Incoming</ActivityAddBtn>
                </ActivityBtnContainer>
                <ActivityClose onClick={() => setActivityOpen(!ActivityOpen)}>Close</ActivityClose>
            </ActivityWindow>
        </AddActivity>}
        <SectionHeader>Activity:</SectionHeader>
            <SectionScrollable long>
                {activities.map(activity => (
                    <ActivityPostContainer key={activity.id}>
                        <ActivityIcon src={activity.activitytype === "Outgoing" ? outgoing : incoming} alt="Conditional Render" />
                        <ActivityDetailsTitleContainer>
                            <ActivityPostTitleMain>Transaction:</ActivityPostTitleMain>
                            <ActivityPostDescriptionMain>Description:</ActivityPostDescriptionMain>
                            <ActivityPostDetailsMain>Details:</ActivityPostDetailsMain>
                        </ActivityDetailsTitleContainer>
                        <ActivityDetailsContainer>
                            <ActivityPostTitle>{activity.title}</ActivityPostTitle>
                            <ActivityPostDescription>{activity.description}</ActivityPostDescription>
                            <ActivityPostDetails>£{activity.value} - {activity.owner}</ActivityPostDetails>
                        </ActivityDetailsContainer>
                    </ActivityPostContainer>
                ))}
            </SectionScrollable>
        <ActivityOverlayToggle onClick={() => setActivityOpen(!ActivityOpen)}>Add Activity</ActivityOverlayToggle>
        </>
    )
}