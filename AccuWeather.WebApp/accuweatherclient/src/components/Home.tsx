import React from 'react';
import Form from './Form';
import { connect } from "react-redux";
import { AppActions } from "../types/Actions";
import { bindActionCreators } from "redux";
import { ThunkDispatch } from "redux-thunk";
import WeatherDetails from './WeatherDetails';
import { Weather } from "../types/Weather";
import { City } from "../types/City";
import { Country } from "../types/Country";
import { getCountries } from "../actions/Actions";

interface IState {
    weather: Weather,
    countries: Country[],
    city?: City
}

interface IDispatchProps {
    getCountries: () => void;
}

class Home extends React.Component<IDispatchProps, IState> {

    public state: IState = {
        countries: [],
        city: undefined,
        weather: { error: "" } as Weather
    }

    async componentDidMount() {
        try {
            this.props.getCountries();
        } catch (error) {

        }
    }

    render() {
        return (
            <div className="container content panel">
                <div className="container">
                    <div className="row">
                        <div className="form-container">
                            <WeatherDetails />
                            <Form />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>): IDispatchProps => ({
    getCountries: bindActionCreators(getCountries, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);