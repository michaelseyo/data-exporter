# Data Vizualizer and Exporter

## Check it out [here](https://main.d5vi1ih95sfe3.amplifyapp.com)

The app is hosted on [AWS Amplify](https://docs.amplify.aws).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
This is a serverless application that retrieves [this dataset](https://data.gov.sg/dataset/intake-enrolmentandgraduates-by-institutions?resource_id=be05b06d-1042-45de-a35b-5a5e04e7c704) by accessing AWS Lambda functions and produces data vizualizations after processing the data. The root data before manipulation for plotting the charts can be downloaded into an excel file. 

## Tech used:
- AWS Amplify
- AWS Lambda 
- Reactjs 
- Node

I used `AWS Amplify` to set up the directories and its CLI for setting up a simple API making use of `AWS Lambda` functions to get the various data from the dataset.

The frontend was made using `Reactjs`. UI was designed using some CSS and the react UI library `MUI` for components.

Charts were made using `Chartjs` library. 

To handle the excel file, I used the `xlsx` js library.

To run locally:
```
1. Clone the repo locally
2. Run `npm install`
3. Run `npm start`
```

## Challenges
Setting up was difficult as this was my first time making use of `AWS Lambda` functions to create a serverless app, but luckily there was `AWS Amplify` to help to ease the process. 

I initially also faced difficulty in determining what type of chart I should plot out. To plot the trend of the number of graduates from the past 5 years across institutions, I settled on using a line chart since time is a continuous variable. However, the root data that I used before manipulation contained many different institutions and when I plotted all of them, the line chart was too cluttered. Furthermore, the scale wasn't very good because of the large range of numbers.

I realised that to make a fairer comparison, since the data for ITE institution were combined into the 3 different campuses (ITE College West/East/Central), it would be better to combine the different institutions into the 3 qualifications: ITE, Diploma, Degree. This reduced the number of lines to be plotted and also made comparison fairer.

When querying the data, it was quite difficult as it was in an array of javascript objects. I had to use numerous for loops and array methods like map, filter, reduce, includes, to query the data accordingly as queries were not so straightforward. In hindsight, it may have been better to use a dataframe that exist in pandas in Python or using R's tidyverse/dplyr, so that the querying process would be easier.

## Interesting points

Initially, I was quite curious why when I got the difference between the number of graduates and the number of intakes for a particular year, it was negative, since intakes should be more than graduates. But that's when I realise that the dataset collected had some notes, like NIE figures were for Diplomas and Post-graduate Diplomas in education-related subjects, but those taking a degree in Education (BA/BSc) is included under NTU. Thus, there were some discrepancies. So I just decided to take the absolute value instead but it would not be the most accurate representation.

The negative values was also due to the fact that the query was also more complicated than I thought. The year of the number of graduates meant that, this cohort of graduates intake year was not the same. For a degree assuming 4 years, it meant that for a cohort graduating in year of 2020 is an intake year of 2016, and some may even enter earlier or later and graduated at that year. To get a query of the particular cohort would require many considerations: ITE and Diplomas also differ as they are typically 2 and 3 years respectively.