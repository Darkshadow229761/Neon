import { useEffect, useRef, useState } from "react";

export default function NeonPong() {
  const canvasRef = useRef(null);

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    let player = 205;
    let ai = 205;

    let ball = {
      x: 400,
      y: 250,
      dx: 5,
      dy: 3
    };

    function keydown(event) {
      if (
        event.key === "ArrowUp"
      ) {
        player -= 28;
      }

      if (
        event.key === "ArrowDown"
      ) {
        player += 28;
      }

      player = Math.max(
        0,
        Math.min(410, player)
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
        ball.y < 8 ||
        ball.y > 492
      ) {
        ball.dy *= -1;
      }

      ai +=
        (ball.y -
          (ai + 45)) *
        0.075;

      if (
        ball.x < 55 &&
        ball.y > player &&
        ball.y < player + 90
      ) {
        ball.dx =
          Math.abs(ball.dx);

        setScore(
          value => value + 1
        );
      }

      if (
        ball.x > 745 &&
        ball.y > ai &&
        ball.y < ai + 90
      ) {
        ball.dx =
          -Math.abs(ball.dx);
      }

      if (ball.x < -20) {
        setScore(0);

        ball = {
          x: 400,
          y: 250,
          dx: 5,
          dy: 3
        };
      }

      if (ball.x > 820) {
        ball = {
          x: 400,
          y: 250,
          dx: -5,
          dy: 3
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

      ctx.setLineDash([
        10,
        15
      ]);

      ctx.strokeStyle =
        "rgba(0,234,255,.2)";

      ctx.beginPath();

      ctx.moveTo(400, 0);
      ctx.lineTo(400, 500);

      ctx.stroke();

      ctx.setLineDash([]);

      ctx.shadowBlur = 25;

      ctx.shadowColor =
        "#00eaff";

      ctx.fillStyle =
        "#00eaff";

      ctx.fillRect(
        25,
        player,
        12,
        90
      );

      ctx.shadowColor =
        "#ff3c88";

      ctx.fillStyle =
        "#ff3c88";

      ctx.fillRect(
        763,
        ai,
        12,
        90
      );

      ctx.shadowColor =
        "#ffffff";

      ctx.fillStyle =
        "#ffffff";

      ctx.beginPath();

      ctx.arc(
        ball.x,
        ball.y,
        9,
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
          ↑ ↓ TO MOVE
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
