import { useEffect, useRef, useState } from "react";

export default function NeonInvasion() {
  const canvasRef = useRef(null);

  const [score, setScore] =
    useState(0);

  useEffect(() => {
    const canvas =
      canvasRef.current;

    const ctx =
      canvas.getContext("2d");

    let player = {
      x: 400,
      y: 450
    };

    let keys = {};

    let bullets = [];
    let enemies = [];

    let spawnTimer = 0;

    function keydown(event) {
      keys[event.key] = true;

      if (
        event.code === "Space"
      ) {
        bullets.push({
          x: player.x,
          y: player.y - 20
        });
      }
    }

    function keyup(event) {
      keys[event.key] = false;
    }

    window.addEventListener(
      "keydown",
      keydown
    );

    window.addEventListener(
      "keyup",
      keyup
    );

    let animation;

    function loop() {
      if (keys.ArrowLeft)
        player.x -= 7;

      if (keys.ArrowRight)
        player.x += 7;

      player.x = Math.max(
        25,
        Math.min(775, player.x)
      );

      bullets.forEach(
        bullet =>
          (bullet.y -= 10)
      );

      bullets =
        bullets.filter(
          bullet =>
            bullet.y > -20
        );

      spawnTimer++;

      if (spawnTimer > 35) {
        enemies.push({
          x:
            Math.random() *
              740 +
            30,

          y: -20,

          speed:
            Math.random() * 2 +
            1.5
        });

        spawnTimer = 0;
      }

      enemies.forEach(
        enemy =>
          (enemy.y += enemy.speed)
      );

      for (
        let i =
          enemies.length - 1;
        i >= 0;
        i--
      ) {
        const enemy =
          enemies[i];

        let destroyed = false;

        for (
          let j =
            bullets.length - 1;
          j >= 0;
          j--
        ) {
          const bullet =
            bullets[j];

          if (
            Math.abs(
              enemy.x -
                bullet.x
            ) < 20 &&
            Math.abs(
              enemy.y -
                bullet.y
            ) < 20
          ) {
            enemies.splice(i, 1);

            bullets.splice(
              j,
              1
            );

            setScore(
              value => value + 10
            );

            destroyed = true;

            break;
          }
        }

        if (destroyed)
          continue;

        if (
          Math.abs(
            enemy.x -
              player.x
          ) < 28 &&
          Math.abs(
            enemy.y -
              player.y
          ) < 30
        ) {
          enemies = [];

          bullets = [];

          setScore(0);

          player.x = 400;
          player.y = 450;
        }

        if (enemy.y > 520) {
          enemies.splice(i, 1);
        }
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

      for (
        let i = 0;
        i < 90;
        i++
      ) {
        const x =
          (i * 137) % 800;

        const y =
          (i * 71 +
            Date.now() / 18) %
          500;

        ctx.fillStyle =
          "rgba(160,240,255,.45)";

        ctx.fillRect(
          x,
          y,
          2,
          2
        );
      }

      ctx.shadowBlur = 25;
      ctx.shadowColor =
        "#00eaff";

      ctx.fillStyle =
        "#00eaff";

      ctx.beginPath();

      ctx.moveTo(
        player.x,
        player.y - 25
      );

      ctx.lineTo(
        player.x - 22,
        player.y + 20
      );

      ctx.lineTo(
        player.x,
        player.y + 10
      );

      ctx.lineTo(
        player.x + 22,
        player.y + 20
      );

      ctx.closePath();

      ctx.fill();

      bullets.forEach(
        bullet => {
          ctx.fillStyle =
            "#ffffff";

          ctx.fillRect(
            bullet.x - 2,
            bullet.y,
            4,
            15
          );
        }
      );

      enemies.forEach(
        enemy => {
          ctx.shadowColor =
            "#ff3c88";

          ctx.fillStyle =
            "#ff3c88";

          ctx.beginPath();

          ctx.arc(
            enemy.x,
            enemy.y,
            15,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      );

      ctx.shadowBlur = 0;
    }

    loop();

    return () => {
      cancelAnimationFrame(animation);

      window.removeEventListener(
        "keydown",
        keydown
      );

      window.removeEventListener(
        "keyup",
        keyup
      );
    };
  }, []);

  return (
    <div className="game-container">
      <div className="game-hud">
        <span>SCORE {score}</span>

        <span>
          ← → MOVE / SPACE FIRE
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
