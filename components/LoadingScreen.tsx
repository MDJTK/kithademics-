
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
        <div className="relative w-32 h-32 mb-8">
          {/* Outer Glow */}
          <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl animate-pulse"></div>

          {/* Rotating Geometric Star Layer 1 (Slower, Reverse) */}
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite_reverse] opacity-40">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-800">
               <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35L50 0Z" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Rotating Geometric Star Layer 2 (Main) */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
             <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-900">
               <path d="M50 5L61.2 21.2L80 20L78.8 38.8L95 50L78.8 61.2L80 80L61.2 78.8L50 95L38.8 78.8L20 80L21.2 61.2L5 50L21.2 38.8L20 20L38.8 21.2L50 5Z" stroke="currentColor" strokeWidth="2.5" />
             </svg>
          </div>

          {/* Center K */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 bg-[#f9f9f5] rounded-full flex items-center justify-center relative z-20 animate-in zoom-in duration-1000">
                <span className="serif-font text-4xl font-bold text-emerald-900 animate-pulse">K</span>
             </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center space-y-3 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-300">
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
