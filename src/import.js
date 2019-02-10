/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const inputFilePath = path.join(__dirname, '..', 'db', 'lab_database.csv');

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', data => {
    try {
      console.log(`Case Number is: ${data.caseNum}`);
      console.log(`Date is: ${data.date}`);
    } catch (err) {
      console.log('Cant read entry');
    }
  })
  .on('end', () => {});
