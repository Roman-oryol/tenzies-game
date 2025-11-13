import './Die.css';

function Die({ value, isHeld, hold }) {
  const selectedClass = isHeld ? ' selected' : '';

  return (
    <button
      className={`die button${selectedClass}`}
      onClick={hold}
      aria-label={`Die with value ${value}, ${isHeld ? 'held' : 'not held'}`}
      aria-pressed={isHeld}
    >
      {value}
    </button>
  );
}

export default Die;
