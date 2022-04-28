import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import breakpoint from '../../../devices/breakpoints';
import { useAuth } from '../../../contexts/AuthContext';
import defaultProfilePicture from '../../../images/ProfileDefault.png';
import { collection, onSnapshot, query, where, setDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

const UserCard = styled.div`
    @media ${breakpoint.device.xs} {
        width: 90vw;
    }
    
    @media ${breakpoint.device.sm} {
        width: 80vw;
    }

    @media ${breakpoint.device.lg} {
        width: 80%;    
    }

    height 8vh;
    background-color: #fafafa;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const UserImage = styled.img`
    width: 70px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
    margin-left: 20px;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
    }
`;

const UserDetailTitles = styled.div`
    width: 15%;    
    height: 100%;
    margin-left: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const UserDetails = styled.div`
    height: 100%;
    display: flex;
    margin-left: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const UserInformationTitle = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 16px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 16px;
    }

    width: 100%;
    height: 25%;
    font-weight: 700;
    padding: 5px;
    text-align: right;
`;

const UserInformation = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 16px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 16px;
    }

    width: 100%;
    font-weight: 500;
    padding: 5px;
    height: 25%;
    text-align: left;
`;

const UserInformationBudget = styled.p`
    @media ${breakpoint.device.xs} {
        font-size: 16px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 16px;
    }
`;

const UserInformationDetails = styled.div`
    @media ${breakpoint.device.xs} {
        font-size: 12px;
    }

    @media ${breakpoint.device.sm} {
        font-size: 16px;
    }

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    font-weight: 500;
    padding: 5px;
    height: 25%;
    text-align: left;
`;

const UserLogout = styled.p`
    @media ${breakpoint.device.xs} {
        margin-left: 0%;
        font-size: 16px;
        color: #333;
        height: 12vh;
        line-height: 12vh;
        width: 15%;
        text-align: right;
    }   

    @media ${breakpoint.device.sm} {
        margin-left: 0%;
        font-size: 24px;
        color: #333;
        height: 12vh;
        line-height: 12vh;
        width: 15%;
        text-align: right;
    }

    @media ${breakpoint.device.lg} {
        font-size: 24px;
        color: #333;
        height: 12vh;
        line-height: 12vh;
        width: 15%;
        margin-left: 20%;
        text-align: right;
    }

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;

const EditButton = styled.button`
    width: 50px;
    margin-left: 10px;
`;

const EditOverlay = styled.div`
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

const EditWindow = styled.div`
    width: 20vw;
    height: 25vh;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const EditHeader = styled.h1`
    width: 100%;
    font-size: 38px;
    font-weight: 500;
    margin-top: 50px;
    text-align: center;
    margin-bottom: 50px;
`;

const EditLabel = styled.label`
    width: 80%;
    font-size: 26px;
    font-weight: 300;
    margin-bottom: 5px;
`;

const EditInput = styled.input`
    background-color: #c9c9c9;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    outline: 0;
    border: 0;
    border-bottom: 3px solid #0040E4;
    width: 80%;
    height: 50px;
    margin-bottom: 20px;
    font-size: 24px;
    padding-left: 10px;
`;

const EditUpdateBudget = styled.button`
    margin-top: 30px;
    width: 200px;
    font-size: 24px;
    border-radius: 10px;
    border: 0;
    transition: all 0.5s ease-in-out;
    height: 100px;
    margin-bottom: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: linear-gradient(225deg, rgba(245,56,85,1) 0%, rgba(0,64,228,1) 100%);
    color: #fff;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        cursor: pointer;
    }
`;

const EditClose = styled.p`
    margin-bottom: 10px;
`;

export default function DashboardUserCard(props) {
    const { currentUser, logout } = useAuth();
    const [editwindow, setEditWindow] = useState(false);
    const [error, setError] = useState();
    const editBudgetRef = useRef();
    const navigate = useNavigate();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            navigate('/login');
            alert("Successfully logged out.");
            window.location.reload(false);
        } catch {
            setError("Failed to logout - please try again!");
            alert(error);
        }
    }

    const [budgets, setBudgets] = useState([]);
    const budgetColRef = collection(db, "budgets");
    const queryBudgets = query(budgetColRef, where("email", "==", currentUser.email));
    onSnapshot(queryBudgets, (snapshot) => {
        let budgetarray = []
        snapshot.docs.forEach((doc) => {
            budgetarray.push({ ...doc.data(), id: doc.id });
        });
        setBudgets(budgetarray);
    });

    async function handleEdit() {
        const editID = budgets[0].id;
        const docRef = doc(db, "budgets", editID);
        const payload = {email: currentUser.email, budget: editBudgetRef.current.value};
        await setDoc(docRef, payload);
        alert("Successfully updated budget!");
    }

    return (
        <>
            { editwindow && 
                <EditOverlay>
                    <EditWindow>
                        <EditHeader>Edit Monthly Budget:</EditHeader>
                        <EditLabel>Monthly Budget:</EditLabel>
                        <EditInput type="number" required ref={editBudgetRef} placeholder="leave blank to keep the same!" />
                        <EditUpdateBudget onClick={handleEdit}>Update</EditUpdateBudget>
                        <EditClose onClick={() => setEditWindow(!editwindow)}>Close</EditClose>
                    </EditWindow>
                </EditOverlay>
            }
            <UserCard>
                <UserImage src={defaultProfilePicture} alt="Profile Picture" />
                    <UserDetailTitles>
                        <UserInformationTitle>Email:</UserInformationTitle>
                        <UserInformationTitle>Join Date:</UserInformationTitle>
                        <UserInformationTitle>Budget:</UserInformationTitle>
                    </UserDetailTitles>
                    <UserDetails>
                        <UserInformation>{currentUser ? currentUser.email : "Loading..."}</UserInformation>
                        <UserInformation>{currentUser ? currentUser.metadata.creationTime : "Loading..."}</UserInformation>
                        <UserInformationDetails>
                            {budgets ? budgets.map(budget => (
                                <UserInformationBudget key={budget.id}>£{budget.budget}</UserInformationBudget>
                            )) : "Not Allocated"}
                            {budgets ? budgets.map(budget => (
                                <EditButton key={budget.id} onClick={() => setEditWindow(!editwindow)}>Edit</EditButton>
                            )) : ""}
                        </UserInformationDetails> 
                    </UserDetails>
                    <UserLogout onClick={handleLogout}>Logout</UserLogout>
            </UserCard>
        </>
    )
}
