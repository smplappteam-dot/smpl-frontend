import { Eye, EyeOff, Check, X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  className?: string;
}

export function PasswordInput({
  value,
  onChange,
  onValidationChange,
  className = "",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Validation rules
  const validations = useMemo(() => {
    return [
      {
        id: "min-length",
        label: "At least 6 characters",
        isValid: value.length >= 6,
      },
      {
        id: "uppercase",
        label: "At least 1 uppercase letter",
        isValid: /[A-Z]/.test(value),
      },
      {
        id: "number",
        label: "At least 1 number",
        isValid: /[0-9]/.test(value),
      },
      {
        id: "special",
        label: "At least 1 special character",
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      },
    ];
  }, [value]);

  const isValid = validations.every((v) => v.isValid);

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <label
          className="block text-sm font-medium text-gray-700 mb-1.5"
          htmlFor="new-password"
        >
          New Password
        </label>
        <div className="relative">
          <input
            id="new-password"
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsTouched(true);
            }}
            onBlur={() => setIsTouched(true)}
            className={`w-full px-4 py-3 rounded-xl border outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white pr-10 ${
              isTouched && !isValid
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            }`}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Validation Indicators */}
      <div className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Password Requirements:
        </p>
        {validations.map((validation) => (
          <div key={validation.id} className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-4 h-4 rounded-full border ${
                validation.isValid
                  ? "bg-green-100 border-green-200"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              {validation.isValid ? (
                <Check className="w-2.5 h-2.5 text-green-600" />
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              )}
            </div>
            <span
              className={`text-xs ${
                validation.isValid ? "text-green-700" : "text-gray-500"
              }`}
            >
              {validation.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
