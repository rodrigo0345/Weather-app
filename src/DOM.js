export class Home{
    constructor(callbackForCity)
    {
        // basic dom variables
        this.city = document.getElementById('city');
        this.temperature = document.getElementById('temperature');
        this.min_temp = document.getElementById('min-temp');
        this. max_temp = document.getElementById('max-temp');
        this. dashboard = document.getElementById('dashboard');
        this. tomorrow_temp = document.getElementById('tomorrow-temp');
        this.description = document.getElementById('description');
        this.header = document.getElementById('header');

        // city change
        this.search_city = document.getElementById('change-city');
        this.search_city.addEventListener('submit', (e) => {callbackForCity(e)});
    }

    // inputs
    searchCity(e)
    {
        e.preventDefault();

        const new_city = document.getElementById('city-input');

        return new_city.value;
    }

    // outputs 
    outputCity(city)
    {
        this.city.innerText = city;
    }    

    outputTemperature(temperature)
    {
        this.temperature.innerText = temperature;
    }

    outputMinTemperature(min_temp)
    {
        this.min_temp.innerText = min_temp;
    }

    outputMaxTemperature(max_temp)
    {
        this.max_temp.innerText = max_temp;
    }

    outputTomorrowTemperature(tomorrow_temp)
    {
        this.tomorrow_temp.innerText = tomorrow_temp;
    }

    outputDescription(description)
    {
        this.description.innerText = description;
    }

    outputBackgroundInHeader(img_link)
    {
        this.header.style.cssText = `background-image: url('${img_link}');
                background-attachment: fixed;
                background-size: cover;
                background-position: center center;
                `;
    }
}