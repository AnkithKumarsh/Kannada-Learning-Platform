"use client";

import Link from "next/link";

const KANNADA_LETTERS = [
  { letter: "ಅ", image: "/images/kannada/a.jpg", path: "svaragalu1" },
  { letter: "ಆ", image: "/images/kannada/aa.jpg", path: "svaragalu2" },
  { letter: "ಇ", image: "/images/kannada/i.jpg", path: "svaragalu3" },
  { letter: "ಈ", image: "/images/kannada/ii.jpg", path: "svaragalu4" },
  { letter: "ಉ", image: "/images/kannada/u.jpg", path: "svaragalu5" },
  { letter: "ಊ", image: "/images/kannada/uu.jpg", path: "svaragalu6" },
  { letter: "ಋ", image: "/images/kannada/ru.jpg", path: "svaragalu7" },
  { letter: "ಎ", image: "/images/kannada/e.jpg", path: "svaragalu8" },
  { letter: "ಏ", image: "/images/kannada/ee.jpg", path: "svaragalu9" },
  { letter: "ಐ", image: "/images/kannada/ai.jpg", path: "svaragalu10" },
  { letter: "ಒ", image: "/images/kannada/o.jpg", path: "svaragalu11" },
  { letter: "ಓ", image: "/images/kannada/oo.jpg", path: "svaragalu12" },
  { letter: "ಔ", image: "/images/kannada/au.jpg", path: "svaragalu13" },
  { letter: "ಅಂ", image: "/images/kannada/am.jpg", path: "svaragalu14" },
  { letter: "ಅಃ", image: "/images/kannada/ah.jpg", path: "svaragalu15" }
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#FFE5E5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-[#FF69B4] mb-8">
          ಕನ್ನಡ ಅಕ್ಷರಗಳು
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Click on a letter to start practicing!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {KANNADA_LETTERS.map((letter, index) => (
            <Link 
              href={`/learn/${letter.path}`} 
              key={index}
              className="transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-[#FFB6C1] hover:border-[#FF69B4] cursor-pointer">
                <div className="aspect-square relative mb-4">
                  <img
                    src={letter.image}
                    alt={`Letter ${letter.letter}`}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <p className="text-4xl font-bold text-center text-[#FF69B4]">
                  {letter.letter}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}