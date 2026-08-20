import { useMemo, useState } from "react";

const symbols = [
  "🚀",
  "⚡",
  "👾",
  "🔥",
  "💎",
  "⭐",
  "🌙",
  "🎮"
];

function shuffled() {
  return [
    ...symbols,
    ...symbols
  ].sort(
    () => Math.random() - 0.5
  );
}

export default function MemoryMatrix() {
  const [cards, setCards] =
    useState(shuffled);

  const [first, setFirst] =
    useState(null);

  const [lock, setLock] =
    useState(false);

  const [matched, setMatched] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [moves, setMoves] =
    useState(0);

  function choose(index) {
    if (
      lock ||
      matched.includes(index) ||
      first === index
    ) {
      return;
    }

    setMoves(
      value => value + 1
    );

    if (first === null) {
      setFirst(index);
      return;
    }

    const firstSymbol =
      cards[first];

    const secondSymbol =
      cards[index];

    if (
      firstSymbol === secondSymbol
    ) {
      setMatched(
        value => [
          ...value,
          first,
          index
        ]
      );

      setScore(
        value => value + 10
      );

      setFirst(null);
      return;
    }

    setLock(true);

    setTimeout(() => {
      setFirst(null);
      setLock(false);
    }, 650);
  }

  function reset() {
    setCards(shuffled());
    setFirst(null);
    setLock(false);
    setMatched([]);
    setScore(0);
    setMoves(0);
  }

  const complete =
    matched.length === 16;

  return (
    <div className="memory-game">

      <div className="game-hud">
        <span>
          SCORE {score}
        </span>

        <span>
          MOVES {moves}
        </span>
      </div>

      <div className="memory-grid">
        {cards.map(
          (symbol, index) => {
            const visible =
              first === index ||
              matched.includes(index);

            return (
              <button
                key={index}
                className={
                  visible
                    ? "memory-card visible"
                    : "memory-card"
                }
                onClick={() =>
                  choose(index)
                }
              >
                {visible
                  ? symbol
                  : "?"}
              </button>
            );
          }
        )}
      </div>

      {complete && (
        <div className="complete-message">
          MATRIX CLEARED — {score} POINTS
        </div>
      )}

      <button
        className="secondary-button"
        onClick={reset}
      >
        RESET MATRIX
      </button>
    </div>
  );
}
