import { useMemo, useState } from "react";

import GameCard from "../components/GameCard";

import NeonInvasion from "../games/NeonInvasion";
import NeonSnake from "../games/NeonSnake";
import Breakout from "../games/Breakout";
import NeonPong from "../games/NeonPong";
import ClickRush from "../games/ClickRush";
import MemoryMatrix from "../games/MemoryMatrix";

const games = [
  {
    id: "neon-invasion",
    title: "Neon Invasion",
    category: "ACTION",
    description:
      "Defend your ship from an endless neon fleet.",
    icon: "🚀",
    theme: "blue"
  },
  {
    id: "neon-snake",
    title: "Neon Snake",
    category: "CLASSIC",
    description:
      "Grow your snake without hitting the wall.",
    icon: "🐍",
    theme: "cyan"
  },
  {
    id: "breakout",
    title: "Breakout",
    category: "ARCADE",
    description:
      "Destroy every block before losing the ball.",
    icon: "🧱",
    theme: "purple"
  },
  {
    id: "neon-pong",
    title: "Neon Pong",
    category: "CLASSIC",
    description:
      "Beat the computer in futuristic Pong.",
    icon: "🏓",
    theme: "pink"
  },
  {
    id: "click-rush",
    title: "Click Rush",
    category: "REACTION",
    description:
      "Get as many clicks as possible in ten seconds.",
    icon: "⚡",
    theme: "yellow"
  },
  {
    id: "memory-matrix",
    title: "Memory Matrix",
    category: "PUZZLE",
    description:
      "Match every pair as quickly as possible.",
    icon: "🧠",
    theme: "green"
  }
];

export default function Games() {
  const [search, setSearch] =
    useState("");

  const [activeGame, setActiveGame] =
    useState(null);

  const filtered = useMemo(() => {
    const query =
      search.toLowerCase().trim();

    if (!query) return games;

    return games.filter(game =>
      `${game.title} ${game.category} ${game.description}`
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  if (activeGame) {
    return (
      <GameShell
        game={activeGame}
        onExit={() =>
          setActiveGame(null)
        }
      />
    );
  }

  return (
    <section className="games-page">

      <div className="games-header">
        <div>
          <span className="eyebrow">
            02 / LIBRARY
          </span>

          <h1>THE ARCADE</h1>

          <p>
            Choose your game.
            Enter the arena.
          </p>
        </div>

        <input
          className="search-input"
          value={search}
          onChange={event =>
            setSearch(event.target.value)
          }
          placeholder="Search games..."
        />
      </div>

      <div className="game-library">
        {filtered.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onPlay={setActiveGame}
          />
        ))}
      </div>

      {!filtered.length && (
        <div className="empty-state">
          NO GAMES FOUND
        </div>
      )}
    </section>
  );
}

function GameShell({
  game,
  onExit
}) {
  const gameMap = {
    "neon-invasion":
      NeonInvasion,

    "neon-snake":
      NeonSnake,

    breakout:
      Breakout,

    "neon-pong":
      NeonPong,

    "click-rush":
      ClickRush,

    "memory-matrix":
      MemoryMatrix
  };

  const Component =
    gameMap[game];

  return (
    <section className="game-page">

      <div className="game-topbar">

        <button
          className="secondary-button"
          onClick={onExit}
        >
          ← BACK
        </button>

        <div>
          <span className="game-category">
            {games.find(
              item => item.id === game
            )?.category}
          </span>

          <h2>
            {games.find(
              item => item.id === game
            )?.title}
          </h2>
        </div>

        <div />
      </div>

      <div className="game-stage">
        <Component />
      </div>

    </section>
  );
}
