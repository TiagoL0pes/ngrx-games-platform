const fs = require('fs');
const path = require('path');

const fileName = "../db.json";
const filePath = path.join(__dirname, fileName);

const { initialData } = require('../model');

const getDataFromFile = () => {
  let games;

  if (fs.existsSync(filePath)) {
    const result = fs.readFileSync(filePath, 'utf8', (err, data) => games = err ? [] : data);
    try {
      games = JSON.parse(result);
    } catch (err) {
      games = [];
    }
  } else {
    games = initialData;
  }

  return games;
}

const saveDataToFile = async (data) => {
  let response;

  if (fs.existsSync(filePath)) {
    const oldData = await getDataFromFile();
    response = data ? [...oldData, data] : oldData;
    const json = JSON.stringify(response);

    fs.writeFile(filePath, json, err => {
      if (err) {
        console.error('Error appending to file.')
      } else {
        console.log('Data successfully appended to file')
      }
    })
  } else {
    response = data ? [...initialData, data] : initialData;
    const json = JSON.stringify(response)
    fs.writeFile(filePath, json, (err) => {
      if (err) {
        console.error('Error creating to file.')
      } else {
        console.log('File successfully created')
      }
    });
  }

  return response;
}

module.exports = {
  getDataFromFile,
  saveDataToFile
};
