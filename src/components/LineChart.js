import React from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

function LineChart({data}) {
    return (
        <div style={{ width: 800 }}>
            <Line data={data}/>
        </div>
    )
}

export default LineChart