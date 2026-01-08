"use client"
import React, { useState, useEffect, useRef } from 'react';

export default function BouncingBasketball({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [ballPos, setBallPos] = useState({ x: 200, y: 50 });
  const [velocity, setVelocity] = useState({ vx: 0, vy: 0 });
  const animationRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  
  const BALL_RADIUS = 20;
  const GRAVITY = 0.5;
  const BOUNCE_DAMPING = 0.7;
  const VELOCITY_THRESHOLD = 3.5;

  useEffect(() => {
    const animate = () => {
      setBallPos(prev => {
        const container : any= containerRef.current;
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
  }, [velocity]);

  const handleClick = (e : any) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setBallPos({ x, y });
    setVelocity({ vx: 0, vy: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      className="relative w-full bg-gradient-to-b from-blue-200 to-blue-100 cursor-pointer rounded-md"
      style={{ aspectRatio: '16/9' }}
    >
      {children}
      {/* Floor line 
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700"></div>
      */}
      {/* Basketball */}
      <div
        className="absolute rounded-full bg-[#fea903] border-2 border-orange-400 transition-none"
        style={{
          width: BALL_RADIUS * 2,
          height: BALL_RADIUS * 2,
          left: ballPos.x - BALL_RADIUS,
          top: ballPos.y - BALL_RADIUS,
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

      {/*
      <div className="absolute top-4 left-4 text-gray-700 text-sm">
        Click anywhere to move the ball
      </div>
      */}
    </div>
  );
}
