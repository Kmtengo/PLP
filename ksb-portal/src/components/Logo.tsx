import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* KSB Logo placeholder - replace with actual ksb-logo.jpg when available */}
      <div className={`${sizes[size]} bg-green-600 rounded-lg flex items-center justify-center text-white font-bold`}>
        <span className="text-xs sm:text-sm">KSB</span>
      </div>
      <div className="ml-2">
        <div className="text-green-600 font-bold text-sm sm:text-base">Kenya Sugar Board</div>
        <div className="text-gray-500 text-xs">More Sugar for Prosperity</div>
      </div>
    </div>
  );
};

export default Logo;