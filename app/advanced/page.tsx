"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

const KANNADA_LETTERS = [
  {
    letter: "ಅ",
    image: "/images/kannada/Aa.png",
  },
  {
    letter: "ಆ",
    image: "/images/kannada/Aaa.png",
  },{
    letter: "ಇ",
    image: "/images/kannada/E.png",
  }
];

export default function AdvancedPage() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentLetter = KANNADA_LETTERS[currentLetterIndex];

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-[#FFE5E5] py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#FF69B4] mb-8">
          Write the Letter: {currentLetter.letter}
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Letter Image */}
          <div className="bg-[#FFE5E5] rounded-xl p-4">
            <img
              src={currentLetter.image}
              alt={`Letter ${currentLetter.letter}`}
              className="w-full h-auto rounded-lg"
            />
            <p className="text-4xl font-bold text-center mt-4 text-[#FF69B4]">
              {currentLetter.letter}
            </p>
          </div>

          {/* Drawing Area */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="border-4 border-[#FFB6C1] rounded-xl mx-auto bg-white"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={() => setIsDrawing(false)}
              onMouseLeave={() => setIsDrawing(false)}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentLetterIndex(Math.max(0, currentLetterIndex - 1))}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
            disabled={currentLetterIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={clearCanvas}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>

          <button
            onClick={() => setCurrentLetterIndex(Math.min(KANNADA_LETTERS.length - 1, currentLetterIndex + 1))}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
            disabled={currentLetterIndex === KANNADA_LETTERS.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}