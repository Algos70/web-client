import Link from 'next/link';
import { ROUTES } from '../../lib/constants/routes';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showIcon = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
        {showIcon && (
          <div className={`gradient-bg rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow ${iconSizes[size]}`}>
            <svg className={`text-white ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        )}
        <h1 className={`font-bold gradient-text group-hover:scale-105 transition-transform ${sizeClasses[size]}`}>
          NoxCommerce
        </h1>
      </Link>
    </div>
  );
}