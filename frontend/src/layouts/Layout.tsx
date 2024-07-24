import React from "react";
import styled from "styled-components";

const StyledPaddingWrapper = styled.div<{ $padding: string }>`
  padding: ${({ $padding }) => $padding};
`;

type PaddingWrapperProps = {
  children: React.ReactNode;
  padding?: string;
};

const PaddingWrapper = ({
  children,
  padding = "1rem",
}: PaddingWrapperProps) => {
  return (
    <StyledPaddingWrapper $padding={padding}>{children}</StyledPaddingWrapper>
  );
};

const Layout = {
  PaddingWrapper,
};

export default Layout;
