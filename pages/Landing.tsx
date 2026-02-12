
import React from 'react';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] opacity-[0.03] rotate-45 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 100 100" fill="none">
          <path d="M50 5L61.2 21.2L80 20L78.8 38.8L95 50L78.8 61.2L80 80L61.2 78.8L50 95L38.8 78.8L20 80L21.2 61.2L5 50L21.2 38.8L20 20L38.8 21.2L50 5Z" stroke="#1a4731" strokeWidth="2" />
        </svg>
      </div>

      <div className="w-full max-w-lg text-center z-10 space-y-10">
        <div className="flex flex-col items-center">
          <div className="mb-6">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
              <path d="M50 5L61.2 21.2L80 20L78.8 38.8L95 50L78.8 61.2L80 80L61.2 78.8L50 95L38.8 78.8L20 80L21.2 61.2L5 50L21.2 38.8L20 20L38.8 21.2L50 5Z" stroke="#1a4731" strokeWidth="4" />
              <text x="50" y="62" textAnchor="middle" fill="#1a4731" fontSize="35" fontWeight="bold" className="serif-font">K</text>
            </svg>
          </div>
          <h2 className="text-emerald-dark text-xs font-bold uppercase tracking-[0.4em] mb-4">Welcome to KithAdemics</h2>
          <h1 className="serif-font text-3xl md:text-5xl text-slate-900 font-bold leading-tight mb-4">
            Authentic Knowledge <br/> for the Modern Mind.
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
            Experience a structured, authentic, and professional digital learning platform for Islamic sciences.
          </p>
        </div>

        {/* Intro Video Section */}
        <div className="space-y-6">
          <div className="relative group cursor-pointer w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200" 
              alt="Intro Video Thumbnail" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
            />
            <div className="absolute inset-0 bg-emerald-950/20 group-hover:bg-emerald-950/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-900/40 px-3 py-1 rounded-full backdrop-blur-sm text-white">Intro Video</span>
            </div>
          </div>

          <button 
            onClick={onGetStarted}
            className="w-full bg-emerald-dark hover:bg-emerald-900 text-white font-bold py-5 rounded-[2rem] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-emerald-950/20 text-lg"
          >
            Let's Get Started
          </button>
        </div>
        
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] pt-4">
          Structured • Authentic • Practical
        </p>
      </div>
    </div>
  );
};

export default Landing;
