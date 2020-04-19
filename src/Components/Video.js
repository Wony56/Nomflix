import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const VideoFrame = styled.iframe`
  width: 256px;
  margin-right: 20px;
`;

const Video = ({id, v_key}) => {
    return (
      <VideoFrame
        id={id}
        width="560"
        height="200"
        src={`https://www.youtube.com/embed/${v_key}`}
        frameborder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    );
}

Video.propsTypes = {
    id: PropTypes.string.isRequired,
    v_key: PropTypes.string.isRequired,
}

export default Video;