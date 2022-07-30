import "./styles.css";
import "./styles.scss";


import { WeatherAPI } from "./weather";
import { Giphy } from "./giphy";
import { Home } from "./DOM";
import { Chart } from './chartBuilder';


function generateWeatherGraph(data, element) 
{
    const labels = [], datapoints = [];

    let initial_time;
    let end = false;
    data.forEach(time =>{
        if(time.hour === initial_time)
        {
            end = true;
        }
        
        if(!initial_time)
        {
            initial_time = time.hour;
        }
        
        if(!end)
        {
            labels.push(time.hour);
            datapoints.push(time.temperature.tmp);
        }
       
    }); 

    const aux = {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (ºC)',
                data: datapoints,
                backgroundColor: 'rgba(87, 140, 255, 0.8)',
                borderColor: 'rgba(87, 140, 255, 1)',
                tension: 0.1,
            }
        ]
    }

    const config = {
        type: 'line',
        data: aux,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Temperatura en ' + data[0].day,
            }
        },
    }

    const chart = new Chart(element, config);
    return chart;
}

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
const weather = new WeatherAPI(curr_city);
const graph = new Chart();

function mainApp()
{
    function processWeather(data)
    {
        graph.newChart(dashboard, data);

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
        home.outputTomorrowTemperature(data[8].temperature.tmp + "ºC");
        home.outputDescription(data[0].weather.name);
    }

    const data = weather.getWeather();
    data.then(data =>{ processWeather(data) });
}

// inicialization
mainApp();











