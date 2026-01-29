import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    ...props
}: ButtonProps) {
    const baseStyles = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2';

    const variantStyles = {
        primary: 'bg-[var(--ocean-blue)] text-white hover:bg-[#084169] shadow-[0_4px_12px_rgba(10,74,122,0.15)] hover:shadow-[0_6px_16px_rgba(10,74,122,0.25)] hover:-translate-y-0.5',
        secondary: 'bg-[var(--sunset-coral)] text-white hover:bg-[#FF6145] shadow-[0_4px_12px_rgba(255,126,95,0.15)] hover:shadow-[0_6px_16px_rgba(255,126,95,0.25)] hover:-translate-y-0.5',
        whatsapp: 'bg-[#25D366] text-white hover:bg-[#20BA5A]',
        outline: 'border-2 border-[var(--ocean-blue)] text-[var(--ocean-blue)] hover:bg-[var(--ocean-blue)] hover:text-white'
    };

    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
