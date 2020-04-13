import React from "react";
import ReactLoading from "react-loading";
import styled, {keyframes} from "styled-components";

const Container = styled.div`
    height: 25vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 20px;
`;

export default () => (
  <Container>
    <ReactLoading
      type={"spin"}
      color={"#3498db"}
      height={"80px"}
      width={"80px"}
    />
  </Container>
);
 