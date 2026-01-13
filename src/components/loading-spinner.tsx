import React from 'react';

type LoadingSpinnerProps = {
    size?: 'sm' | 'lg' | 'xl';
    className?: string;
    variant?: "darkMode" | "default"
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'lg', className = '', variant = "default" }) => {
    const sizeClasses = {
        sm: 'h-4 w-4 border-2',
        lg: 'h-8 w-8 border-4',
        xl: 'h-12 w-12 border-[5px]',
    };

    const variants = {
        darkMode: "border-white",
        default: "border-muted-foreground"
    }

    return (
    <div className={`inline-flex items-center justify-center ${className}`}>
        <div
            className={`animate-spin rounded-full border-solid ${variants[variant]} border-r-transparent ${sizeClasses[size]}`}
            style={{ animationDuration: '1.2s' }}
            role="status"
        >
        <span className="sr-only">Loading...</span>
        </div>
    </div>
    );
};

export default LoadingSpinner;