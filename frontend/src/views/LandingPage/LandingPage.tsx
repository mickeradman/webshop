import React from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { isValidPath } from "../../utils/helperFunctions/isValidPath";

const StyledLandingPage = styled.main`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.appBg};
  padding: 2rem 0;

  @media screen and (max-width: 1440px) {
    padding: 2rem 1rem;
  }
`;

function LandingPage() {
  const navigate = useNavigate();
  const navPath = "/nyheter";

  // Navigera till senast besökta fliken om det inte gått mer än 12 timmar - annars navigeras man till Nyheter.
  useEffect(() => {
    const lastVisitedPage = localStorage.getItem("lastVisitedPage");
    const lastInteractionTime = localStorage.getItem("lastInteractionTime");

    if (
      lastVisitedPage &&
      isValidPath(lastVisitedPage) &&
      lastInteractionTime &&
      Date.now() - parseInt(lastInteractionTime) < 60 * 60 * 12 * 1000
    ) {
      localStorage.setItem("lastInteractionTime", Date.now().toString());
      navigate(lastVisitedPage);
    } else {
      localStorage.setItem("lastVisitedPage", navPath);
      localStorage.setItem("lastInteractionTime", Date.now().toString());
      navigate(navPath);
    }
  }, [navPath, navigate]);

  return (
    <StyledLandingPage>
      <Outlet />
    </StyledLandingPage>
  );
}

export default LandingPage;
