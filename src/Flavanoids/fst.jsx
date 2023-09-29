import React from 'react';

// Assuming you have your dataset as an array of objects
const dataset = [
  { Alcohol: 1, Flavanoids: 23 },
  { Alcohol: 3, Flavanoids: 3 },
  { Alcohol: 2, Flavanoids: 4 },
];

// Function to calculate the mean
function calculateMean(data) {
  let arra = data.map(item => { return item.Flavanoids });
  let a = 0;
  for (let i = 0; i < arra.length; i++) {
    a += arra[i];
  }
  return a;
}

// Function to calculate the median
function calculateMedian(data, property, classValue) {
  // Extract the "Alcohol" values
  const alcoholValues = dataset.map(item => item.Flavanoids);

  // Sort the values in ascending order
  alcoholValues.sort((a, b) => a - b);

  const n = alcoholValues.length;
  let median;

  if (n % 2 === 1) {
    // If the number of elements is odd, the median is the middle value
    const median = alcoholValues[Math.floor(n / 2)];
    return median
  } else {
    // If the number of elements is even, the median is the average of the two middle values
    const middle1 = alcoholValues[n / 2 - 1];
    const middle2 = alcoholValues[n / 2];
    median = (middle1 + middle2) / 2;
    return median
  }
  return median
}

// Function to calculate the mode
function calculateMode(data, property, classValue) {
  // Create an object to store the count of each unique Flavanoids value
  const flavanoidsCount = {};

  // Iterate through the dataset and count the occurrences of each Flavanoids value
  for (const entry of dataset) {
    const flavanoidsValue = entry.Flavanoids;
    if (flavanoidsCount[flavanoidsValue]) {
      flavanoidsCount[flavanoidsValue]++;
    } else {
      flavanoidsCount[flavanoidsValue] = 1;
    }
  }

  // Find the maximum count
  let maxCount = 0;
  let modeFlavanoids;

  for (const flavanoidsValue in flavanoidsCount) {
    if (flavanoidsCount[flavanoidsValue] > maxCount) {
      maxCount = flavanoidsCount[flavanoidsValue];
      modeFlavanoids = flavanoidsValue;
    }
  }
  return modeFlavanoids
}

// React Component
function StatisticsTable() {
  const classValues = [...new Set(dataset.map(item => item.Alcohol))];
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          {dataset.map(classValue => (
            <td key={classValue}>Class {classValue.Alcohol}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Values</td>
          {dataset.map(classValue => (
            <td key={classValue}>{classValue.Flavanoids}</td>
          ))}
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td>Mean</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMean(dataset, 'Flavanoids')}</td>
          ))}
        </tr>
        <tr>
          <td>Median</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMedian(dataset, 'Flavanoids', classValue)}</td>
          ))}
        </tr>
        <tr>
          <td>Mode</td>
          {classValues.map(classValue => (
            <td key={classValue}>{calculateMode(dataset, 'Flavanoids', classValue)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default StatisticsTable;
