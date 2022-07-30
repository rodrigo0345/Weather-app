export class ChartJS{
    constructor()
    {
        this.labels = [];
        this.datapoints = [];
    }

    chartInitialized()
    {
        return this.labels.length > 0;
    }

    newChart(canvas, data)
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
        
        // chart is not recognised here
        const chart = new Chart(canvas, config);

        console.log(chart)
        return chart;
    }

    updateChart(chart, data)
    {      
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
                this.labels.push(time.hour);
                this.datapoints.push(time.temperature.tmp);
            }
        
        }); 

        chart.data.labels = this.labels;
        chart.data.datasets[0].data = this.datapoints;
    }
}