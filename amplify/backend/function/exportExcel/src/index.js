const XLSX = require('xlsx');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const graduatesWorksheet = XLSX.utils.json_to_sheet(event.body.graduatesJson);
  const differenceWorksheet = XLSX.utils.json_to_sheet(event.body.differenceJson);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, graduatesWorksheet, "graduates");
  XLSX.utils.book_append_sheet(workbook, differenceWorksheet, "intake_grad_percent_diff");
  XLSX.writeFile(workbook, "institutions_data.xlsx");
  console.log('export attempted');
  return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify('Exported data'),
  };
};
