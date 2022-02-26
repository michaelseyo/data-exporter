import Amplify, { API } from 'aws-amplify'
import React, { useEffect, useState } from 'react'

import { Box, Button, Card, CardHeader, CardContent } from '@mui/material';
import LineChart from './components/LineChart';

const myAPI = "apicd72aa41";
const path = '/data';

const filterPast5Years = (dataArray) => {
  return dataArray.filter(data => data.year >= "2016")
            .filter(data => data.sex === "MF");
}

const makeChartParams = (rawData) => {
  return {
      labels: rawData.map((data) => data.year),
      datasets: [
        {
          label: "ITE",
          data: rawData.map((data) => data.ite),
          borderColor: 'rgb(80, 220, 100)',
          backgroundColor: 'rgb(80, 220, 100)'
        },
        {
          label: "nafa-diploma",
          data: rawData.map((data) => data.nafa_diploma),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "ngee_ann_polytechnic",
          data: rawData.map((data) => data.ngee_ann_polytechnic),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "temasek_polytechnic",
          data: rawData.map((data) => data.temasek_polytechnic),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "nanyang_polytechnic",
          data: rawData.map((data) => data.nanyang_polytechnic),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "republic_polytechnic",
          data: rawData.map((data) => data.republic_polytechnic),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "singapore_polytechnic",
          data: rawData.map((data) => data.singapore_polytechnic),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "lasalle_diploma",
          data: rawData.map((data) => data.laselle_diploma),
          borderColor: 'rgb(61, 183, 228)',
          backgroundColor: 'rgb(61, 183, 228)'
        },
        {
          label: "lasalle_degree",
          data: rawData.map((data) => data.lasalle_degree),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "nafa_degree",
          data: rawData.map((data) => data.nafa_degree),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "sit",
          data: rawData.map((data) => data.sit),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "SMU",
          data: rawData.map((data) => data.smu),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "NTU",
          data: rawData.map((data) => data.ntu),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "NUS",
          data: rawData.map((data) => data.nus),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        }, 
        {
          label: "SUTD",
          data: rawData.map((data) => data.sutd),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "SUSS",
          data: rawData.map((data) => data.suss),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: "NIE",
          data: rawData.map((data) => data.nie),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(255, 99, 132)'
        }
      ]
    }
}

function App() {
  const [chartData, setChartData] = useState({});
  const [chartMade, setChartMade] = useState(false);

  const createChart = async () => {
    const res = await API.get(myAPI, path);
    const dataArray = res.data.records;
    console.log(dataArray);
    const filteredData = filterPast5Years(dataArray);
    const chartParams = makeChartParams(filteredData);
    setChartData(chartParams);
    setChartMade(true)
  }
  
  return (
    <Box>
      <Card 
        variant="outlined"
        sx={{
          margin: 30,
          padding: 5,
          backgroundColor: "#F0F8FF"
        }}
      >
        <CardHeader title="Data Exporter" sx={{ textAlign: 'center'}}/>
        <CardContent 
          sx={{
            display: 'flex', 
            justifyContent: 'center'
          }}
        >
          <Button onClick={createChart}> Get stuff </Button>
        </CardContent>
      </Card>
      <Box 
        sx={
          {
            display:'flex',
            justifyContent: 'center',
          }
        }
      >
        {chartMade && <LineChart data={chartData}/>}
      </Box>
    </Box>
  );
}

export default App;
