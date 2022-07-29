import "./styles.css";
import "./styles.scss";


import { Weather } from "./weather";
import { Giphy } from "./giphy";


// basic dom variables
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const min_temp = document.getElementById('min-temp');
const max_temp = document.getElementById('max-temp');
const dashboard = document.getElementById('dashboard');
const tomorrow_temp = document.getElementById('tomorrow-temp');
const description = document.getElementById('description');
const header = document.getElementById('header');

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
let weatherKey = "85dfcfe9ef0ce0be2a1188644d09aed0";
let giphyKey = "45j3475WNdpgrjPpn1blPTSh0HjNLUFz";

const giphy = new Giphy(giphyKey);
const weather = new Weather(curr_city, weatherKey);

weather.getWeather()
        .then(data => {
            generateWeatherGraph(data, dashboard);

            // get a gif
            giphy.getGif(data[0].weather.name).then(gif => {
                console.log(gif);
                header.style.cssText = `background-image: url('${gif}');
                background-size: cover;
                background-position: center center;
                `;
            });
            

            // update dom
            

            city.innerText = curr_city;
            temperature.innerText = data[0].temperature.tmp + "ºC";
            min_temp.innerText = data[0].temperature.min + "ºC";
            max_temp.innerText = data[0].temperature.max + "ºC";
            tomorrow_temp.innerText = data[8].temperature.tmp + "ºC";
            description.innerText = data[0].weather.name;
        }); // activate in the end to not waste resources









