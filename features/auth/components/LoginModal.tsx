"use client";

import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { SignInForm } from "./sign-in-form";
import Image from "next/image";
import { LoginForm } from "../forms/LoginForm";

interface LoginModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-dark border-0 shadow-2xl rounded-2xl h-[700px] flex flex-col md:flex-row gap-0">
         <DialogTitle></DialogTitle>      
              {/* Left Side - Login Form */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative">
                  <h1 className="text-4xl font-bold mb-2 tracking-tight">Welcome To Smpl</h1>
                  <p className="text-blue-100 text-sm leading-relaxed mb-10">
              Join thousands of creators using SMPL to revolutionize their
              workflow.
            </p>
          <LoginForm />
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 relative bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 min-h-full z-10 mix-blend-overlay" />
          <Image
            src="/img.webp"
            alt="Login Visual"
            fill
            className="object-cover opacity-90"
            priority
          />
        
        </div>
      </DialogContent>
    </Dialog>
  );
}
