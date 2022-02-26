const axios = require('axios');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const res = await axios.get('https://data.gov.sg/api/action/datastore_search?resource_id=be05b06d-1042-45de-a35b-5a5e04e7c704');
    const data = res.data.result;
    console.log(data);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        }, 
        body: JSON.stringify({
            message: 'Retrieved graduate data',
            data: data
        }),
    };
};
