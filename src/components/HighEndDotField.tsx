import { useLayoutEffect, useRef } from "react";

// Minimalist, high-performance static dot grid that reacts to mouse proximity.
export default function HighEndDotField({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const GRID_SIZE = 40;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener("resize", resize);
    let hasMoved = false;
    window.addEventListener("mousemove", (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      if (!hasMoved) {
        mouseX = targetMouseX;
        mouseY = targetMouseY;
        hasMoved = true;
      }
    });
    resize();

    const draw = () => {
      ctx.fillStyle = isDark ? "#0D0D0D" : "#F7F5EE";
      ctx.fillRect(0, 0, width, height);
      
      if (!prefersReducedMotion) {
        mouseX += (targetMouseX - mouseX) * 0.15;
        mouseY += (targetMouseY - mouseY) * 0.15;
      } else {
        mouseX = targetMouseX;
        mouseY = targetMouseY;
      }

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * GRID_SIZE;
          const y = j * GRID_SIZE;
          
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 350;
          
          let size = isDark ? 1 : 1.5;
          let alpha = isDark ? 0.15 : 0.25;
          let r = isDark ? 255 : 0, g = isDark ? 255 : 0, b = isDark ? 255 : 0;
          
          if (dist < maxDist) {
            const intensity = Math.pow(1 - dist / maxDist, 2);
            size = (isDark ? 1 : 1.5) + intensity * 1.5; 
            alpha = (isDark ? 0.15 : 0.25) + intensity * (isDark ? 0.7 : 0.5);
            
            const targetR = 212, targetG = 162, targetB = 127;
            r = (isDark ? 255 : 0) - intensity * ((isDark ? 255 : 0) - targetR);
            g = (isDark ? 255 : 0) - intensity * ((isDark ? 255 : 0) - targetG);
            b = (isDark ? 255 : 0) - intensity * ((isDark ? 255 : 0) - targetB);
          }
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fill();
        }
      }
      
      const isMoving = Math.abs(targetMouseX - mouseX) > 0.1 || Math.abs(targetMouseY - mouseY) > 0.1;
      if ((!prefersReducedMotion && !isTouchDevice) || isMoving) {
        animationFrameId = requestAnimationFrame(draw);
      } else if (!isTouchDevice) {
        setTimeout(() => animationFrameId = requestAnimationFrame(draw), 100);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
