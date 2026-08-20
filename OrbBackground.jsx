import { useEffect, useRef } from "react";

export default function OrbBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animation;
    let particles = [];

    let mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particles = Array.from(
        { length: Math.min(180, Math.floor(window.innerWidth / 7)) },
        () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.2,
          speed: Math.random() * 0.35 + 0.05,
          alpha: Math.random() * 0.7 + 0.1
        })
      );
    }

    function moveMouse(event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function draw() {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const glow =
        ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          450
        );

      glow.addColorStop(
        0,
        "rgba(0,234,255,.09)"
      );

      glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
      );

      ctx.fillStyle = glow;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      for (const particle of particles) {
        particle.y += particle.speed;

        if (particle.y > canvas.height + 5) {
          particle.y = -5;
          particle.x =
            Math.random() * canvas.width;
        }

        const dx =
          particle.x - mouse.x;

        const dy =
          particle.y - mouse.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        const boost =
          distance < 250
            ? (1 - distance / 250) * 2
            : 0;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size + boost,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(150,235,255,${
            particle.alpha + boost * 0.15
          })`;

        ctx.fill();
      }

      animation =
        requestAnimationFrame(draw);
    }

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    window.addEventListener(
      "mousemove",
      moveMouse
    );

    draw();

    return () => {
      cancelAnimationFrame(animation);

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        moveMouse
      );
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="space-canvas"
      />

      <div className="hero-orb">
        <div className="orb-core" />
        <div className="orb-ring ring-one" />
        <div className="orb-ring ring-two" />
        <div className="orb-ring ring-three" />
      </div>

      <div className="noise" />
      <div className="vignette" />
    </>
  );
}
