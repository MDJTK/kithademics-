
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Overview', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      id: 'library', 
      label: 'Curriculum', 
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' 
    },
    { 
      id: 'schedule', 
      label: 'Schedule', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
    { 
      id: 'community', 
      label: 'Community', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
    },
  ];

  return (
    <div className="w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200 h-full flex flex-col fixed left-0 top-0 pt-20 z-30 transition-all duration-300">
      <nav className="flex-1 px-4 space-y-2 mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                : 'text-slate-500 hover:bg-slate-50 hover:text-emerald-700'
            }`}
          >
            <svg
              className={`h-5 w-5 mr-3 transition-colors ${
                activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
            <span className="font-semibold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Premium Call to Action */}
      <div className="px-4 mb-6">
        <div className="bg-emerald-950 rounded-[2rem] p-5 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-5 -mr-4 -mt-4 group-hover:rotate-12 transition-transform duration-500">
            <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
            </svg>
          </div>
          <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Impact Fund</p>
          <h4 className="text-xs font-bold mb-2">Support Authentic Knowledge</h4>
          <p className="text-[10px] text-emerald-100/60 leading-relaxed mb-4">Helping 2,000+ students access quality education monthly.</p>
          <button className="w-full bg-emerald-500 hover:bg-white hover:text-emerald-900 text-white py-2.5 rounded-xl text-[10px] font-bold transition-all transform active:scale-95">
            Become a Patron
          </button>
        </div>
      </div>

      <div className="px-4 mb-6 pt-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-300 group"
        >
          <svg className="h-5 w-5 mr-3 transition-colors group-hover:text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-bold text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
