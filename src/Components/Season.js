import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    :not(:last-child){
        margin-right: 20px;
    }
`;

const Poster = styled.div``;

const Image = styled.img`
    width: 150px;
    height: 200px;
    border-radius: 5px;
`;

const Title = styled.div`
    font-weight: 600;
`;

const Season = ({air_date, episode_count, name, poster_path}) => {
    return (
      <Container>
        <Poster>
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/original${poster_path}`
                : require("../assets/noPosterSmall.jpg")
            }
          />
        </Poster>
        <Title>
          {name} ({air_date ? air_date.substring(0, 4) : " - "})
        </Title>
        <div>Episode: {episode_count ? episode_count : " - "}</div>
      </Container>
    );
}

Season.propTypes = {
    air_date: PropTypes.string,
    episode_count: PropTypes.number,
    name: PropTypes.string.isRequired,
    poster_path: PropTypes.string
}

export default Season;