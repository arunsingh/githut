import React from 'react'
import { observer } from 'mobx-react'
import { autorun } from 'mobx'
import { update, range, sortBy, includes, uniqBy, reject, flatten, map,
    take, zipWith, divide, unzip, sum, filter, drop, first, keys, isEqual } from 'lodash/fp'
import ReactHighcharts from 'react-highcharts'
import { LangChartStore } from '../stores/LangChartStore'
import { NonLangStore } from '../stores/NonLangStore'

import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);

@observer
export default class LangChartNew extends React.Component {

    constructor(props) {
        super(props)
        const store = new LangChartStore
        this.state = store.getConfig()
    }

    getTopLanguages(data) {
        const nonLang = new NonLangStore().getConfig()
        return data
            | map('name')
            | reject(o => includes(o)(nonLang.lang))
            | take(10)
    }

    categories() {
        return range(12, 30)
            | map(y => range(1, 5)
                | map(q => y + "/Q" + q)
              )
            | flatten
            | drop(1)
    }

    percentageData(data) {
        const total = map(sum)(unzip(map('data')(data)))
        return map(update('data')(d => zipWith(divide)(d)(total)))(data)
    }

    createSeries(data) {
        const topLang = this.getTopLanguages(data)
        return data
            | filter(o => includes(o.name)(topLang))
            | map(d => ({
                name: d.name,
                data: map('count')(filter({'name': d.name})(data))
              }))
            | uniqBy('name')
            | sortBy('name')
    }

    static propTypes = {
        store: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        this.handler = autorun(() => {
            const data = this.props.store.getData
            const title = this.props.store.event | first | keys | first
            if (data.length > 1000 &&
                this.state.yAxis.title.text != title) {
                const series = data
                    | map(update('count')(Math.floor))
                    | this.createSeries
                    | this.percentageData

                const newState = {
                    ...this.state,
                    yAxis: {
                        ...this.state.yAxis, title: { text: title }
                    },
                    series: series,
                    xAxis: { categories: this.categories() }
                }

                if (!isEqual(this.state, newState))
                    this.setState(newState)
            }
        });
    }


    // render() {
        // return (<ReactHighcharts config={ this.state }/>)
    // }

 render() {

var xData = [
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]
];

var yData = [
  [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
  [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
  [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
  [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]
];

var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
  'rgba(189,189,189,1)'
];

var lineSize = [2, 2, 4, 2];

var labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

var data = [];

for ( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    x: xData[i],
    y: yData[i],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[i],
      width: lineSize[i]
    }
  };
  var result2 = {
    x: [xData[i][0], xData[i][11]],
    y: [yData[i][0], yData[i][11]],
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: colors[i],
      size: 12
    }
  };
  data.push(result, result2);
}

var layout = {
  showlegend: false,
  plot_bgcolor: 'rgba(0,0,0,0)',
  paper_bgcolor: 'rgba(0,0,0,0)',
  xaxis: {
    showline: true,
    showgrid: false,
    showticklabels: true,
    linecolor: 'rgb(204,204,204)',
    linewidth: 2,
    autotick: false,
    ticks: 'outside',
    tickcolor: 'rgb(204,204,204)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Arial',
      size: 12,
      color: 'rgb(82, 82, 82)'
    }
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  autosize: true,
  margin: {
    autoexpand: false,
    l: 100,
    r: 20,
    t: 100
  },
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      text: 'Source: Google Big Query Github Public Dataset',
      showarrow: false,
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(150,150,150)'
      }
    }
  ]
};

for ( var i = 0 ; i < xData.length ; i ++ ) {
  var result = {
    xref: 'paper',
    x: 0.05,
    y: yData[i][0],
    xanchor: 'right',
    yanchor: 'middle',
    text: labels[i] + ' ' + yData[i][0] +'%',
    showarrow: false,
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    }
  };
  var result2 = {
    xref: 'paper',
    x: 0.95,
    y: yData[i][11],
    xanchor: 'left',
    yanchor: 'middle',
    text: yData[i][11] +'%',
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    },
    showarrow: false
  };
  layout.annotations.push(result, result2);
}

let config = {
      showLink: false,
      displayModeBar: false
    };
    return (
      <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
    );
  }


}
