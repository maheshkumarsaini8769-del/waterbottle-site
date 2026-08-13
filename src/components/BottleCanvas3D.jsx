import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Droplets } from 'lucide-react';

export default function BottleCanvas3D({ className = "w-full max-w-[450px] h-[580px] sm:h-[660px]" }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);
  const startXRef = useRef(0);
  const currentDragRef = useRef(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rotateY = ((x - centerX) / centerX) * 16;  // Max 16 deg tilt

    setRotate({ x: rotateX, y: rotateY });
    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });

    if (isDragging) {
      const deltaX = e.clientX - startXRef.current;
      setDragRotation(currentDragRef.current + deltaX * 0.15);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentDragRef.current = dragRotation;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    setRotate({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* Ambient Radial Backlight */}
      <div className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] bg-gradient-to-tr from-[#00aeef]/20 via-[#00658d]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D Floating Interactive Bottle Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        className={`relative flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform ${
          isHovered ? 'duration-100 ease-out' : 'duration-700 ease-out'
        }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y + dragRotation}deg) scale3d(${isHovered ? 1.03 : 1}, ${isHovered ? 1.03 : 1}, 1)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Real Photorealistic Bottle Image */}
        <div className="relative animate-float" style={{ transform: 'translateZ(40px)' }}>
          <img
            src={`${(import.meta.env.BASE_URL || '/')}bottle.png`}
            alt="Natural Mineral Water Bottle"
            draggable="false"
            className="h-[540px] sm:h-[640px] w-auto object-contain drop-shadow-[0_25px_40px_rgba(0,101,141,0.28)] select-none pointer-events-none"
          />

          {/* Dynamic Light Specular Reflection Layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-300 rounded-full"
            style={{
              background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)`,
              opacity: isHovered ? 0.8 : 0.2
            }}
          />
        </div>

        {/* Floating 3D Badge 1: 100% Recycled */}
        <div
          className="absolute -left-6 sm:-left-12 top-1/4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#bdc8d1] flex items-center gap-2 pointer-events-none transition-transform duration-300"
          style={{ transform: 'translateZ(65px)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
            ♻️
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#6e7881] uppercase tracking-wider">Eco Design</div>
            <div className="text-xs font-bold text-[#1a1c1c]">100% rPET</div>
          </div>
        </div>

        {/* Floating 3D Badge 2: Neutral pH 7.2 */}
        <div
          className="absolute -right-6 sm:-right-12 bottom-1/3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#bdc8d1] flex items-center gap-2 pointer-events-none transition-transform duration-300"
          style={{ transform: 'translateZ(75px)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#00aeef]/15 text-[#00658d] flex items-center justify-center font-bold text-xs">
            <Droplets className="w-4 h-4 text-[#00aeef]" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#6e7881] uppercase tracking-wider">Balanced</div>
            <div className="text-xs font-bold text-[#1a1c1c]">pH 7.2 Neutral</div>
          </div>
        </div>
      </div>

      {/* Subtle Hint */}
      <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[11px] font-semibold text-[#00658d] border border-[#bdc8d1] shadow-sm pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`}>
        ✨ Interactive 3D Parallax • Move cursor to tilt
      </div>
    </div>
  );
}
