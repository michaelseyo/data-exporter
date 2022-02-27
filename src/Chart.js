const removeEmptyValues = (dataArray) => {
    const keys = Object.keys(dataArray[0]);
    for (let i = 0; i < dataArray.length; i++) {
        keys.forEach(key => {
            if (dataArray[i][key] === '-') {
                delete dataArray[i][key]
            }
        });
    }
    return dataArray;
}

const diploma = [
    'nafa_diploma', 
    'ngee_ann_polytechnic', 
    'temasek_polytechnic', 
    'nanyang_polytechnic', 
    'republic_polytechnic', 
    'singapore_polytechnic', 
    'lasalle_diploma'
]

const degree = [
    'lasalle_degree',
    'nafa_degree',
    'sit',
    'smu',
    'ntu',
    'nus',
    'sutd',
    'suss',
    'nie'
]

const getIteData = (rawData) => {
    return rawData.map((data) => data.ite);
}

const getDiplomaData = (rawData) => {
    return rawData.map((data) => {
        return Object.entries(data).reduce((total, pair) => {
            const [institution, value] = pair;
            if (diploma.includes(institution)) {
                return total + (+value);
            } else {
                return total;
            }
        }, 0);
    });
}

const getDegreeData = (rawData) => {
    return rawData.map((data) => {
        return Object.entries(data).reduce((total, pair) => {
            const [institution, value] = pair;
            if (degree.includes(institution)) {
                return total + (+value);
            } else {
                return total;
            }
        }, 0);
    });
}

const getDifferenceArray = (intakeData, graduatesData) => {
    let differenceData = [];
    for (let i = 0; i < intakeData.length; i++) {
        const diff = percentageDiff(intakeData[i], graduatesData[i]);
        differenceData.push(diff);
    }
    return differenceData;
}

const getIteDiffData = (intakeData, graduatesData) => {
    const iteIntakeData = getIteData(intakeData);
    const iteGraduatesData = getIteData(graduatesData);
    return getDifferenceArray(iteIntakeData, iteGraduatesData);
}

const getDiplomaDiffData = (intakeData, graduatesData) => {
    const diplomaIntakeData = getDiplomaData(intakeData);
    const diplomaGraduatesData = getDiplomaData(graduatesData);
    return getDifferenceArray(diplomaIntakeData, diplomaGraduatesData);
}

const getDegreeDiffData = (intakeData, graduatesData) => {
    const degreeIntakeData = getDegreeData(intakeData);
    const degreeGraduatesData = getDegreeData(graduatesData);
    return getDifferenceArray(degreeIntakeData, degreeGraduatesData);
}

const percentageDiff = (a, b) => {
    return roundTo2DP((Math.abs(a - b) / a) * 100);
}

const roundTo2DP = (num) => {
    return Math.round(num * 100) / 100;
}

export const graduatesDataOptions = {
    responsive: true,
    plugins: {
        title: {
        display: true,
        text: 'Number of graduates from the past 5 years across institutions'
        }
    }
}

export const differenceDataOptions = {
    responsive: true,
    plugins: {
        title: {
        display: true,
        text: 'Percentage of difference in number of intakes and graduates from the past 5 years across institutions'
        }
    }
}

export const getInstitutions = (dataArray) => {
    return dataArray.filter((data) => 
        data.id !== "_id" && 
        data.id !== "year" && 
        data.id !== "sex")
                    .map((data) => data.id);
}

export const filterPast5Years = (dataArray) => {
    const tempArr = dataArray.filter(data => data.year >= "2016")
                .filter(data => data.sex === "MF");
    const resultArr = removeEmptyValues(tempArr);
    return resultArr;
}

export const getIntakeGraduatesDifference = (institutions, intakeData, graduatesData) => {
    let differenceData = [];
    for (let i = 0; i < intakeData.length; i++) {
        let obj = {}
        institutions.forEach((institution) => {
            if (institution in intakeData[i] && institution in graduatesData[i]) {
                obj[institution] = percentageDiff(intakeData[i][institution], graduatesData[i][institution]);
            }
        });
        differenceData.push(obj);
    }
    return differenceData;
}

export const makeGraduatesChartParams = (rawData) => {
    return {
        labels: rawData.map((data) => data.year),
        datasets: [
            {
                label: "ITE",
                data: getIteData(rawData),
                borderColor: 'rgb(80, 220, 100)',
                backgroundColor: 'rgb(80, 220, 100)'
            },
            {
                label: "Diploma",
                data: getDiplomaData(rawData),
                borderColor: 'rgb(61, 183, 228)',
                backgroundColor: 'rgb(61, 183, 228)'
            },
            {
                label: "Degree",
                data: getDegreeData(rawData),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)'
            },
        ]
    }
}

export const makeDifferenceChartParams = (rawIntakeData, rawGraduatesData) => {
    return {
        labels: rawIntakeData.map((data) => data.year),
        datasets: [
            {
                label: "ITE",
                data: getIteDiffData(rawIntakeData, rawGraduatesData),
                borderColor: 'rgb(80, 220, 100)',
                backgroundColor: 'rgb(80, 220, 100)'
            },
            {
                label: "Diploma",
                data: getDiplomaDiffData(rawIntakeData, rawGraduatesData),
                borderColor: 'rgb(61, 183, 228)',
                backgroundColor: 'rgb(61, 183, 228)'
            },
            {
                label: "Degree",
                data: getDegreeDiffData(rawIntakeData, rawGraduatesData),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)'
            },
        ]
    }
}