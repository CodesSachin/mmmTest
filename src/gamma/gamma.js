import React from 'react'

function Gamma() {
    let a
    let b = []
    const dataset = [
        { Ash: 1.2, Hue: 0.8, Magnesium: 2.5, Class: 1 },
        { Ash: 1.5, Hue: 0.9, Magnesium: 3.0, Class: 2 },
        { Ash: 1.3, Hue: 0.7, Magnesium: 2.7, Class: 3 },
        { Ash: 1.4, Hue: 0.6, Magnesium: 3.2, Class: 4 },

        // Add more data points as needed...
    ];

    function calculateGamma(dataPoint) {


        dataPoint?.map(item => {

            a = ((item.Ash * item.Hue) / item.Magnesium)

            b.push(a)

        })
        const { Ash, Hue, Magnesium } = dataPoint;
        return (Ash * Hue) / Magnesium;
    }

    calculateGamma(dataset)

    function calculateMean() {
        // Calculate the sum of all values in the array
        const sum = b.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        // Calculate the mean by dividing the sum by the number of values
        const mean = (sum / b.length).toFixed(3);
        return mean;
    }

    function calculateMedian() {
        // Sort the array in ascending order
        const sortedNumbers = b.sort((a, b) => a - b);

        const length = sortedNumbers.length;
        let median;

        // Check if the length of the array is even or odd
        if (length % 2 === 0) {
            // If the length is even, the median is the average of the middle two numbers
            const middleIndex1 = length / 2 - 1;
            const middleIndex2 = length / 2;
            median = ((sortedNumbers[middleIndex1] + sortedNumbers[middleIndex2]) / 2).toFixed(3);
        } else {
            // If the length is odd, the median is the middle number
            const middleIndex = Math.floor(length / 2);
            median = (sortedNumbers[middleIndex]).toFixed(3);
        }
        return median

    }

    function calculateMode() {
        // Create an object to store the count of each unique value
        const valueCount = {};

        // Iterate through the array and count the occurrences of each value
        for (const value of b) {
            if (valueCount[value]) {
                valueCount[value]++;
            } else {
                valueCount[value] = 1;
            }
        }
        let maxCount = 0;
        let modeValues = [];

        for (const value in valueCount) {
            if (valueCount[value] > maxCount) {
                maxCount = valueCount[value];
                modeValues = [parseFloat(value).toFixed(3)]; // Initialize modeValues as an array with the current value
            } else if (valueCount[value] === maxCount) {
                modeValues.push(parseFloat(value).toFixed(3)); // Add the value to modeValues if it has the same count as maxCount
            }
        }
        return modeValues
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Gama values</th>
                    {b.map(item => { return <td key={item}>{item.toFixed(3)}</td> })}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Mean</td>
                    <td>{calculateMean()}</td>
                </tr>
                <tr>
                    <td>Median</td>
                    <td>{calculateMedian()}</td>
                </tr>
                <tr>
                    <td>Mode</td>
                    <td>{calculateMode()}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Gamma