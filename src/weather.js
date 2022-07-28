export class Weather{
    constructor(city, apiKey)
    {   
        this.city = city;
        this.apiKey = apiKey;
    }

    changeCity(city)
    {
        this.city = city;
    }

    async getWeather()
    {
        // geocoding
        const coords = await this.getCityCoords();

        // fetching
        const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}&lat=${coords.lat}&lon=${coords.lon}&units=metric`;
        const response = await fetch( url, { mode : 'cors' });
        const data = await response.json();

        console.log(data);

        const weather = {
            'city': this.city,
            'temperature': {
                'tmp': Number(data.list[0].main.temp),
                'min': Number(data.list[0].main.temp_min),
                'max': Number(data.list[0].main.temp_max)
            },
            'humidity': {
                'value': data.list[0].main.humidity
            },
            'condition': {
                'name': data.list[0].weather[0].description,
                'icon': data.list[0].weather[0].icon
            }
        }
        
        return weather;
    }

    async getCityCoords()
    {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=2&appid=${this.apiKey}`;
        const response = await fetch(geoUrl);
        const data = await response.json();
        return { 'lat': data[0].lat, 'lon': data[0].lon };
    }
}