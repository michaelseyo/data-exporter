import { API } from 'aws-amplify'
import React, { useState } from 'react'
import { Box, 
        Button, 
        Card, 
        CardHeader, 
        CardContent,
        Typography,
        Link,
        useMediaQuery } from '@mui/material';
import LineChart from './components/LineChart';
import { graduatesDataOptions, 
        differenceDataOptions, 
        getInstitutions, 
        filterPast5Years, 
        makeGraduatesChartParams,
        makeDifferenceChartParams, 
        getIntakeGraduatesDifference } from './Chart';
import { convertJsonToExcel } from './Excel';

const myAPI = "apicd72aa41";
const graduatesPath = '/data/graduates';
const intakePath = '/data/intake';

function App() {
  const [graduatesChartData, setGraduatesChartData] = useState({});
  const [graduatesData, setGraduatesData] = useState({});
  const [differenceChartData, setDifferenceChartData] = useState({});
  const [differenceData, setDifferenceData] = useState({});
  const [graduatesChartMade, setGraduatesChartMade] = useState(false);
  const [differenceChartMade, setDifferenceChartMade] = useState(false);

  const initCharts = async() => {
    const graduatesRes = await API.get(myAPI, graduatesPath);
    const institutions = getInstitutions(graduatesRes.data.fields);
    const graduatesRawData = graduatesRes.data.records;
    const filteredGraduatesData = filterPast5Years(graduatesRawData);
    setGraduatesData(filteredGraduatesData);
    const graduatesChartParams = makeGraduatesChartParams(filteredGraduatesData);
    console.log(graduatesChartParams.datasets);
    setGraduatesChartData(graduatesChartParams);
    setGraduatesChartMade(true);

    const intakeRes = await API.get(myAPI, intakePath);
    const intakeRawData = intakeRes.data.records;
    const filteredIntakeData = filterPast5Years(intakeRawData);
    const differenceData = getIntakeGraduatesDifference(institutions, filteredIntakeData, filteredGraduatesData);
    setDifferenceData(differenceData);
    const differenceChartParams = makeDifferenceChartParams(filteredIntakeData, filteredGraduatesData);
    setDifferenceChartData(differenceChartParams);
    setDifferenceChartMade(true);
  }
  
  return (
    <Box>
      <Card 
        variant="outlined"
        sx={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#F0F8FF",
          minWidth: 200
        }}
      >
        <CardHeader 
          title='Visualize and Export'
          subheader={
            <Link
              href='https://data.gov.sg/dataset/intake-enrolment-and-graduates-by-institutions?resource_id=be05b06d-1042-45de-a35b-5a5e04e7c704'
            >
              Source data
            </Link>
          }
          sx={{ 
            display: 'block', 
            textAlign: 'center'
          }}
        />
        <CardContent 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <Button onClick={initCharts}> Get Chart </Button>
          {graduatesChartMade && differenceChartMade && 
            <Button onClick={() => convertJsonToExcel(graduatesData, differenceData)}> 
              Export Root Data 
            </Button>
          }
        </CardContent>
      </Card>
      {graduatesChartMade && differenceChartMade && 
      <Box>
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <LineChart data={graduatesChartData} options={graduatesDataOptions}/>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 10
          }}
        >
          <LineChart data={differenceChartData} options={differenceDataOptions}/>
        </Box>
      </Box>
      }
    </Box>
  );
}

export default App;
