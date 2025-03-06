import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={clsx(
        "text-lg px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500",
        "hover:from-blue-600 hover:to-violet-600 animate-glow",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
