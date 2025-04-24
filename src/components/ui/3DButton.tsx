import React, { ButtonHTMLAttributes, useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ThreeDButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  isActive?: boolean;
  isCircle?: boolean;
  isSquare?: boolean;
}

export function ThreeDButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  isActive = false,
  isCircle = false,
  isSquare = false,
  className = '',
  ...props
}: ThreeDButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Color variants - Updated primary to purple
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-b from-purple-400 to-purple-600 text-white border-purple-700/50 shadow-purple-700/50 active:shadow-purple-800/50 hover:from-purple-500',
    secondary: 'bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800 border-gray-500/50 shadow-gray-500/50 active:shadow-gray-600/50 hover:from-gray-300',
    success: 'bg-gradient-to-b from-green-400 to-green-600 text-white border-green-700/50 shadow-green-700/50 active:shadow-green-800/50 hover:from-green-500',
    danger: 'bg-gradient-to-b from-red-400 to-red-600 text-white border-red-700/50 shadow-red-700/50 active:shadow-red-800/50 hover:from-red-500',
    warning: 'bg-gradient-to-b from-amber-400 to-amber-600 text-white border-amber-700/50 shadow-amber-700/50 active:shadow-amber-800/50 hover:from-amber-500',
    info: 'bg-gradient-to-b from-indigo-400 to-indigo-600 text-white border-indigo-700/50 shadow-indigo-700/50 active:shadow-indigo-800/50 hover:from-indigo-500'
  };

  // Size variants
  const sizeStyles: Record<ButtonSize, string> = {
    sm: isCircle || isSquare ? 'w-8 h-8 text-xs' : 'px-3 py-1.5 text-xs',
    md: isCircle || isSquare ? 'w-10 h-10 text-sm' : 'px-4 py-2 text-sm',
    lg: isCircle || isSquare ? 'w-14 h-14 text-base' : 'px-5 py-2.5 text-base',
    xl: isCircle || isSquare ? 'w-16 h-16 text-lg' : 'px-6 py-3 text-lg'
  };

  // Effect for active state
  const activeState = isActive ? 'translate-y-0 shadow-inner' : 'hover:-translate-y-0.5 active:translate-y-0';
  
  // Class for button shape
  let shapeClass = '';
  if (isCircle) {
    shapeClass = 'rounded-full';
  } else if (isSquare) {
    shapeClass = 'rounded-md'; // Square buttons with slight rounding
  } else {
    shapeClass = 'rounded-full'; // Default to oval buttons
  }
  
  // Border styling - add purple border effect
  const borderStyle = 'border-2';
  
  // Shadow effect
  const shadowEffect = 'shadow-lg';
  
  // Combined class names
  const buttonClasses = `
    relative flex items-center justify-center font-medium
    transition-all duration-150
    transform active:scale-95 select-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${activeState}
    ${shapeClass}
    ${borderStyle}
    ${shadowEffect}
    ${fullWidth ? 'w-full' : ''}
    ${isPressed ? 'button-press' : ''}
    ${className}
  `;

  const handleMouseDown = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
  };

  return (
    <button
      className={buttonClasses}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {/* Main button content with icon placement */}
      <span className="flex items-center justify-center gap-2 relative z-10">
        {Icon && iconPosition === 'left' && !isCircle && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} />}
        {isCircle && Icon ? <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} /> : children}
        {Icon && iconPosition === 'right' && !isCircle && <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} />}
      </span>

      {/* Add highlight effect on top edge */}
      <span className="absolute inset-x-0 top-0 h-1/3 rounded-t-full bg-white/20 pointer-events-none" />
    </button>
  );
}