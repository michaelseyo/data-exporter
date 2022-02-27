import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function LineChart({data, options}) {
    return (
        <div style={{ width: 800 }}>
            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChart