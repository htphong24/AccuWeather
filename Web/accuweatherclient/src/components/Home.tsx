﻿import React from 'react';
import Form from './Form';
import { Weather } from "../types/Weather";
import { City } from "../types/City";
import { Country } from "../types/Country";
import WeatherDetails from './WeatherDetails';
import { Constants } from '../Constants';

interface IState {
    weather: Weather,
    countries: Country[],
    city?: City
}

class Home extends React.Component {

    public state: IState = {
        weather: {
            error: ""
        } as Weather,
        countries: [],
        city: undefined
    }

    async getCountries(): Promise<Country[]> {
        try {
            const res = await fetch
                (`${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`);
            return await res.json() as Country[];
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    render() {
        return (
            <div className="container content panel">
                <div className="container">
                    <div className="row">
                        <div className="form-container">
                            <WeatherDetails weather={this.state.weather} />
                            <Form countries={this.state.countries} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;