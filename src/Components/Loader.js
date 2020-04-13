import React from "react";
import styled, {keyframes} from "styled-components";

const Container = styled.div`
    height: 25vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 20px;
    font-size: 64px;
`;

export default () => (
  <Container>
    <span role="img" aria-label="Loading">
        ⏰
    </span>
  </Container>
);
 