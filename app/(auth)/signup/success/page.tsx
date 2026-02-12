import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md mx-auto text-center space-y-6 bg-background-light backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="flex justify-center">
          
            <CheckCircle className="h-12 w-12 " />
          
        </div>

        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-primary from-blue-600 to-cyan-500">
          Account Created!
        </h1>

        <div className="space-y-2 text-primary-foreground">
        
          <p className="text-sm text-secondary-foreground">
            We've sent a verification link to your email. Please check your
            inbox (and spam folder) to complete the process.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/signin"
            className="text-muted-foreground hover:text-secondary-foreground font-semibold hover:underline transition-all"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
