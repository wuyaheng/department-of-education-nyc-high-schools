import React from "react";
import { Doughnut } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function BoroughChart(props) {
    console.log(props.results)

  const DoughnutChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#8d99ae",
        "#bac7be",
        "#a0ced9",
        "#cc8b86",
        "#f5cb5c"
      ];

    let options = {
      legend: {
        display: true,
        reverse: true
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        labels: {
          render: 'value',
          precision: 0,
          showZero: true,
          fontSize: 13,
          fontColor: '#fff',
          arc: false,
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Number of High Schools By Borough', 
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: false
          },
          gridLines: {
            display: false
          }
      }]
      }
    };

    props.results.forEach((ele) => {
      const key = ele[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });

    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Doughnut
          data={{
            labels: entries.map((x) => x[0]),
            datasets: [
              {
                data: entries.map((x) => x[1]), 
                backgroundColor: colorArray
              },
            ],
          }}
          options={options} 
        />
      );

  };



  return (
        <div>
          <DoughnutChart type="borough" />
        </div>
  );
}

export default BoroughChart;