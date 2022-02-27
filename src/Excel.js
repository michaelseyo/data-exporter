import * as XLSX from "xlsx";

export const convertJsonToExcel = (graduatesJson, differenceJson) => {
    const graduatesWorksheet = XLSX.utils.json_to_sheet(graduatesJson);
    const differenceWorksheet = XLSX.utils.json_to_sheet(differenceJson);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, graduatesWorksheet, "graduates");
    XLSX.utils.book_append_sheet(workbook, differenceWorksheet, "intake_grad_percent_diff");
    XLSX.writeFile(workbook, "institutions_data.xlsx");
}
