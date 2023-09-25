import React, { Component } from 'react';

// Function to calculate "Gamma" for each data point
function calculateGamma(dataPoint) {
  const { Ash, Hue, Magnesium } = dataPoint;
  return (Ash * Hue) / Magnesium;
}

// Function to calculate mean, median, and mode for an array of numbers
function calculateStats(numbers) {
  const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;

  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedNumbers.length / 2);
  const median =
    sortedNumbers.length % 2 === 0
      ? (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2
      : sortedNumbers[middleIndex];

  const counts = {};
  let maxCount = 0;
  let mode = null;

  for (const number of sortedNumbers) {
    counts[number] = (counts[number] || 0) + 1;
    if (counts[number] > maxCount) {
      maxCount = counts[number];
      mode = number;
    }
  }

  return { mean, median, mode };
}

class GammaStatsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classWiseGamma: {},
    };
  }

  componentDidMount() {
    const { dataset } = this.props;
    const uniqueClasses = Array.from(new Set(dataset?.map(item => item.Class)));
    const classWiseGamma = {};

    // Calculate Gamma for each point and organize by class
    uniqueClasses.forEach(className => {
      const classData = dataset.filter(item => item.Class === className);
      const gammaValues = classData?.map(calculateGamma);
      const stats = calculateStats(gammaValues);

      classWiseGamma[className] = stats;
    });

    this.setState({ classWiseGamma });
  }

  render() {
    const { classWiseGamma } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(classWiseGamma)?.map(className => (
              <th key={className}>Class {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {Object.keys(classWiseGamma)?.map(className => (
              <td key={className}>{classWiseGamma[className].mean.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.keys(classWiseGamma)?.map(className => (
              <td key={className}>{classWiseGamma[className].median.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.keys(classWiseGamma)?.map(className => (
              <td key={className}>{classWiseGamma[className].mode.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default GammaStatsTable;
