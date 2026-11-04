"use client";
import React from "react";
import { cn } from "@/lib/utils";

export function NoiseBackground({
  children,
  containerClassName,
  gradientColors = [
    "rgba(255, 100, 150, 0.7)",
    "rgba(100, 150, 255, 0.7)",
    "rgba(255, 200, 100, 0.7)",
  ],
}: {
  children: React.ReactNode;
  containerClassName?: string;
  gradientColors?: string[];
}) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-full p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]", 
        containerClassName
      )}
    >
      {/* Animated Moving Lighting Background (Outer Border) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-80 blur-[3px] group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, ${gradientColors.join(", ")}, ${gradientColors[0]})`,
          animation: "spin 4s linear infinite",
        }}
      />
      
      {/* Inner layer for the double-bounded look */}
      <div className="relative z-10 h-full w-full rounded-full bg-[#0a0a0a] p-[1px]">
        {/* Core button background */}
        <div className="relative h-full w-full rounded-full bg-black/80 backdrop-blur-sm">
           {children}
        </div>
      </div>
    </div>
  );
}