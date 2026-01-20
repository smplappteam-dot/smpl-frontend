"use client";

import { PromptInput } from "@/features/ai-media/components/prompt-input";
import Image from "next/image";
import Link from "next/link";

export default function OnboardPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-32">
      {/* Prompt Input Fixed at Bottom */}
  
      {/* Start Generation Section */}
      <div className="space-y-6">
        <h1 className="text-black text-2xl font-bold">Start Generation</h1>
        <div className="pt-8 border-t border-gray-200 flex flex-col items-center justify-center text-center p-12 bg-gray-50/50 rounded-2xl border-dashed border-2 border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to create something amazing?
          </h3>
          <p className="text-gray-500 mb-8 max-w-md">
            Join thousands of creators using AI to generate stunning media. Sign
            up now to save your generations.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-white hover:border-gray-300 transition-all shadow-sm"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2.5 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
