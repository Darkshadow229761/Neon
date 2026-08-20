import { useEffect, useRef, useState } from "react";

export default function Breakout() {
  const canvasRef = useRef(null);

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    let paddle = 350;

    let ball = {
      x: 400,
      y: 440,
      dx: 4,
      dy: -4
    };

    let bricks = [];

    for (
      let row = 0;
      row < 5;
      row++
    ) {
      for (
        let col = 0;
        col < 10;
        col++
      ) {
        bricks.push({
          x: col * 78 + 10,
          y: row * 35 + 35,
          width: 68,
          height: 23,
          alive: true
        });
      }
    }

    function keydown(event) {
      if (
        event.key === "ArrowLeft"
      ) {
        paddle -= 30;
      }

      if (
        event.key === "ArrowRight"
      ) {
        paddle += 30;
      }

      paddle = Math.max(
        0,
        Math.min(700, paddle)
      );
    }

    window.addEventListener(
      "keydown",
      keydown
    );

    let animation;

    function loop() {
      ball.x += ball.dx;
      ball.y += ball.dy;

      if (
        ball.x < 8 ||
        ball.x > 792
      ) {
        ball.dx *= -1;
      }

      if (ball.y < 8) {
        ball.dy *= -1;
      }

      if (
        ball.y > 440 &&
        ball.x > paddle &&
        ball.x < paddle + 100
      ) {
        ball.dy =
          -Math.abs(ball.dy);
      }

      for (const brick of bricks) {
        if (!brick.alive) continue;

        if (
          ball.x > brick.x &&
          ball.x <
            brick.x + brick.width &&
          ball.y > brick.y &&
          ball.y <
            brick.y + brick.height
        ) {
          brick.alive = false;
          ball.dy *= -1;

          setScore(
            value => value + 10
          );

          break;
        }
      }

      if (
        bricks.every(
          brick => !brick.alive
        )
      ) {
        bricks.forEach(
          brick =>
            (brick.alive = true)
        );

        ball = {
          x: 400,
          y: 440,
          dx: 4,
          dy: -4
        };
      }

      if (ball.y > 510) {
        setScore(0);

        ball = {
          x: 400,
          y: 440,
          dx: 4,
          dy: -4
        };
      }

      draw();

      animation =
        requestAnimationFrame(loop);
    }

    function draw() {
      ctx.fillStyle =
        "#03040a";

      ctx.fillRect(
        0,
        0,
        800,
        500
      );

      bricks.forEach(
        (brick, index) => {
          if (!brick.alive)
            return;

          ctx.shadowBlur = 12;

          ctx.shadowColor =
            index % 2
              ? "#7657ff"
              : "#00eaff";

          ctx.fillStyle =
            index % 2
              ? "#7657ff"
              : "#00eaff";

          ctx.fillRect(
            brick.x,
            brick.y,
            brick.width,
            brick.height
          );
        }
      );

      ctx.shadowColor =
        "#00eaff";

      ctx.fillStyle =
        "#00eaff";

      ctx.fillRect(
        paddle,
        470,
        100,
        12
      );

      ctx.shadowColor =
        "#ffffff";

      ctx.fillStyle =
        "#ffffff";

      ctx.beginPath();

      ctx.arc(
        ball.x,
        ball.y,
        8,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.shadowBlur = 0;
    }

    loop();

    return () => {
      cancelAnimationFrame(animation);

      window.removeEventListener(
        "keydown",
        keydown
      );
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-hud">
        <span>SCORE {score}</span>
        <span>
          ← → TO MOVE
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width="800"
        height="500"
        className="play-canvas"
      />
    </div>
  );
}
