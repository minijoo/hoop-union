"use client"
import React, { useState, useEffect, useRef } from 'react';

export default function BouncingBasketball({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ballPos, setBallPos] = useState({ x: 200, y: 50 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const [isDragging, setIsDragging] = useState(false);
<<<<<<< HEAD
  const animationRef = useRef(null);
=======
  const animationRef = useRef<number>(null);
>>>>>>> 3072b5a (api url fix)
  const containerRef = useRef<HTMLDivElement>(null);

  const BALL_RADIUS = 20;
  const GRAVITY = 0.5;
  const BOUNCE_DAMPING = 0.7;
  const VELOCITY_THRESHOLD = 3.5;

  useEffect(() => {
    if (isDragging) return; // Don't animate while dragging

    const animate = () => {
      setBallPos(prev => {
        const container = containerRef.current;
        if (!container) return prev;

        const containerHeight = container.clientHeight;
        const floor = containerHeight - BALL_RADIUS;

        let newY = prev.y + velocity.vy;
        let newVy = velocity.vy + GRAVITY;

        // Check if ball hits the floor
        if (newY >= floor) {
          newY = floor;

          // Only bounce if velocity is significant
          if (Math.abs(newVy) > VELOCITY_THRESHOLD) {
            newVy = -newVy * BOUNCE_DAMPING;
          } else {
            newVy = 0;
          }
        }

        setVelocity({ vx: 0, vy: newVy });

        return {
          x: prev.x,
          y: newY
        };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [velocity, isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if clicking on the ball
      const dx = x - ballPos.x;
      const dy = y - ballPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= BALL_RADIUS) {
        setIsDragging(true);
        setVelocity({ vx: 0, vy: 0 });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setBallPos({ x, y });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setVelocity({ vx: 0, vy: 0 });
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const dx = x - ballPos.x;
      const dy = y - ballPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= BALL_RADIUS) {
        setIsDragging(true);
        setVelocity({ vx: 0, vy: 0 });
      }
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const touch = e.touches[0];
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      setBallPos({ x, y });
    }
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      setVelocity({ vx: 0, vy: 0 });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full bg-linear-to-b from-blue-300 to-blue-200 cursor-pointer rounded-md"
    >
      {children}
      <div
        className="absolute rounded-full bg-[#fea903] border-2 border-orange-400 transition-none select-none"
        style={{
          width: BALL_RADIUS * 2,
          height: BALL_RADIUS * 2,
          left: ballPos.x - BALL_RADIUS,
          top: ballPos.y - BALL_RADIUS,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {/* Basketball lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-0.5 bg-orange-400"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-0.5 bg-orange-400"></div>
        </div>
      </div>

    </div>
  );
}
