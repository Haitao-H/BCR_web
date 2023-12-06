const {bcrData} = require('./dataModel');
const dbconnect = require('./dbConnect');
const XLSX = require('xlsx');
// const fs = require('fs');

// Function to read data from Excel file and save it to MongoDB
async function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const excelData = XLSX.utils.sheet_to_json(worksheet);

  for (const item of excelData) {
    // Extract all property
    const bcrDataInstance = new bcrData({
      ...item,
    });

    // Now you can use bcrDataInstance to save data to MongoDB or perform other operations
    try {
      await bcrDataInstance.save();
      console.log('Success Updated')
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }
}

// Specify the path to your Excel file
const excelFilePath = `./updates/file-${Date.now()}.xlsx`;

module.exports = {readExcel} ;


