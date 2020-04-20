import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";

export default class extends React.Component{
    constructor(props){
        super(props);
        const {location: { pathname }} = props;
        this.state = {
          result: null,
          error: null,
          loading: true,
          isVideoTab: true,
          isCompaniesTab: false,
          isCountriesTab: false,
          isSeasonsTab: false,
          isMovie: pathname.includes("/movie/")
        };
    }

    clickVideo = () => {
        this.setState({
          isVideoTab: true,
          isCompaniesTab: false,
          isCountriesTab: false,
          isSeasonsTab: false
        });
    }

    clickCompanies = () => {
        this.setState({
          isVideoTab: false,
          isCompaniesTab: true,
          isCountriesTab: false,
          isSeasonsTab: false
        });
    }

    clickCountries = () => {
        this.setState({
          isVideoTab: false,
          isCompaniesTab: false,
          isCountriesTab: true,
          isSeasonsTab: false
        });
    }

    clickSeasons = () => {
        this.setState({
          isVideoTab: false,
          isCompaniesTab: false,
          isCountriesTab: false,
          isSeasonsTab: true
        });
    }

    async componentDidMount() {
        const {
            match: {
                params: { id }
            },
            history: { push }
        } = this.props;
        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push('/');
        }
        let result = null;
        try{
            if(isMovie){
                ({
                    data: result
                } = await moviesApi.movieDetail(parsedId));
            }else{
                ({
                    data: result
                } = await tvApi.showDetail(parsedId));
            }
        }catch(error){
            this.setState({
                error: "Can't find anything."
            })
        }finally{
            this.setState({
                loading: false,
                result
            })
        }
    }

    render() {
        return (
          <DetailPresenter
            {...this.state}
            clickVideo={this.clickVideo}
            clickCompanies={this.clickCompanies}
            clickCountries={this.clickCountries}
            clickSeasons={this.clickSeasons}
          />
        );
    }
}