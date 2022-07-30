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
        return chart;
    }

    updateChart(chart, canvas, data)
    {      
        chart.destroy();
        return this.newChart(canvas, data);
    }
}