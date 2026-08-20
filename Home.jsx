const featured = [
  {
    id: "neon-invasion",
    title: "Neon Invasion",
    category: "ACTION",
    description:
      "Destroy the incoming fleet.",
    icon: "🚀",
    theme: "blue"
  },
  {
    id: "neon-snake",
    title: "Neon Snake",
    category: "CLASSIC",
    description:
      "Grow your snake and survive.",
    icon: "🐍",
    theme: "cyan"
  },
  {
    id: "breakout",
    title: "Breakout",
    category: "ARCADE",
    description:
      "Destroy every block.",
    icon: "🧱",
    theme: "purple"
  }
];

export default function Home({
  setPage,
  user
}) {
  return (
    <div>

      <section className="hero">
        <div className="hero-content">

          <span className="system-status">
            <i />
            SYSTEM ONLINE
          </span>

          <h1>
            ENTER THE
            <strong>PLAYVERSE</strong>
          </h1>

          <p>
            A cinematic browser arcade.
            No installation. No waiting.
            Just play.
          </p>

          <div className="hero-actions">
            <button
              className="primary-button"
              onClick={() =>
                setPage("games")
              }
            >
              PLAY NOW
              <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                document
                  .getElementById(
                    "featured"
                  )
                  ?.scrollIntoView({
                    behavior: "smooth"
                  })
              }
            >
              EXPLORE
            </button>
          </div>

          {user && (
            <div className="welcome-line">
              SESSION ACTIVE
            </div>
          )}
        </div>

        <div className="scroll-indicator">
          SCROLL TO EXPLORE
        </div>
      </section>

      <section
        id="featured"
        className="section"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              01 / ARCADE
            </span>

            <h2>
              Featured Games
            </h2>
          </div>

          <button
            className="text-button"
            onClick={() =>
              setPage("games")
            }
          >
            VIEW ALL →
          </button>
        </div>

        <div className="featured-grid">
          {featured.map(game => (
            <article
              key={game.id}
              className={`featured-card ${game.theme}`}
              onClick={() =>
                setPage("games")
              }
            >
              <div className="featured-icon">
                {game.icon}
              </div>

              <div>
                <span className="game-category">
                  {game.category}
                </span>

                <h3>{game.title}</h3>

                <p>
                  {game.description}
                </p>
              </div>

              <span className="card-arrow">
                →
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="stats">
        <div>
          <strong>06</strong>
          <span>PLAYABLE GAMES</span>
        </div>

        <div>
          <strong>∞</strong>
          <span>HIGH SCORES</span>
        </div>

        <div>
          <strong>100%</strong>
          <span>BROWSER</span>
        </div>

        <div>
          <strong>0₹</strong>
          <span>TO PLAY</span>
        </div>
      </section>
    </div>
  );
}
