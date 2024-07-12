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
  const [foundNums, setFoundNums] = useState([]);
  const youWin = foundNums.length * 2 === data.length;
  console.log(youWin);

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
        setFoundNums((nums) => [...nums, flipped1.number]);
      }
      setFlipped1(null);
      setFlipped2(null);
    }
  }

  function handleWin() {
    setFlipped1(null);
    setFlipped2(null);
    setScore(0);
    setFoundNums([]);
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Find all the matching pairs of numbers!</p>
      <Score score={score} youWin={youWin} onWin={handleWin} />
      <Board
        onFlip={handleFlip}
        flipped1={flipped1}
        flipped2={flipped2}
        cards={initialCards}
        foundNums={foundNums}
      />
      <Button onClick={handleScore}>Submit</Button>
    </div>
  );
}

function Board({ cards, onFlip, flipped1, flipped2, foundNums }) {
  return (
    <ul className="board">
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          onFlip={onFlip}
          flipped1={flipped1}
          flipped2={flipped2}
          foundNums={foundNums}
        />
      ))}
    </ul>
  );
}

function Card({ card, onFlip, flipped1, flipped2, foundNums }) {
  const isFlipped = flipped1?.id === card.id || flipped2?.id === card.id;
  const isFound = foundNums.includes(card.number);
  return (
    <li>
      <button
        className={`card ${isFlipped || isFound ? 'flipped' : ''}`}
        onClick={() => onFlip(card)}
        disabled={isFound}
      >
        {(isFlipped || isFound) && <p>{card.number}</p>}
      </button>
    </li>
  );
}

function Score({ score, youWin, onWin }) {
  return (
    <>
      {youWin && (
        <>
          <h2>You won!!!!</h2>
          <Button onClick={onWin}>Play Again</Button>{' '}
        </>
      )}
      <div className="score">
        <p>Score: {score}</p>
      </div>
    </>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

export default App;
