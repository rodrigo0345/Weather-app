import "./styles.css";
import "./styles.scss";

import { Weather } from "./weather";

const info = document.querySelector(".info");

const weather = new Weather("Barcelos", "85dfcfe9ef0ce0be2a1188644d09aed0");
weather.getWeather()
        .then(data => {
            console.log(data)
            info.innerHTML = `
                <h1>${data.city}</h1>
                <p>${data.condition.name}</p>
                <p>${data.temperature.tmp}ºC Min:${data.temperature.min}ºC Max:${data.temperature.max}ºC</p>
                <p>${data.humidity.value}%</p>
            `;
        }); // activate in the end to not waste resources

