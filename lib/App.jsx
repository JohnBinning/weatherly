import React, { Component } from 'react';
import Input from './Input';
import TenDay from './TenDay';
import Conditions from './Conditions';
// import keys from '../keys';
import * as $ from 'jquery';
import scrubData from './scrubData';
import Hourly from './Hourly';
import CurrentForecast from './CurrentForecast';
import conditionStyles from './conditionStyles';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      currentLocation: '',
      tenDayWeather: [],
      conditions: {},
      hourly: [],
      currentForecast: {},
    };
  }

  componentDidMount() {
    const theCity = JSON.parse(localStorage.getItem('city'));
    document.body.style.backgroundImage = "url('./styles/pics/default_weather.jpeg')";

    theCity && this.loadInfo(theCity, this.state.language);
  }

  handleClick(input, language) {
    const url = `https://api.wunderground.com/api/2e519fe31304e9ee/conditions/hourly/forecast10day/lang:${language}/${input}.json`;

    this.getInfo(input, language).catch(() => {
      alert('please select a valid location');
    });
    localStorage.setItem('city', JSON.stringify(input));
    this.setURL(url, input);
  }

  setURL(url, input) {
    this.setState({
      url,
      currentLocation: input,
    });
  }

  getInfo(input, language) {
    const url = `https://api.wunderground.com/api/2e519fe31304e9ee/conditions/hourly/forecast10day/lang:${language}/${input}.json`;
    const weather = $.get(url).then((dataResponse) => {
      this.setState(scrubData(dataResponse));
    }).then(() => {
      conditionStyles(this.state.conditions);
    });

    return weather;
  }

  loadInfo(input, language) {
    const url = `https://api.wunderground.com/api/2e519fe31304e9ee/conditions/hourly/forecast10day/lang:${language}/${input}.json`;

    this.getInfo(input, language);
    this.setURL(url, input);
  }

  render() {
    return (
      <div id="page-wrapper">
        <Input handleClick={this.handleClick.bind(this)} />
        <Conditions conditions={this.state.conditions} />
        <CurrentForecast currentForecast={this.state.currentForecast} />
        <Hourly hourly={this.state.hourly} />
        <TenDay tenDayWeather={this.state.tenDayWeather} />
      </div>
    );
  }
}
