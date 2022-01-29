import React from 'react';
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { Weather } from '../types/Weather'

interface IProp {
    weather: Weather,
    weather2: Weather,
};

class WeatherDetails extends React.Component<IProp> {
    render() {
        const weather = this.props.weather;
        const weather2 = this.props.weather2;
        return (
            <div>
                <div className="city col-sm-9">
                    {
                        weather.location && <div>
                            <h1>{weather.location}</h1>
                            <div className="row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    weather.weatherIcon && <img src={weather.weatherIcon} className="img-thumbnail" />
                                                }
                                            </td>
                                            <td>
                                                <span>{weather.weatherText}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {weather.isDaytime && <span>
                                                    Daytime
                                                </span>}
                                                {!weather.isDaytime && <span>
                                                    Night
                                                </span>}
                                            </td>
                                            <td>
                                                <span>{weather.temperatureValue}&deg;{weather.temperatureUnit}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                    {
                        weather2.location && <div>
                            <h1>{weather2.location}</h1>
                            <div className="row">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {
                                                    weather2.weatherIcon && <img src={weather2.weatherIcon} className="img-thumbnail" />
                                                }
                                            </td>
                                            <td>
                                                <span>{weather2.weatherText}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {weather2.isDaytime && <span>
                                                    Daytime
                                                </span>}
                                                {!weather2.isDaytime && <span>
                                                    Night
                                                </span>}
                                            </td>
                                            <td>
                                                <span>{weather2.temperatureValue}&deg;{weather2.temperatureUnit}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                </div>
                {
                    weather.error && <p className="weatherError">
                        {weather.error}
                    </p>
                }
                {
                    weather2.error && <p className="weatherError">
                        {weather2.error}
                    </p>
                }
            </div>
        );
    }
};


const mapStateToProps = (state: AppState): IProp => ({
    weather: state.weather,
    weather2: state.weather2
});

export default connect(mapStateToProps)(WeatherDetails)