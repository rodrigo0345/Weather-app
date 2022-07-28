export class Weather{
    constructor(city, apiKey)
    {   
        this.city = city;
        this.apiKey = apiKey;
    }
    async getWeather()
    {
        // geocoding
        const coords = await this.getCityCoords();

        // fetching
        const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}&lat=${coords.lat}&lon=${coords.lon}`;
        const response = await fetch( url, { mode : 'cors' });
        const data = await response.json();
        
        const weather = {
            'city': this.city,
            'temperature': {
                'unit': data.temperature.unit,
                'value': data.temperature.value,
                'min': data.temperature.min,
                'max': data.temperature.max
            },
            'humidity': {
                'unit': data.humidity.unit,
                'value': data.humidity.value
            },
            'condition': {
                'name': data.weather.value,
                'icon': data.condition.icon
            }
        }
        
        return weather;
    }
    async getCityCoords()
    {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=2&appid=${this.apiKey}`;
        const response = await fetch(geoUrl);
        const data = await response.json();
        return { 'lat': data[0].lat, lon: data[0].lon };
    }
}