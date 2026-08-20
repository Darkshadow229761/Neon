import { useEffect, useRef, useState } from "react";

export default function NeonSnake() {
  const canvasRef = useRef(null);

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    const cell = 25;

    let snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];

    let direction = {
      x: 1,
      y: 0
    };

    let queued = {
      x: 1,
      y: 0
    };

    let food = spawnFood();

    let timer;

    function spawnFood() {
      return {
        x:
          Math.floor(
            Math.random() * 28
          ),
        y:
          Math.floor(
            Math.random() * 20
          )
      };
    }

    function keydown(event) {
      if (
        event.key === "ArrowUp" &&
        direction.y !== 1
      ) {
        queued = { x: 0, y: -1 };
      }

      if (
        event.key === "ArrowDown" &&
        direction.y !== -1
      ) {
        queued = { x: 0, y: 1 };
      }

      if (
        event.key === "ArrowLeft" &&
        direction.x !== 1
      ) {
        queued = { x: -1, y: 0 };
      }

      if (
        event.key === "ArrowRight" &&
        direction.x !== -1
      ) {
        queued = { x: 1, y: 0 };
      }
    }

    window.addEventListener(
      "keydown",
      keydown
    );

    function update() {
      direction = queued;

      const head = {
        x:
          snake[0].x +
          direction.x,

        y:
          snake[0].y +
          direction.y
      };

      const collision =
        head.x < 0 ||
        head.x >= 28 ||
        head.y < 0 ||
        head.y >= 20 ||
        snake.some(
          part =>
            part.x === head.x &&
            part.y === head.y
        );

      if (collision) {
        snake = [
          { x: 10, y: 10 },
          { x: 9, y: 10 },
          { x: 8, y: 10 }
        ];

        direction = {
          x: 1,
          y: 0
        };

        queued = {
          x: 1,
          y: 0
        };

        setScore(0);

        return;
      }

      snake.unshift(head);

      if (
        head.x === food.x &&
        head.y === food.y
      ) {
        setScore(
          value => value + 10
        );

        food = spawnFood();
      } else {
        snake.pop();
      }

      draw();
    }

    function draw() {
      ctx.fillStyle =
        "#03040a";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.strokeStyle =
        "rgba(0,234,255,.045)";

      for (
        let x = 0;
        x < canvas.width;
        x += cell
      ) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(
          x,
          canvas.height
        );
        ctx.stroke();
      }

      for (
        let y = 0;
        y < canvas.height;
        y += cell
      ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(
          canvas.width,
          y
        );
        ctx.stroke();
      }

      ctx.shadowBlur = 25;
      ctx.shadowColor =
        "#ff3c88";

      ctx.fillStyle =
        "#ff3c88";

      ctx.fillRect(
        food.x * cell + 5,
        food.y * cell + 5,
        cell - 10,
        cell - 10
      );

      snake.forEach(
        (part, index) => {
          ctx.shadowColor =
            "#00eaff";

          ctx.fillStyle =
            index === 0
              ? "#ffffff"
              : "#00eaff";

          ctx.fillRect(
            part.x * cell + 3,
            part.y * cell + 3,
            cell - 6,
            cell - 6
          );
        }
      );

      ctx.shadowBlur = 0;
    }

    draw();

    timer =
      setInterval(update, 105);

    return () => {
      clearInterval(timer);

      window.removeEventListener(
        "keydown",
        keydown
      );
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-hud">
        <span>
          SCORE {score}
        </span>

        <span>
          ARROWS TO MOVE
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width="700"
        height="500"
        className="play-canvas"
      />
    </div>
  );
}
