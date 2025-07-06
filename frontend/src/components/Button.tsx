import React from "react";

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.JSX.Element;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
};

const Button = ({
  onClick,
  icon,
  children,
  type = "button",
  disabled = false,
  className,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 
        text-xs sm:text-sm font-medium
        text-white bg-primary 
        min-h-9 px-4 rounded-xl 
        transition-all duration-200
        hover:bg-primary/90 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;

