import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateHeight = (aspectRatio: string, width: number) => {
  const [w, h] = aspectRatio.split(":").map(Number);
  return (width / w) * h;
};
