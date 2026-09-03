import React, { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let animationFrame;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];

      const particleCount =
        window.innerWidth < 768 ? 45 : 90;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.5,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /* Background */
      ctx.fillStyle = "#050816";
      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /* Soft center glow */
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.35,
        0,
        canvas.width * 0.5,
        canvas.height * 0.35,
        canvas.width * 0.7
      );

      gradient.addColorStop(
        0,
        "rgba(30, 64, 175, 0.16)"
      );

      gradient.addColorStop(
        0.5,
        "rgba(15, 23, 42, 0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(5, 8, 22, 0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      /* Particles */
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width)
          particle.x = 0;

        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height)
          particle.y = 0;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(148, 163, 184, ${particle.opacity})`;

        ctx.fill();
      });

      animationFrame =
        requestAnimationFrame(draw);
    };

    resizeCanvas();
    createParticles();
    draw();

    window.addEventListener(
      "resize",
      () => {
        resizeCanvas();
        createParticles();
      }
    );

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener(
        "resize",
        resizeCanvas
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
};

export default AnimatedBackground;