import React from 'react';

// Assuming you have your dataset as an array of objects
const dataset = [
  { Alcohol: 1, Flavanoids: 20 },
  { Alcohol: 1, Flavanoids: 0 },
  { Alcohol: 2, Flavanoids: 4 },
];

// Function to calculate the mean
function calculateMean(data, property, classValue) {
  const filteredData = data.filter(item => item.Alcohol === classValue);
  const sum = filteredData.reduce((accumulator, item) => accumulator + item[property], 0);
  return sum / filteredData.length;
}

// Function to calculate the median
function calculateMedian(data, property, classValue) {
  const filteredData = data.filter(item => item.Alcohol === classValue);
  const sortedData = filteredData.map(item => item[property]).sort((a, b) => a - b);
  const middle = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    return (sortedData[middle - 1] + sortedData[middle]) / 2;
  } else {
    return sortedData[middle];
  }
}

// Function to calculate the mode
function calculateMode(data, property, classValue) {
  const filteredData = data.filter(item => item.Alcohol === classValue);
  const counts = {};
  let mode = null;
  let maxCount = 0;

  filteredData.forEach(item => {
    const value = item[property];
    counts[value] = (counts[value] || 0) + 1;

    if (counts[value] > maxCount) {
      maxCount = counts[value];
      mode = value;
    }
  });

  return mode;
}

// React Component
function StatisticsTable() {
  const classValues = [...new Set(dataset.map(item => item.Alcohol))];

  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {classValues.map(classValue => (
            <th key={classValue}>Class {classValue}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Flavanoids Mean</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMean(dataset, 'Flavanoids', classValue)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Median</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMedian(dataset, 'Flavanoids', classValue)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids Mode</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMode(dataset, 'Flavanoids', classValue)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default StatisticsTable;
