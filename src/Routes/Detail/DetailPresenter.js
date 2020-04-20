import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {Helmet} from "react-helmet";
import Loader from "Components/Loader";
import Video from "Components/Video";
import Company from "Components/Company";
import Country from "Components/Country";
import Season from "Components/Season";
import { Link, withRouter } from "react-router-dom";


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
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;

  @media only screen and (orientation: portrait) {
    flex-direction: column;
  }
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;

  @media only screen and (orientation: portrait) {
    display: none;
  }
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;

  @media only screen and (orientation: portrait) {
    width: 100%;
    margin-left: 0;
  }
`;

const Title = styled.h3`
  font-size: 32px;
  display: flex;
  align-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Imdb = styled.div`
  display: inline-block;
  width: 48px;
  height: 40px;
  background-image: url("https://img.icons8.com/color/96/000000/imdb.png");
  background-position: center center;
  background-size: cover;
`;

const Collection = styled(Link)`
  margin-left: 10px;
  padding: 5px;
  background-color: white;
  color: black;
  border-radius: 5px;
  font-weight: bold;
  font-size: 15px;
`;

const ItemContainer = styled.div`
  margin: ${props => (props.imdb ? "5px 0 20px 0" : "20px 0")};
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const TabContainer = styled.div`
  margin: 30px 0 20px 0;
`;

const TabList = styled.ul`
  font-size: 20px;
  display: flex;
`;

const TabItem = styled.li`
  padding: 15px 20px;
  border-bottom: 3px solid
    ${props => (props.current ? "#3498db" : "transparent")};
  &:hover {
    background-color: #3498db;
    opacity: 0.8;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const TabContents = styled.div``;

const Videos = styled.div`
  width: 75%;
  height: 250px;
  display: flex;
  overflow: auto;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const Companies = styled.div`
  display: flex;
  width: 75%;
  height: 250px;
  overflow: auto;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const Countries = styled.div`
  width: 75%;
  display: flex;
  height: 250px;
  overflow: auto;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const Seasons = styled.div`
  width: 75%;
  height: 250px;
  display: flex;
  overflow: auto;

  @media only screen and (orientation: portrait) {
    width: 100%;
  }
`;

const DetailPresenter = withRouter(
  ({
    location: { pathname },
    result,
    error,
    loading,
    isVideoTab,
    isCompaniesTab,
    isCountriesTab,
    isSeasonsTab,
    clickVideo,
    clickCompanies,
    clickCountries,
    clickSeasons
  }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading... | Nomflix</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
            | Nomflix
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.jpg")
            }
          />
          <Data>
            <Title>
              <span>
                {result.original_title
                  ? result.original_title
                  : result.original_name}
              </span>
            </Title>
            <ButtonContainer>
              {result.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                >
                  <Imdb />
                </a>
              )}
              {result.belongs_to_collection && (
                <Collection
                  to={`/collections/${result.belongs_to_collection.id}`}
                >
                  COLLECTION
                </Collection>
              )}
            </ButtonContainer>
            <ItemContainer imdb={result.imdb_id}>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date ? result.first_air_date.substring(0, 4) : " - "}
              </Item>
              <Divider>∙</Divider>
              <Item>
                {result.runtime && result.runtime}
                {result.episode_run_time && result.episode_run_time[0]}
                {result.runtime === null &&
                  !result.episode_run_time === null &&
                  "-"}{" "}
                min
              </Item>
              <Divider>∙</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <TabContainer>
              <TabList>
                {result.videos.results && (
                  <TabItem current={isVideoTab} onClick={clickVideo}>
                    Videos ({result.videos.results.length})
                  </TabItem>
                )}
                {result.production_companies && (
                  <TabItem current={isCompaniesTab} onClick={clickCompanies}>
                    Companies ({result.production_companies.length})
                  </TabItem>
                )}
                {result.production_countries && (
                  <TabItem current={isCountriesTab} onClick={clickCountries}>
                    Countries ({result.production_countries.length})
                  </TabItem>
                )}
                {result.seasons && (
                  <TabItem current={isSeasonsTab} onClick={clickSeasons}>
                    Seasons ({result.seasons.length})
                  </TabItem>
                )}
              </TabList>
            </TabContainer>
            <TabContents>
              {isVideoTab && (
                <Videos>
                  {result.videos.results.map(video => (
                    <Video key={video.id} id={video.id} v_key={video.key} />
                  ))}
                </Videos>
              )}
              {isCompaniesTab && (
                <Companies>
                  {result.production_companies.map(company => (
                    <Company key={company.id} {...company} />
                  ))}
                </Companies>
              )}
              {isCountriesTab && (
                <Countries>
                  {result.production_countries.map(country => (
                    <Country {...country} />
                  ))}
                </Countries>
              )}
              {isSeasonsTab && (
                <Seasons>
                  {result.seasons.map(season => (
                    <Season key={season.id} {...season} />
                  ))}
                </Seasons>
              )}
            </TabContents>
          </Data>
        </Content>
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default DetailPresenter;