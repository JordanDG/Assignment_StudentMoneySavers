// Import Important //
import React from "react";
import styled from "styled-components";
// Import Helpers //
import breakpoint from "../../devices/breakpoints";
// Import Components //
import LoggedInHeader from "../headers/LoggedInHeader";
import ReportProblem from "../page-components/ReportProblem";
import BurgerNav from "../page-components/BurgerNav";
// Aspects //
import Tips from "../page-components/dashboard/Tips";
import Activity from "../page-components/dashboard/Activity";
import DashboardUserCard from "../page-components/dashboard/DashboardUserCard";

const DashboardMain = styled.div`
  @media ${breakpoint.device.xs} {
    width: 90vw;
    flex-direction: column;
    margin-left: 5vw;
  }
  @media ${breakpoint.device.sm} {
    width: 90vw;
    margin-left: 5vw;
    flex-direction: column;
  }
  @media ${breakpoint.device.lg} {
    width: 90vw;
    margin-left: 5vw;
    height: 80vh;
    flex-direction: row;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DashBoardLeft = styled.div`
  @media ${breakpoint.device.sm} {
    width: 90vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  @media ${breakpoint.device.lg} {
    width: 45vw;
  }
  height: 80vh;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const DashBoardRight = styled.div`
  @media ${breakpoint.device.xs} {
    width: 90vw;
    margin-right: 0px;
  }
  @media ${breakpoint.device.sm} {
    width: 90vw;
    margin-right: 0px;
    height: 75vh;
  }
  @media ${breakpoint.device.lg} {
    width: 45vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;
  }
`;

const ActivityContainer = styled.div`
  @media ${breakpoint.device.xs} {
    width: 90vw;
  }
  @media ${breakpoint.device.sm} {
    width: 90vw;
  }
  @media ${breakpoint.device.lg} {
    width: 90%;
  }
  height: 62.5vh;
  margin-top: 2.5vh;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fafafa;
  border-radius: 10px;
`;

const CalendarContainer = styled.div`
  @media ${breakpoint.device.sm} {
    width: 90vw;
  }
  @media ${breakpoint.device.lg} {
    width: 90%;
    margin-top: 2.5vh;
  }
  height: 30vh;
  background: #fafafa;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 10px;
`;

const SectionHeader = styled.h1`
  padding: 20px;
  fonts-size: 24px;
  color: #333;
`;

export default function Dashboard() {
  return (
    <>
      <LoggedInHeader />
      <BurgerNav />
      <DashboardMain>
        <DashBoardLeft>
          <DashboardUserCard />
          <ActivityContainer>
            <Activity />
          </ActivityContainer>
        </DashBoardLeft>
        <DashBoardRight>
          <CalendarContainer>
            <SectionHeader>Calendar:</SectionHeader>
          </CalendarContainer>
          <Tips />
        </DashBoardRight>
      </DashboardMain>
      <ReportProblem />
    </>
  );
}