import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ReportAProblemMain = styled.div`
    height: 5vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const ReportAProblemText = styled(Link)`
    color: #333;
    text-align: center;
    font-size: 12;
    text-align: center;
    text-decoration: none;
    transition: all 0.5s ease-in-out;
    border-bottom: 3px solid transparent;

    &:hover {
        border-bottom: 3px solid #0040E4;
    }
`;

export default function ReportProblem() {
    return (
        <>
            <ReportAProblemMain>
                <ReportAProblemText to="/report">Report A Problem</ReportAProblemText>
            </ReportAProblemMain>
        </>
    );
};
