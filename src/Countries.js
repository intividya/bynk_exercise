import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Route, withRouter} from 'react-router-dom';

class CountriesDropdown extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
        };
    }

    render () {
        let planets = this.props.state.planets;
        let optionItems = planets.map((country) => <option key={country.name}>{country.name}</option>);
        return (
         <div>
             <select>
                {optionItems}
             </select>
         </div>
        )
    }
}

export default CountriesDropdown;