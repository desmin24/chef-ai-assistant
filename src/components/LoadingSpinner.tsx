
import React from 'react';

interface LoadingSpinnerProps {
  small?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ small = false }) => {
  const sizeClasses = small ? 'w-5 h-5 border-2' : 'w-8 h-8 border-4';
  const colorClasses = small ? 'border-t-white' : 'border-t-green-600';
  
  return (
    <div 
      className={`animate-spin rounded-full ${sizeClasses} border-solid border-gray-300 ${colorClasses}`} 
      role="status" 
      aria-live="polite"
      aria-label="載入中"
    >
      <span className="sr-only">載入中...</span>
    </div>
  );
};
