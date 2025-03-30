"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const [showCursor, setShowCursor] = useState(false);

  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef();

  useEffect(() => {
    const cursorElement = cursorRef.current;
    const heroElement = heroRef.current;

    const handleMouseMove = (movement) => {
      const rect = heroElement.getBoundingClientRect();
      targetPos.current = {
        x: movement.clientX - rect.left,
        y: movement.clientY - rect.top,
      };
    };

    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    const animateCursor = () => {
      const lerpFactor = 0.1;

      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      currentPos.current.x += dx * lerpFactor;
      currentPos.current.y += dy * lerpFactor;

      cursorElement.style.left = `${currentPos.current.x}px`;
      cursorElement.style.top = `${currentPos.current.y}px`;

      animationFrameId.current = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <section
      onMouseOver={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      ref={heroRef}
      className={`relative pt-40 pb-20 px-4`}
    >
      <div
        ref={cursorRef}
        className={`absolute w-6 h-6 rounded-full bg-white mix-blend-difference ${
          showCursor ? "" : "hidden"
        }`}
      ></div>
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-driven financial management platform designed to help you
          monitor, evaluate, and improve your spending with real-time insights.
        </p>
        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-10 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
