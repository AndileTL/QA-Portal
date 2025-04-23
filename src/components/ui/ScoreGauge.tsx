import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  label?: string;
  className?: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 'md',
  showValue = true,
  label,
  className = '',
}) => {
  // Normalize score to be between 0 and 100
  const normalizedScore = Math.min(Math.max(score, 0), 100);
  
  // Calculate the stroke dash offset for the progress
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;
  
  // Get color based on score
  const getColor = () => {
    if (normalizedScore >= 90) return 'text-green-500';
    if (normalizedScore >= 70) return 'text-blue-500';
    if (normalizedScore >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Determine size
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
  };
  
  const fontSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  
  const labelSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          className={`${getColor()} transition-all duration-1000 ease-in-out`}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize[size]} font-bold ${getColor()}`}>
            {normalizedScore}
          </span>
          {label && <span className={`${labelSize[size]} text-gray-500 mt-1`}>{label}</span>}
        </div>
      )}
    </div>
  );
};

export default ScoreGauge;