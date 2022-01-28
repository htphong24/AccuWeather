import React from "react";
import { AppState } from "../store/configureStore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/Actions";
import { getWeather, getWeather2 } from "../actions/Actions";
import { Button, FormControl } from 'react-bootstrap';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { Country } from '../types/Country';
import { City } from '../types/City';

interface IState {
    city: City;
    country: Country;
    searchText: string;
    city2: City;
    country2: Country;
    searchText2: string;
    cities: City[];
};

interface IFormProps {
    countries: Country[];
}

interface IDispatchProps {
    getWeather: (country: string, city: string) => void;
    getWeather2: (country2: string, city2: string) => void;
}

interface IProps extends IFormProps, IDispatchProps { }

class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            city: {} as City,
            country: {} as Country,
            searchText: "",
            city2: {} as City,
            country2: {} as Country,
            searchText2: "",
            cities: []
        }
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log("---this.state.searchText---");
        console.log(this.state.searchText);
        console.log("---this.state.country---");
        console.log(this.state.country);
        if (this.state.searchText && this.state.country)
            this.props.getWeather(this.state.country.ID, this.state.searchText);
    }

    handleSubmit2 = async (e: any) => {
        e.preventDefault();
        console.log("---this.state.searchText2---");
        console.log(this.state.searchText2);
        console.log("---this.state.country2---");
        console.log(this.state.country2);
        if (this.state.searchText2 && this.state.country2)
            this.props.getWeather2(this.state.country2.ID, this.state.searchText2);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <Typeahead
                                    id="country"
                                    labelKey="EnglishName"
                                    options={this.props.countries}
                                    onChange={(s) => this.setState({ country: s[0] } as IState)}
                                    placeholder="Country..."
                                />
                            </div>
                            <div className="col-sm-4 form-group field">
                                <FormControl id="city" type="text" name="city" onChange={(e: any) => this.setState({ searchText: e.target.value })} placeholder="City... " />
                            </div>
                            <div className="col-sm-2 form-group field">
                                <Button variant="primary" type="submit"> Go </Button>
                            </div>
                        </div>
                    </div>       
                </form>
                <form onSubmit={this.handleSubmit2}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4 form-group">
                                <Typeahead
                                    id="country2"
                                    labelKey="EnglishName"
                                    options={this.props.countries}
                                    onChange={(s) => {
                                        console.log("---s---");
                                        console.log(s);
                                        this.setState({ country2: s[0] } as IState);
                                    }}
                                    placeholder="Country..."
                                />
                            </div>
                            <div className="col-sm-4 form-group field">
                                <FormControl id="city2" type="text" name="city2" onChange={(e: any) => this.setState({ searchText2: e.target.value })} placeholder="City..." />
                            </div>
                            <div className="col-sm-2 form-group field">
                                <Button variant="primary" type="submit"> Go </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
};

const mapStateToProps = (state: AppState): IFormProps => ({
    countries: state.countries
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IDispatchProps => ({
    getWeather: bindActionCreators(getWeather, dispatch),
    getWeather2: bindActionCreators(getWeather2, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
