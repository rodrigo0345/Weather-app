import "./styles.css";
import "./styles.scss";


import { Weather } from "./weather";


function generateWeatherGraph(data)
{
    const labels = [], datapoints = [];

    data.forEach(time =>{
        labels.push(time.hour);
        datapoints.push(time.temperature.tmp);
    }); 

    const aux = {
        labels: labels,
        datasets: [
            {
                label: 'Temperatura (ºC)',
                data: datapoints,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.5,
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

    const chart = new Chart(document.getElementById('myChart'), config);
}

const info = document.querySelector(".info");

const weather = new Weather("Barcelos", "85dfcfe9ef0ce0be2a1188644d09aed0");
weather.getWeather()
        .then(data => {
            generateWeatherGraph(data);
        }); // activate in the end to not waste resources









