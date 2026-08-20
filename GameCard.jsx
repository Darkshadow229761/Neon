export default function GameCard({
  game,
  onPlay
}) {
  return (
    <article
      className={`game-card ${game.theme}`}
    >
      <div className="game-art">
        <span>{game.icon}</span>
      </div>

      <div className="game-card-body">
        <span className="game-category">
          {game.category}
        </span>

        <h3>{game.title}</h3>

        <p>{game.description}</p>

        <button
          className="play-button"
          onClick={() => onPlay(game.id)}
        >
          PLAY GAME →
        </button>
      </div>
    </article>
  );
}
