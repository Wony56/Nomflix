import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: 125px;
    height: 250px;
    display: inline;
    flex-direction: column;
`;

const Poster = styled.div`
    width: 100%;
    height: 200px;
`;

const PosterImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

const Title = styled.div`
    font-weight: 600;
    text-align: center;
`;

const Part = ({ title, poster_path }) => (
    <Container>
        <Poster>
            <PosterImg 
                src={poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` 
                        : require("assets/noPosterSmall.jpg")} 
            />
            <Title>
                {title}
            </Title>
        </Poster>
    </Container>
);

Part.propTypes = {
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string
}
export default Part;