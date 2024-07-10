function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

const data = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [5, 6, 7, 8],
  [6, 7, 8, 1],
];

function Board() {
  return (
    <>
      <h1>Memory Game</h1>
      <p>Find all the matching pairs of numbers!</p>
      <ul className="board">
        {data.map((row, i1) =>
          row.map((el, i2) => <Card key={[i1, i2]} number={el} />)
        )}
      </ul>
    </>
  );
}

function Card({ number }) {
  return <li className="card">{number}</li>;
}

export default App;
