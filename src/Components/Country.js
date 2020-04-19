import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Flag from "react-world-flags";

const Container = styled.div`
    :not(:last-child){
        margin-right: 20px;
    }
    width: 100px;
`;

const Image = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    font-weight: 600;
`;

const FlagImage = styled(Flag)`
    width: 80px;
    height: 50px;
`;

const Name = styled.div`
    text-align: center;
`;

const Country = ({iso_3166_1: code, name}) => {
    return (
      <Container>
        <Image>
          <FlagImage code={code} />
        </Image>
        <Name>{name}</Name>
      </Container>
    );
}

Country.propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}

export default Country;