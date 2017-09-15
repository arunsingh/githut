export class LangChartStore {

  constructor() {
    this.config = {
        credits: { enabled: false },
        chart: { type: 'spline', backgroundColor: 'transparent' },
        title: { text: '' },
        xAxis: { categories: [] },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
                formatter: function() {
                    return (this.value * 100) + "%"
                  }
            }
        },
        plotOptions: {
            spline: { lineWidth: 4,
                states: { hover: { lineWidth: 5 } },
                marker: { enabled: false }
            },
            series: {
              animation: {
                  duration: 500,
              }
            }
        },
      colors: ['#555555', '#178600', '#f34b7d', '#b07219',
        '#f1e05a', '#f15c80', '#4F5D95', '#3572A5', '#701516', '#c22d40'],
        tooltip: {
            formatter: function() {
                return '<span style="color:' + this.series.color + '">'
                + this.series.name + '</span>: <b>'
                + (this.y * 100).toFixed(2) + '%</b>'
            }
        }
     };
  }

  getConfig() {
    return this.config;
  }

}
