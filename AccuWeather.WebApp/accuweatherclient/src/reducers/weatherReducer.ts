import { Weather } from "../types/Weather";
import { AppActions } from "../types/Actions";
import * as Actions from "../types/Actions";

const weatherReducerDefaultState: Weather = {};

const weatherReducer = (state = weatherReducerDefaultState, action: AppActions): Weather => {
    switch (action.type) {
        case Actions.GET_WEATHER_SUCCESS:
            const weather = action.payload;
            return weather;

        case Actions.GET_WEATHER_FAIL:
            return {
                error: action.error
            } as Weather;

        default:
            return state;
    }
};
export { weatherReducer };