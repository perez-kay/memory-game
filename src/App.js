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
    // no cards flipped
    if (!flipped1 && !flipped2) {
      setFlipped1(flippedCard);
      // card 1 flipped but you want to unflip it
      // } else if (flipped1 && flipped1.id === flippedCard.id) {
      //   setFlipped1(null);
    } else {
      if (!flipped2 && flippedCard.id !== flipped1.id) setFlipped2(flippedCard);
      // } else if (flipped2 && flipped2.id === flippedCard.id) {
      //   setFlipped2(null);
      // }
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
      <Board
        onFlip={handleFlip}
        flipped1={flipped1}
        flipped2={flipped2}
        cards={initialCards}
      />
      <Score onSubmit={handleScore} score={score} />
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

function Score({ score, onSubmit }) {
  // function handleScore() {
  //   if (flippedCards.length === 2) {
  //     if (flippedCards[0].number === flippedCards[1].number) {
  //       setScore((s) => s + 1);
  //     }
  //   }
  // }

  return (
    <>
      <div className="score">
        <p>Score: {score}</p>
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
}

export default App;
