import './Result.css';

function Result({ rolls, gameOver }) {
  const rollWord = rolls === 1 ? 'roll' : 'rolls';
  return (
    <div className="result-container" aria-live="polite">
      <p className={gameOver ? 'fade-in' : null}>
        You won in {rolls} {rollWord}!
      </p>
    </div>
  );
}

export default Result;
