import { useState } from 'react';

const data = [1, 2, 3, 4, 2, 3, 4, 5, 5, 6, 7, 8, 6, 7, 8, 1];

const initialCards = data.map((num, i) => {
  return {
    id: i + 1,
    number: num,
  };
});

function App() {
  const [flipped1, setFlipped1] = useState(null);
  const [flipped2, setFlipped2] = useState(null);
  const [score, setScore] = useState(0);

  function handleFlip(flippedCard) {
    if (!flipped1 && !flipped2) {
      setFlipped1(flippedCard);
    } else {
      if (!flipped2 && flippedCard.id !== flipped1.id) setFlipped2(flippedCard);
    }
  }

  function handleScore() {
    if (flipped1 && flipped2) {
      if (flipped1.number === flipped2.number) {
        setScore((s) => s + 1);
      }
      setFlipped1(null);
      setFlipped2(null);
    }
  }
  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Find all the matching pairs of numbers!</p>
      <Score score={score} />
      <Board
        onFlip={handleFlip}
        flipped1={flipped1}
        flipped2={flipped2}
        cards={initialCards}
      />
      <Submit onSubmit={handleScore} />
    </div>
  );
}

function Board({ cards, onFlip, flipped1, flipped2 }) {
  return (
    <ul className="board">
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          onFlip={onFlip}
          flipped1={flipped1}
          flipped2={flipped2}
        />
      ))}
    </ul>
  );
}

function Card({ card, onFlip, flipped1, flipped2 }) {
  const isFlipped = flipped1?.id === card.id || flipped2?.id === card.id;

  return (
    <li>
      <button
        className={`card ${isFlipped ? 'flipped' : ''}`}
        onClick={() => onFlip(card)}
      >
        {isFlipped && <p>{card.number}</p>}
      </button>
    </li>
  );
}

function Score({ score }) {
  return (
    <div className="score">
      <p>Score: {score}</p>
    </div>
  );
}

function Submit({ onSubmit }) {
  return <button onClick={onSubmit}>Submit</button>;
}

export default App;
