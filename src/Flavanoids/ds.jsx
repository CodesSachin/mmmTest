// Function to calculate mean
function calculateMean(data, className) {
    const filteredData = data.filter(item => item['Class'] === className);
    const sum = filteredData.reduce((acc, item) => acc + item['Flavanoids'], 0);
    return sum / filteredData.length;
}

export default calculateMean

// Function to calculate median
export function calculateMedian(data, className) {
    const filteredData = data.filter(item => item['Class'] === className);
    const sortedData = filteredData.map(item => item['Flavanoids']).sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
        return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
        return sortedData[middle];
    }
}

// Function to calculate mode
export function calculateMode(data, className) {
    const filteredData = data.filter(item => item['Class'] === className);
    const counts = {};
    let maxCount = 0;
    let mode = null;

    filteredData.forEach(item => {
        const flavanoidValue = item['Flavanoids'];
        counts[flavanoidValue] = (counts[flavanoidValue] || 0) + 1;
        if (counts[flavanoidValue] > maxCount) {
            maxCount = counts[flavanoidValue];
            mode = flavanoidValue;
        }
    });

    return mode;
}

// Now, you can use these functions to calculate mean, median, and mode for each class.
