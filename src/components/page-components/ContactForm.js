import React, { useState } from 'react'
import styled from 'styled-components';
import { db } from'../../firebase.js'

const ContactFormMain = styled.form`
    width: 50%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

const ContactInputTextArea = styled.textarea`
    width: 350px;
    height: 200px;
    font-size: 24px;
    padding-left: 20px;
    resize: none;
    padding-top: 10px;
    outline: 0;
    border: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    border-bottom: 5px solid #0040E4;
    transition: all 0.5s ease-in-out;

    &:focus {
        background-color: #e1e1e1;
    }
`;

const ContactFormSubmitBtn = styled.button`
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

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        db.collection('contacts').add({
            name:name,
            email:email,
            message:message,
        })
        .then(() => {
            alert(`Thank you for your submission, we'll try our best to get it sorted quickly!`);
        })
        .catch(error => {
            alert(error.message);
        });

        setName('');
        setEmail('');
        setMessage('');
    }

    return (
        <>  
            <ContactFormMain onSubmit={handleSubmit}>
                <ContactLabel>Name:</ContactLabel>
                <ContactInput type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <ContactLabel>Email:</ContactLabel>
                <ContactInput type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <ContactLabel>Message:</ContactLabel>
                <ContactInputTextArea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required/>
                <ContactFormSubmitBtn type="submit" >Submit</ContactFormSubmitBtn>
            </ContactFormMain>
        </>
    )
}
