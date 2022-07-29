export class Giphy{
    constructor(apiKey)
    {
        this.apiKey = apiKey;
    }
    async getGif(value)
    {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${value}&limit=1`;

        const response = await fetch(url, { mode : 'cors' });
        const data = await response.json();
        console.log(data);
        const result = this.formatResponseGif(data.data);

        return result[0];
    }
    formatResponseGif(data)
    {
        const result = [];

        data.forEach(gif =>{
            const mp4 = gif.images.original.url;
            result.push(mp4);
        });

        return result;
    }
}