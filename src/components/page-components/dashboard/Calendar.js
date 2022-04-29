import React, { useState } from 'react';
import styled from 'styled-components';
// Firestore Stuff //
import { db } from '../../../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
// Import Helpers //
import { useAuth } from '../../../contexts/AuthContext';
// Import Images //
import incoming from '../../../images/incoming.png';
import outgoing from '../../../images/outgoing.png';

const CalendarContainer = styled.div`
    width: 100%;
    height: 23vh;
    background: #e1e1e1;
    box-shadow: inset 0 0 10px #333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const CalendarBoxContainers = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    overflow-y: scroll;
    flex-wrap: wrap;
    align-items center;
    justify-content: center;
    flex-direction: row;
`;

const CalendarTitle = styled.h1`
    width: 100%;
    font-size: 24px;

    &:first-of-type {
        margin-left: 10px;
        line-height: 50px;
    }
`;

const CalendarText = styled.p`
    width: 100%;
    text-align: left;
    font-size: 20px;
`;

const CalendarEntry = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: #fafafa;
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 20px;
    border-radius: 5px;

    &:first-of-type {
        margin-top: 10px;
    }
`;

const CalendarTopRow = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
`;

const ActivityIcon = styled.img`
    width: 50px;
`;

export default function Calendar() {
    const { currentUser } = useAuth();

    const [activities, setActivities] = useState([]);
    const ActivityColRef = collection(db, 'activity');
    const queryActivity = query(ActivityColRef, where("email", "==", currentUser.email), orderBy('time', 'desc'));
    onSnapshot(queryActivity, (snapshot) => {
        let activityarray = []
        snapshot.docs.forEach((doc) => {
            activityarray.push({ ...doc.data(), id: doc.id });
        });
        setActivities(activityarray);
    });


    return (
        <>
            <CalendarContainer>
                <CalendarBoxContainers>
                    {activities.map(activity => (
                        <>
                        <CalendarEntry>
                            <CalendarTopRow>
                                <ActivityIcon src={activity.activitytype === "Outgoing" ? outgoing : incoming} alt="Conditional Render" />
                                <CalendarTitle key={activity.id}>{activity.time.toDate().toDateString()}</CalendarTitle>
                            </CalendarTopRow>
                            <CalendarText>{activity.title} - £{activity.value}</CalendarText>
                            <CalendarText>{activity.description}</CalendarText>
                        </CalendarEntry>
                        </>
                    ))}
                </CalendarBoxContainers>
            </CalendarContainer>
        </>
    )
}
