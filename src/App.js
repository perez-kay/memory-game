import { useState } from 'react';

const data = [1, 2, 3, 4, 2, 3, 4, 5, 5, 6, 7, 8, 6, 7, 8, 1];

const initialCards = data.map((num, i) => {
  return {
    id: i + 1,
    number: num,
  };
});

function App() {
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Find all the matching pairs of numbers!</p>
      <Score />
      <Board cards={initialCards} />
    </div>
  );
}

function Board({ cards }) {
  return (
    <ul className="board">
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </ul>
  );
}

function Card({ card }) {
  const [flipped, setFlipped] = useState(null);
  return (
    <li>
      <button
        className={`card ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped(card.id !== flipped ? card.id : null)}
      >
        {flipped && <p>{card.number}</p>}
      </button>
    </li>
  );
}

function Score() {
  return (
    <div className="score">
      <p>Score: X</p>
      <p>Pairs left: X</p>
    </div>
  );
}

export default App;
