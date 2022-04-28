import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import BurgerNav from '../page-components/BurgerNav';
import LoggedInHeader from '../headers/LoggedInHeader';
import ReportProblem from '../page-components/ReportProblem';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import defaultProfilePicture from '../../images/ProfileDefault.png';

const UpdateProfileMainContainer = styled.div`
    width: 100vw;
    height: 80vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Signupheader = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 10px;
    display: flex;
    margin-bottom: -50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HeaderText = styled.h1`
    font-size: 34px;
    word-spacing: 5px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 50px;
    width: 100%;
`;

const Signupmain = styled.div`
    width: 100%;
    height: 500px;
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: center;
`;

const SignupmainTitle = styled.h1`
    font-size: 28px;
    word-spacing: 5px;
    width: 100%;
    text-align: center;
    margin-bottom: 0px;
    margin-bottom: 10px;
`;

const SignupmainForm = styled.form`
    width: 100%;
    height: 430px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -15px;
    justify-content: flex-start;
`;

const ErrorAlert = styled.p`
    color: red;
    font-size: 16px;
    text-align: center;
    width: 100%;
    margin-top: -10px;
`;

const MainContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 800px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    background-color: rgba(250, 250, 250, 0.85);
`;

const ContactLabel = styled.label`
    width: 350px;
    font-size: 24px;
    margin-bottom: 8px;
    font-weight: 500;
`;

const ContactInput = styled.input`
    width: 350px;
    height: 40px;
    font-size: 24px;
    padding-left: 20px;
    outline: 0;
    border: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 5px solid #0040E4;
    margin-bottom: 20px;
    background-color: #fafafa;
    transition: all 0.5s ease-in-out;


    &:focus {
        background-color: #e1e1e1;
    }
`;

const ContactFormSubmitBtn = styled.button`
    margin-top: 0px;
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

const ProfilePictureContainer = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const ProfilePictureDisplay = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: contain;
`;

export default function UpdateProfile() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { currentUser, updatePassword, updateEmail } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match!");
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value));
        }

        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value));
        }

        Promise.all(promises).then(() => {
            navigate('/dashboard');
            alert("You have successfully updated your profile!");
        }).catch(() => {
            setError('Failed to update account! - Please try again later.');
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            <BurgerNav />
            <LoggedInHeader />
            <UpdateProfileMainContainer>
            <MainContainer>  
            <Signupheader>
                <HeaderText>Update Your Profile</HeaderText>
            </Signupheader>
            <ProfilePictureContainer>
                <ProfilePictureDisplay alt="Avatar" src={defaultProfilePicture} />
            </ProfilePictureContainer>
            <Signupmain>
                <SignupmainTitle>Profile:</SignupmainTitle>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                <SignupmainForm onSubmit={handleSubmit}>
                    <ContactLabel>Email:</ContactLabel>
                    <ContactInput type="email" required ref={emailRef} defaultValue={currentUser.email}/>
                    <ContactLabel>New Password:</ContactLabel>
                    <ContactInput type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
                    <ContactLabel>Confirm New Password:</ContactLabel>
                    <ContactInput type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
                    <ContactFormSubmitBtn type="submit">Submit</ContactFormSubmitBtn>
                </SignupmainForm>
            </Signupmain>
            </MainContainer>  
            </UpdateProfileMainContainer>
            <ReportProblem />
        </>
    )
}
