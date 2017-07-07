import React, { Component } from 'react';
import * as $ from 'jquery';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      location: '',
      apiLocationSuggestion: {},
      language: 'EN',
    };
  }

  submitLocation() {
    const newLocation = this.state.apiLocationSuggestion;

    this.setState({
      location: newLocation,
    });

    this.props.handleClick(newLocation.url, this.state.language);
  }

  autoComplete(input) {
    $.getJSON(`https://autocomplete.wunderground.com/aq?cb=?&query=${input}`).then((dataResponse) => {
      this.state.apiLocationSuggestion = {
        url: dataResponse.RESULTS[0].l,
        name: dataResponse.RESULTS[0].name };
      this.setState({
        apiLocationSuggestion: this.state.apiLocationSuggestion,
      });
    });
  }

  render() {
    return (
      <nav>
        <h1 className="weathrly">Weathrly</h1>
        <article className="input-wrapper">
          <input
            className="input-location"
            placeholder= "City, State"
            onChange={ (e) => {
              this.setState({
                location: this.autoComplete(e.target.value),
              });
            }}>
          </input>

          <button
            className="save"
            onClick={this.submitLocation.bind(this)}>
            Save
          </button>
          <select
            className="lang"
            onChange= {(e) => {
              this.setState({
                language: e.target.value,
              });
            }}>
            <option value="EN">English</option>
            <option value="SP">Espanol</option>
            <option value="FR">Francais</option>
            <option value="DL">Deutsch</option>
          </select>
        </article>
      </nav>
    );
  }

}
