"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, RefreshCw, CheckCircle } from "lucide-react";

const KANNADA_LETTERS = [
  { letter: "ಅ", path: "svaragalu1" },
  { letter: "ಆ", path: "svaragalu2" },
  { letter: "ಇ", path: "svaragalu3" },
  { letter: "ಈ", path: "svaragalu4" },
  { letter: "ಉ", path: "svaragalu5" },
  { letter: "ಊ", path: "svaragalu6" },
  { letter: "ಋ", path: "svaragalu7" },
  { letter: "ಎ", path: "svaragalu8" },
  { letter: "ಏ", path: "svaragalu9" },
  { letter: "ಐ", path: "svaragalu10" },
  { letter: "ಒ", path: "svaragalu11" },
  { letter: "ಓ", path: "svaragalu12" },
  { letter: "ಔ", path: "svaragalu13" },
  { letter: "ಅಂ", path: "svaragalu14" },
  { letter: "ಅಃ", path: "svaragalu15" }
];

const STROKE_WIDTH = 10;
const SAMPLE_DISTANCE = 5;

export default function LearnLetterClient({ svaragalu }: { svaragalu: string }) {
  const router = useRouter();
  const currentLetterIndex = KANNADA_LETTERS.findIndex((l) => l.path === svaragalu);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [userPath, setUserPath] = useState<Array<{ x: number; y: number }>>([]);
  const [letterPathPoints, setLetterPathPoints] = useState<Array<{ x: number; y: number }>>([]);

  const currentLetter = KANNADA_LETTERS[currentLetterIndex];

  useEffect(() => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const ctx = canvas.getContext("2d");
    const maskCtx = maskCanvas.getContext("2d");
    if (!ctx || !maskCtx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

    ctx.font = "200px Arial";
    ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentLetter.letter, canvas.width / 2, canvas.height / 2);

    maskCtx.font = "200px Arial";
    maskCtx.strokeStyle = "white";
    maskCtx.lineWidth = STROKE_WIDTH;
    maskCtx.textAlign = "center";
    maskCtx.textBaseline = "middle";
    maskCtx.strokeText(currentLetter.letter, maskCanvas.width / 2, maskCanvas.height / 2);

    const pathPoints: Array<{ x: number; y: number }> = [];
    const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height);
    const data = imageData.data;

    for (let y = 0; y < maskCanvas.height; y += SAMPLE_DISTANCE) {
      for (let x = 0; x < maskCanvas.width; x += SAMPLE_DISTANCE) {
        const index = (y * maskCanvas.width + x) * 4;
        if (data[index] > 200) {
          pathPoints.push({ x, y });
        }
      }
    }

    setLetterPathPoints(pathPoints);
    setUserPath([]);
    setAccuracy(null);
  }, [currentLetter]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 5;
    setUserPath([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lastPoint = userPath[userPath.length - 1];
    const dx = x - lastPoint.x;
    const dy = y - lastPoint.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(Math.floor(distance / SAMPLE_DISTANCE), 1);

    const newPoints: { x: number; y: number }[] = [];
    for (let i = 1; i <= steps; i++) {
      newPoints.push({
        x: lastPoint.x + (dx * i) / steps,
        y: lastPoint.y + (dy * i) / steps
      });
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    setUserPath((prev) => [...prev, ...newPoints]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const checkAccuracy = () => {
    if (userPath.length < 2 || letterPathPoints.length === 0) {
      setAccuracy(0);
      return;
    }

    let correctPoints = 0;
    const tolerance = STROKE_WIDTH / 2;

    userPath.forEach(userPoint => {
      for (const pathPoint of letterPathPoints) {
        const distance = Math.sqrt(
          Math.pow(userPoint.x - pathPoint.x, 2) + 
          Math.pow(userPoint.y - pathPoint.y, 2)
        );
        if (distance <= tolerance) {
          correctPoints++;
          break;
        }
      }
    });

    const accuracyScore = Math.round((correctPoints / letterPathPoints.length) * 100);
    setAccuracy(Math.min(100, accuracyScore));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "200px Arial";
    ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(currentLetter.letter, canvas.width / 2, canvas.height / 2);

    setUserPath([]);
    setAccuracy(null);
  };

  return (
    <div className="min-h-screen bg-[#FFE5E5] py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-[#FF69B4] mb-8">
          Learn to Write: {currentLetter.letter}
        </h1>

        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border-4 border-[#FFB6C1] rounded-xl mx-auto bg-white"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDrawing(false)}
          />
          {/* Hidden canvas for letter mask */}
          <canvas
            ref={maskCanvasRef}
            width={400}
            height={400}
            className="hidden"
          />

          {accuracy !== null && (
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-md">
              <p className="text-lg font-semibold text-[#FF69B4]">
                Accuracy: {accuracy}%
              </p>
            </div>
          )}
          
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button onClick={() => router.push(`/learn/${KANNADA_LETTERS[currentLetterIndex - 1]?.path}`)} disabled={currentLetterIndex === 0}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
            >
            <ChevronLeft className="w-6 h-6"/>
          </button>
          <button
            onClick={clearCanvas}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <button
            onClick={checkAccuracy}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
          >
            <CheckCircle className="w-6 h-6" />
          </button>
          <button onClick={() => router.push(`/learn/${KANNADA_LETTERS[currentLetterIndex + 1]?.path}`)} disabled={currentLetterIndex === KANNADA_LETTERS.length - 1}
            className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white rounded-full p-3 transition-colors"
            >
            <ChevronRight className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </div>
  );
}
