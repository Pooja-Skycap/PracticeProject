import { Box, Typography } from "../../utils/commonImports";
import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 89vh;
  padding: 20px;
`;

export const InnerContainer = styled.div`
  height: 90vh;
  width: 100%;
  max-width: 90vw;
`;

export const StyledBox = styled(Box)(() => ({
  height: "64vh",
  width: "100%",
}));

export const FormHeading = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
