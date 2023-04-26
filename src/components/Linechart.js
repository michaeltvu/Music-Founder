import React from "react";
import { Line } from "react-chartjs-2";
import './Linechart.css'

function Linechart({chartData}) {
    return(
        <div className="Linechart" style={{width: "400px"}}>
            {/* <h1>Stats</h1> */}
            <Line
                data={chartData}
                options= {{
                    plugins: {
                        legend: {
                          display: false
                        }
                    },
                    tooltips: {
                        callbacks: {
                           label: function(tooltipItem) {
                                  return tooltipItem.yLabel;
                           }
                        }
                    }
                }}
            />
        </div>
    )
}

export default Linechart;