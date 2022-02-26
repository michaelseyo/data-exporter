const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const res = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=2264a6ed-51f5-45d6-accb-1a980e32e632');
    const graduatesData = res.data.result;
    console.log(graduatesData);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify({
            message: 'Retrieved graduate data',
            data: graduatesData
        }),
    };
};
