import { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './Die';
import Result from './Result';
import './App.css';

function App() {
  const [allDice, setAllDice] = useState(() => generateAllNewDice());
  const [rollsCount, setRollsCount] = useState(0);
  const newGameButton = useRef(null);
  const gameWon = allDice.every(
    (dice) => dice.isHeld && dice.value === allDice[0].value
  );

  useEffect(() => {
    if (gameWon) {
      newGameButton.current.focus({ focusVisible: true });
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return Array(10)
      .fill(0)
      .map(() => ({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      }));
  }

  function hold(id) {
    function getNewAllDice(oldDice) {
      const newAllDice = oldDice.map((diceObj) => {
        if (diceObj.id === id) {
          return {
            ...diceObj,
            isHeld: !diceObj.isHeld,
          };
        }

        return diceObj;
      });

      return newAllDice;
    }

    setAllDice(getNewAllDice);
  }

  function handleRollDice() {
    if (gameWon) {
      setAllDice(generateAllNewDice());
      return;
    }

    function getNewDice(oldDice) {
      return oldDice.map((diceObj) =>
        diceObj.isHeld
          ? diceObj
          : {
              ...diceObj,
              value: Math.floor(Math.random() * 6) + 1,
            }
      );
    }

    setRollsCount((prevCount) => (prevCount += 1));
    setAllDice(getNewDice);
  }

  const diceElements = allDice.map((dieObj) => (
    <Die key={dieObj.id} {...dieObj} hold={() => hold(dieObj.id)} />
  ));

  return (
    <>
      {gameWon && <Confetti />}
      <main>
        <Result rolls={rollsCount} gameOver={gameWon} />
        <div className="sr-only" aria-live="polite">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button
          className="button-roll button"
          onClick={handleRollDice}
          ref={newGameButton}
        >
          {gameWon ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  );
}

export default App;
