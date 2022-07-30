export class WeatherAPI{
    constructor(city)
    {   
        this.city = city;
        this.apiKey = "85dfcfe9ef0ce0be2a1188644d09aed0";
    }

    changeCity(city)
    {
        this.city = city;
    }

    formatResponseWeather(data)
    {
        const result = [];

        data.list.forEach(time =>{
            const day = time.dt_txt.split(' ')[0];
            const hour = time.dt_txt.split(' ')[1];

            const state = {
                'day': day,
                'hour': hour,
                'temperature': {
                    'tmp': time.main.temp,
                    'min': time.main.temp_min,
                    'max': time.main.temp_max
                },
                'weather': {
                    'name': time.weather[0].description,
                    'icon': time.weather[0].icon
                },
                'humidity': time.main.humidity,
                'wind': {
                    'speed': time.wind.speed,
                }
            }

            result.push(state);
        });

        return result;
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

        const result = this.formatResponseWeather(data);
        
        return result;
    }

    async getCityCoords()
    {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=2&appid=${this.apiKey}`;
        const response = await fetch(geoUrl);
        const data = await response.json();
        return { 'lat': data[0].lat, 'lon': data[0].lon };
    }

}