import React, { Component } from "react";
import cityList from "./city.list.json";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      error: "Sorry, that is not a valid city",
      isLoaded: false,
      name: "",
      country: "",
      temp: "",
      location: ""
    };
    this.onSearch = this.onSearch.bind(this);
    this.onClickRandom = this.onClickRandom.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather(key, location) {
    const OPEN_WEATHER_MAP_URL = "http://api.openweathermap.org/data/2.5/";
    const DEFAULT_UNIT = "imperial";
    let apiKey = "a3ec3c40eccd28d909b1bb6ecfe621c0";
    let requestUrl = `${OPEN_WEATHER_MAP_URL}${key}${location}&appid=${apiKey}&units=${DEFAULT_UNIT}`;

    fetch(requestUrl)
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            temp: data.main.temp,
            country: data.sys.country,
            name: data.name
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  componentDidMount() {
    const key = "weather?id=";
    let cityId = cityList[Math.floor(Math.random() * cityList.length)].id;
    this.getWeather(key, cityId);
  }

  onClickRandom(e) {
    e.preventDefault();
    const key = "weather?id=";
    let cityId = cityList[Math.floor(Math.random() * cityList.length)].id;
    this.getWeather(key, cityId);
  }

  onSearch(e) {
    e.preventDefault();
    const key = "weather?q=";
    let city = this.refs.city.value;
    let country = this.refs.country.value;
    let location = city + "," + country;
    this.getWeather(key, location);
  }

  render() {
    let { name, temp, country } = this.state;

    return (
      <div>
        <form onSubmit={this.onSearch}>
          <input
            type="search"
            className="custom-search-class"
            placeholder="City"
            ref="city"
          />
          <input
            type="search"
            className="custom-search-class"
            placeholder="Country"
            ref="country"
          />

          <input type="submit" className="button" value="Get Weather" />
        </form>

        <button onClick={this.onClickRandom}>Random</button>
        <h3>
          {name}, {country}
        </h3>

        <div>{temp}</div>
      </div>
    );
  }
}
