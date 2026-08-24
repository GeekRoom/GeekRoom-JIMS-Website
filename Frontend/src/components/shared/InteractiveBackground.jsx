import { useEffect } from "react";

export default function InteractiveBackground() {
  useEffect(() => {
    const canvas = document.getElementById("halftone-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2, radius: 220 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      const cols = Math.ceil(width / 32);
      const rows = Math.ceil(height / 32);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * 32 + 16;
          const y = j * 32 + 16;
          const dist = Math.hypot(mouse.x - x, mouse.y - y);

          let radius = 2 + Math.sin(time + i * 0.2 + j * 0.2) * 1.5;

          // Dots swell dynamically near mouse cursor!
          if (dist < mouse.radius) {
            radius += (1 - dist / mouse.radius) * 5.5;
          }

          ctx.beginPath();
          ctx.arc(x, y, Math.min(radius, 8), 0, Math.PI * 2);
          ctx.fillStyle =
            (i + j) % 3 === 0
              ? `rgba(255, 107, 0, ${0.15 + radius / 18})`
              : `rgba(0, 240, 255, ${0.14 + radius / 18})`;
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas id="halftone-canvas" />
      <div className="bg-halftone-grid" />
      <div className="ambient-lights" />
    </>
  );
}
