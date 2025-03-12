"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Pencil } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFE5E5] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#FFB6C1] rounded-b-full opacity-50" />
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-200 rounded-full" />
      <div className="absolute top-12 right-12 w-16 h-16 bg-blue-200 rounded-full" />
      
      <main className="relative max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center text-[#FF69B4] mb-8">
          ಕನ್ನಡ ಅಕ್ಷರಗಳನ್ನು ಕಲಿಯೋಣ!
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Let&apos;s Learn Kannada Alphabets Together!
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Learner's Mode Card */}
          <Link href="/learn" className="transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#FFB6C1] hover:border-[#FF69B4]">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-16 h-16 text-[#FF69B4]" />
              </div>
              <h2 className="text-2xl font-bold text-center text-[#FF69B4] mb-4">
                Learner&apos;s Mode
              </h2>
              <p className="text-gray-600 text-center">
                Trace letters and learn to write with guided practice!
              </p>
            </div>
          </Link>

          {/* Advanced Mode Card */}
          <Link href="/advanced" className="transform hover:scale-105 transition-transform">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-4 border-[#FFB6C1] hover:border-[#FF69B4]">
              <div className="flex items-center justify-center mb-4">
                <Pencil className="w-16 h-16 text-[#FF69B4]" />
              </div>
              <h2 className="text-2xl font-bold text-center text-[#FF69B4] mb-4">
                Advanced Mode
              </h2>
              <p className="text-gray-600 text-center">
                Practice writing letters on your own with picture guides!
              </p>
            </div>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 left-8 w-20 h-20 bg-green-200 rounded-full opacity-50" />
        <div className="absolute bottom-12 right-4 w-16 h-16 bg-purple-200 rounded-full opacity-50" />
      </main>
    </div>
  );
}