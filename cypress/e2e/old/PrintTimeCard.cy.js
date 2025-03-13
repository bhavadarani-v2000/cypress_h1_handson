import { printTimeCard } from '../../support/BeforeEach_DeleteEntries';
describe('Expenses Page', () => {
  it('Expenses Claim Creation - All fields', function () {
    const excelFilePath = 'cypress/fixtures/PrintMITCard.xlsx';  // Path to the Excel file
    printTimeCard();
    cy.xpath("//a[@id='xdo:viewFormatLink']//img[2]").click();
    cy.xpath("//div[@id='_xdoFMenu6']//li[2]").click();
    cy.task('readExcelFile', { filePath: excelFilePath }).then((excelData) => {
      // Iterate through each row in the Excel data
      Object.keys(excelData).forEach((rowData, rowIndex) => {
        // Access the corresponding row in the table
        cy.get("tr[class^='row']").eq(rowIndex).within(() => {
          // Get all cells in the row and validate one by one
          const cellData = [
            rowData['Person Number'], // Column 1
            rowData['Name'],          // Column 2
            rowData['Date'],          // Column 3
            rowData['Month'],         // Column 4
            rowData['Reported Hours'],// Column 5
            rowData['Project'],       // Column 6
            rowData['Task'],          // Column 7
            rowData['Time Card Status'], // Column 8
          ];
          // Iterate through each cell in the row
          cellData.forEach((expectedValue, cellIndex) => {
            cy.get("td[class^='style78m']").eq(cellIndex).should('contain.text', expectedValue);
          });
        });
      });
    });
    });
});
