﻿import React from "react";
import { Button, FormControl } from 'react-bootstrap';
import { AsyncTypeahead, Typeahead } from 'react-bootstrap-typeahead';
import { Country } from '../types/Country';
import { City } from '../types/City';

interface IState {
    city: City;
    country: Country;
    cities: City[];
    searchText: string
};

interface IProps {
    /* The http path that the form will be posted to */
    countries: Country[];
}
class Form extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            city: {} as City,
            country: {} as Country,
            cities: [],
            searchText: ""
        }
    };
    handleSubmit = async (e: any) => {
    }
    mySetState = (s: any) => {
        this.setState({ country: s[0] } as IState);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 form-group">
                            <Typeahead
                                id="country"
                                labelKey="EnglishName"
                                //options={Object.keys(this.props.countries)}
                                options={this.props.countries}
                                //onChange={this.mySetState}
                                onChange={(s) => this.setState({ country: s[0] } as IState)}
                                placeholder="Country..."
                            />
                        </div>
                        <div className="col-sm-4 form-group field">
                            <FormControl id="city" type="text" name="city"
                                onChange={(e: any) => this.setState
                                    ({ searchText: e.target.value })} placeholder="  City... " />
                        </div>
                        <div className="col-sm-2 form-group field">
                            <Button variant="primary" type="submit"> Go </Button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
};
export default Form;