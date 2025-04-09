import { cn } from '@/lib/utils';
import * as React from 'react';



export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'ghost';
  size?: 'sm' | 'md';
}

const sizeClasses = {
  sm: 'p-1 text-lg',
  md: 'p-2 text-2xl',
} as const;

const variantClasses = {
  default: 'hover:bg-surface active:bg-surface/80',
  ghost: 'hover:bg-transparent active:bg-transparent',
} as const;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      icon: Icon,
      variant = 'default',
      size = 'md',
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        className={cn(
          'focus-visible:ring-ring h-max w-max rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <Icon className={cn('text-control-normal')} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };
