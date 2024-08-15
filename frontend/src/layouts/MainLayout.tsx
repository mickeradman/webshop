import React from "react";
import Header from "../views/Header/Header";
import Navbar from "../views/Navbar/Navbar";
import LandingPage from "../views/LandingPage/LandingPage";
import styled from "styled-components";

export const AligningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 60%;
  padding: 0 1.5rem 1.5rem 1.5rem;
  background-color: ${({ theme }) => theme.color.appBg};
`;

interface MainLayoutProps {
  isLightMode: boolean;
  switchTheme: () => void;
}

const MainLayout = ({ isLightMode, switchTheme }: MainLayoutProps) => {
  return (
    <>
      <Header isLightMode={isLightMode} onClickThemeChange={switchTheme} />
      <AligningWrapper>
        <Navbar />
        <LandingPage />
      </AligningWrapper>
    </>
  );
};

export default MainLayout;
