import React, { Component } from "react";
import cityList from "./json/city.list.json";
import { Button, Input, Card } from "@material-ui/core";
import "./style/weather.css";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      errorMessage: "Sorry, that is not a valid city",
      isLoaded: false,
      name: "",
      country: "",
      description: "",
      humidity: "",
      temp: ""
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
            humidity: data.main.humidity,
            description: data.weather[0].description,
            country: data.sys.country,
            name: data.name
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: true,
            temp: " ",
            country: " ",
            name: " "
          });
        }
      );
  }

  // Fetch random city weather on page load
  componentDidMount() {
    const key = "weather?id=";
    let cityId = cityList[Math.floor(Math.random() * cityList.length)].id;
    this.getWeather(key, cityId);
  }

  // Fetch random city weather on random button click
  onClickRandom(e) {
    e.preventDefault();
    const key = "weather?id=";
    let cityId = cityList[Math.floor(Math.random() * cityList.length)].id;
    this.getWeather(key, cityId);
  }

  // Fetch city & country weather on search button click
  onSearch(e) {
    e.preventDefault();
    const key = "weather?q=";
    let city = this.refs.city.value;
    let country = this.refs.country.value;
    let location = city + "," + country;
    this.getWeather(key, location);
  }

  render() {
    let {
      name,
      temp,
      country,
      humidity,
      description,
      error,
      errorMessage
    } = this.state;

    return (
      <div className="container">
        <Card className="card col-lg-4">
          <form onSubmit={this.onSearch}>
            <input
              type="search"
              className="custom-search-class"
              placeholder="City"
              ref="city"
            />
            <br />
            <input
              type="search"
              className="custom-search-class"
              placeholder="Country"
              ref="country"
            />
            <br />
            <input type="submit" className="button" value="Get Weather" />
          </form>

          <Button onClick={this.onClickRandom}>Random</Button>
          <div>{error ? errorMessage : ""}</div>
          <h3>
            {name}, {country}
          </h3>

          <div>
            <b>Temperature</b>: {temp}
            °F
          </div>
          <div>
            <b>Humidity</b>: {humidity}%
          </div>
          <div>{description}</div>
        </Card>
      </div>
    );
  }
}
