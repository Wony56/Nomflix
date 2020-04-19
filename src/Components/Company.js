import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  :not(:last-child) {
    margin-right: 10px;
  }
  width: 120px;
  height: 170px;
  max-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 150px;
  min-height: 150px;
  background-color: rgba(200, 200, 200, 0.3);
  border-radius: 5px;
`;

const Name = styled.div`
    display: flex;
    justify-content: center;
    font-weight: 600;
`;

const Company = ({logo_path, name}) => {
    return (
      <Container>
        <Logo>
          <img
            src={
              logo_path
                ? `https://image.tmdb.org/t/p/original/${logo_path}`
                : require("../assets/noPosterSmall.jpg")
            }
            width="100px"
          />
        </Logo>
        <Name>{name}</Name>
      </Container>
    );
}

Company.propTypes = {
  logo_path: PropTypes.string,
  name: PropTypes.string
}

export default Company;