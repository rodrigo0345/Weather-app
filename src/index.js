import "./styles.css";
import "./styles.scss";

import "./chartBuilder.js"


import { WeatherAPI } from "./weather";
import { Giphy } from "./giphy";
import { Home } from "./DOM";
import { ChartJS } from './chartBuilder';

let curr_city = 'Barcelos';

function searchCity(e)
{
    e.preventDefault();

    const new_city = document.getElementById('city-input').value;

    if(new_city === '') { window.alert('Please fill in the city') }

    curr_city = new_city;

    mainApp();
}


const home = new Home(searchCity);
const giphy = new Giphy();
const weather = new WeatherAPI();
const graph = new ChartJS();

let chart = null;

function mainApp()
{
    const data = weather.getWeather(curr_city);
    data.then(data =>{ processWeather(data) });

    function processWeather(data)
    {
        if(chart !== null)
        {
            graph.updateChart(chart, data);
        }
        else
        {
            chart = graph.newChart(dashboard, data);
        }
        
        let current_hour = Number(data[0].hour.split(':')[0]);
        let searchInGiphy = '';

        if(current_hour > 20 || current_hour < 6){ searchInGiphy = data[0].weather.name + ' night'; }
        else { searchInGiphy = data[0].weather.name + ' day'; }
        
        // get a gif
        const gif = giphy.getGif(searchInGiphy);

        // update the Home page
        gif.then(result =>{
            home.outputBackgroundInHeader(result);
        });
        
        // update dom
        home.outputCity(curr_city);
        home.outputTemperature(data[0].temperature.tmp + "ºC");
        home.outputMinTemperature(data[0].temperature.min + "ºC");
        home.outputMaxTemperature(data[0].temperature.max + "ºC");
        home.outputDescription(data[0].weather.name);
        home.outputWind(data[0].wind.speed + " km/h");
        home.outputHumidity(data[0].humidity + "%");
    }
}

// inicialization
mainApp();