
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#f9f9f5] z-[100] flex flex-col items-center justify-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, #1a4731 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
      }}></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Loading Text */}
        <div className="flex flex-col items-center space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-1000">
           <h1 className="text-emerald-900 font-bold text-sm tracking-[0.3em] uppercase">Kithademics</h1>
           <div className="flex space-x-1">
             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
             <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-100"></div>
             <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full animate-bounce delay-200"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
