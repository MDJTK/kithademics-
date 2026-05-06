
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pb-12 pt-10 border-t border-emerald-900/5 px-6 bg-emerald-50/30">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center rotate-45 transform group hover:rotate-[225deg] transition-all duration-700">
            <i className="fi fi-rr-star text-white text-[10px] -rotate-45"></i>
          </div>
          <span className="text-emerald-900 font-bold text-sm tracking-widest uppercase">Kithademics</span>
        </div>
        
        <p className="text-[11px] text-slate-400 font-medium text-center leading-relaxed max-w-xs">
          Authentic Knowledge. Modern Delivery.<br/>
          Empowering the next generation of students.
        </p>

        <div className="flex space-x-4">
          {/* YouTube */}
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-rose-600 hover:scale-110 transition-transform shadow-sm"
          >
            <i className="fi fi-brands-youtube text-2xl"></i>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform shadow-sm"
          >
             <i className="fi fi-brands-whatsapp text-2xl"></i>
          </a>
        </div>
        
        <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] pt-4">
          © 2025 Kithademics Platform
        </div>
      </div>
    </footer>
  );
};

export default Footer;
