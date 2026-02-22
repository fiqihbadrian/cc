import * as React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`px-6 py-5 border-b-2 border-black ${className}`}
      {...props}
    />
  );
}

export function CardTitle({ className = "", ...props }: CardProps) {
  return (
    <h2
      className={`text-2xl font-bold ${className}`}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }: CardProps) {
  return (
    <div className={`px-6 py-5 ${className}`} {...props} />
  );
}

export function CardFooter({ className = "", ...props }: CardProps) {
  return (
    <div
      className={`px-6 py-5 border-t-2 border-black flex items-center ${className}`}
      {...props}
    />
  );
}
