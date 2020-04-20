import React, {useState, useEffect} from "react";
import {withRouter, useParams} from "react-router-dom";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import {moviesApi} from "api";

import Loader from "Components/Loader";
import Part from "Components/Part";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    z-index: 1;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  margin-right: 10px;

  @media only screen and (orientation: portrait) {
    display: none;
  }
`;

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h3`
  font-size: 32px;
  display: flex;
  align-content: flex-start;
`;

const Overview = styled.p`
  margin: 30px 0;
  width: 60%;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const Parts = styled.div`
  width: 60%;
  height: 70%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 125px);
  grid-gap: 10px;
  justify-content: center;
  overflow: auto;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

export default () => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  const getCollection = async id => {
    try {
      const {data: collection} = await moviesApi.collections(id);
      setCollection(collection);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollection(id);
  }, [id]);

  return loading ? (
    <>
      <Helmet>
        <title>Loading... | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>{collection.name} | Nomflix</title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${collection.backdrop_path}`}
      />
      <Content>
        <Cover>
          <CoverImg
            src={
              collection.poster_path
                ? `https://image.tmdb.org/t/p/original${collection.poster_path}`
                : require("assets/noPosterSmall.jpg")
            }
          />
        </Cover>
        <Data>
          <TextContainer>
            <Title>{collection.name}</Title>
            <Overview>{collection.overview}</Overview>
          </TextContainer>
          <Parts>
            {collection.parts &&
              collection.parts.map(part => <Part {...part} />)}
          </Parts>
        </Data>
      </Content>
    </Container>
  );
};