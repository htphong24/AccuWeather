import React from 'react';
import Form from './Form';
import { Weather } from "../types/Weather";
import { City } from "../types/City";
import { Country } from "../types/Country";
import { CurrentCondition } from "../types/CurrentCondition";
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

    async getCities(searchText: string, countryCode: string): Promise<City> {
        const api = `${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`;
        console.log("---api---");
        console.log(api);
        const res = await fetch(api);
        const cities = await res.json() as City[];
        if (cities.length > 0)
            return cities[0];
        return {} as City;
    }

    async getCurrentConditions(city: City) {
        try {
            const res = await fetch(`${Constants.currentConditionsAPIUrl}/
                                 ${city.Key}?apikey=${Constants.apiKey}`);
            const currentConditions = await res.json() as CurrentCondition[];
            if (currentConditions.length > 0) {
                const weather = new Weather(currentConditions[0], city);
                await this.setStateAsync({
                    weather: weather,
                    city: city
                } as IState);
            }
        } catch (error) {
            console.log(error);
        }
        return {} as Weather;
    }

    getWeather = async (e: any, countryCode: string, searchText: string) => {
        e.preventDefault();
        if (!countryCode && !searchText) {
            await this.setStateAsync
                ({ weather: { error: "Please enter the value." } } as IState);
            return;
        }
        try {
            const city = await this.getCities(searchText, countryCode);
            console.log("---city---");
            console.log(city);
            if (city.Key) {
                await this.getCurrentConditions(city);
            }
        } catch (err) {
            await this.setStateAsync({ weather: { error: err } } as IState);
        }
    };

    async setStateAsync(state: IState) {
        return new Promise((resolve: any) => {
            this.setState(state, resolve);
        });
    }

    async componentDidMount() {
        try {
            const countries = await this.getCountries();
            await this.setStateAsync({ countries: countries } as IState);
        } catch (error) {
        }
    }

    render() {
        return (
            <div className="container content panel">
                <div className="container">
                    <div className="row">
                        <div className="form-container">
                            <WeatherDetails weather={this.state.weather} />
                            <Form getWeather={this.getWeather} countries={this.state.countries} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;