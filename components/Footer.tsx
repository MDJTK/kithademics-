
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 pb-12 pt-10 border-t border-emerald-900/5 px-6 bg-emerald-50/30">
      <div className="flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
            <path d="M50 5L61.2 21.2L80 20L78.8 38.8L95 50L78.8 61.2L80 80L61.2 78.8L50 95L38.8 78.8L20 80L21.2 61.2L5 50L21.2 38.8L20 20L38.8 21.2L50 5Z" stroke="#1a4731" strokeWidth="6" />
          </svg>
          <span className="text-emerald-900 font-bold text-sm tracking-widest uppercase">KithAdemics</span>
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
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a 
            href="https://wa.me" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 hover:scale-110 transition-transform shadow-sm"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884 0 2.225.569 3.807 1.594 5.397l-.997 3.646 3.892-.94zm11.381-5.493c-.301-.15-.1782-.25-.1782-.25l-2.226-1.1c-.244-.12-.419-.03-.594.12-.175.15-.67 1.05-.824 1.2-.154.15-.308.165-.609.015-.301-.15-1.269-.47-2.426-1.511-.9-.8-1.507-1.785-1.684-2.085-.177-.3-.019-.465.13-.614.135-.135.3-.345.45-.525.15-.18.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.67-1.62-.919-2.22-.242-.584-.489-.504-.67-.514-.171-.009-.368-.01-.565-.01-.197 0-.518.075-.788.375-.27.3-1.03.99-1.03 2.415s1.03 2.79 1.17 2.99c.14.2 2.025 3.089 4.904 4.331.685.296 1.219.473 1.636.605.689.219 1.316.188 1.812.114.553-.083 1.702-.695 1.942-1.365.24-.67.24-1.245.165-1.365-.075-.12-.27-.195-.57-.345z" />
            </svg>
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
