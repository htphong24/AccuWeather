import { ThunkDispatch } from 'redux-thunk';
import axios from 'axios';
import { Constants } from "../Constants";
import { AppActions } from "../types/Actions";
import { City } from "../types/City";
import { CurrentCondition } from "../types/CurrentCondition";
import { Weather } from "../types/Weather";

export const getCountries = (): AppActions => ({
    type: "GET_COUNTRIES",
    payload: {
        request: {
            url: `${Constants.locationAPIUrl}/countries?apikey=${Constants.apiKey}`
        }
    }
});

export const getWeather = (countryCode: string, searchText: string) => {
    return async (dispatch: ThunkDispatch<any, any, AppActions>) => {
        try {
            var res = await axios.get(`${Constants.locationAPIUrl}/cities/${countryCode}/search?apikey=${Constants.apiKey}&q=${searchText}`);
            const cities = res.data as City[];
            var weather = {} as Weather;
            if (cities.length > 0) {
                const city = cities[0];
                weather = await getCurrentWeather(city);
            }

            return dispatch({
                type: "GET_WEATHER_SUCCESS",
                payload: weather
            });
        }
        catch (e: any) {
            return dispatch({
                type: "GET_WEATHER_FAIL",
                error: e.isAxiosError ? e.message : JSON.stringify(e)
            });
        }
    }
}

export const getWeather2 = (countryCode2: string, searchText2: string) => {
    return async (dispatch: ThunkDispatch<any, any, AppActions>) => {
        try {
            var res = await axios.get(`${Constants.locationAPIUrl}/cities/${countryCode2}/search?apikey=${Constants.apiKey}&q=${searchText2}`);
            const cities = res.data as City[];
            var weather2 = {} as Weather;
            if (cities.length > 0) {
                const city2 = cities[0];
                weather2 = await getCurrentWeather2(city2);
            }

            return dispatch({
                type: "GET_WEATHER_SUCCESS",
                payload: weather2
            });
        }
        catch (e: any) {
            return dispatch({
                type: "GET_WEATHER_FAIL",
                error: e.isAxiosError ? e.message : JSON.stringify(e)
            });
        }
    }
}

export async function getCurrentWeather(city: City): Promise<Weather> {
    const res = await axios.get(`${Constants.currentConditionsAPIUrl}/${city.Key}?apikey=${Constants.apiKey}`);
    const currentConditions = res.data as CurrentCondition[];
    if (currentConditions.length > 0) {
        return new Weather(currentConditions[0], city);
    }
    return {} as Weather;
}

export async function getCurrentWeather2(city2: City): Promise<Weather> {
    const res = await axios.get(`${Constants.currentConditionsAPIUrl}/${city2.Key}?apikey=${Constants.apiKey}`);
    const currentConditions = res.data as CurrentCondition[];
    if (currentConditions.length > 0) {
        return new Weather(currentConditions[0], city2);
    }
    return {} as Weather;
}