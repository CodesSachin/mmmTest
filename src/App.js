import GammaStatsTable from './gamma/gammaResult';
import StatisticsTable from './Flavanoids/fst';

function App() {
  const exampleDataset = [
    { Ash: 1.2, Hue: 0.8, Magnesium: 2.5, Class: 1 },
    { Ash: 1.5, Hue: 0.9, Magnesium: 3.0, Class: 1 },
    { Ash: 1.3, Hue: 0.7, Magnesium: 2.7, Class: 2 },
    { Ash: 1.4, Hue: 0.6, Magnesium: 3.2, Class: 2 },
    // Add more data points as needed...
  ];
  return (
    <>
      <div>Example A :- </div>
      <StatisticsTable />
      <br />
      <br />
      <div>Example b :- </div>
      <GammaStatsTable dataset={exampleDataset} />
    </>
  );
}

export default App;
