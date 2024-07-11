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
  const [flipped1, setFlipped1] = useState(null);
  const [flipped2, setFlipped2] = useState(null);

  function handleFlip(flippedCard) {
    if (!flipped1) {
      setFlipped1(flippedCard);
    } else if (flipped1 && flipped1.id === flippedCard.id) {
      setFlipped1(null);
    } else if (!flipped2) {
      setFlipped2(flippedCard);
    } else if (flipped2 && flipped2.id === flippedCard.id) {
      setFlipped2(null);
    }
  }

  return (
    <ul className="board">
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          onFlip={handleFlip}
          flipped1={flipped1}
          flipped2={flipped2}
        />
      ))}
    </ul>
  );
}

function Card({ card, onFlip, flipped1, flipped2 }) {
  // const [flipped, setFlipped] = useState(null);

  // function handleFlipped() {
  //   setFlipped(card.id !== flipped ? card.id : null);
  // }

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

function Score() {
  const [score, setScore] = useState(0);

  // function handleScore() {
  //   if (flippedCards.length === 2) {
  //     if (flippedCards[0].number === flippedCards[1].number) {
  //       setScore((s) => s + 1);
  //     }
  //   }
  // }

  return (
    <div className="score">
      <p>Score: {score}</p>
      <p>Pairs left: X</p>
    </div>
  );
}

export default App;
