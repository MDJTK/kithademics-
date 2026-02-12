
import React from 'react';
import { Course } from '../types';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';

interface DashboardProps {
  onCourseClick: (id: string) => void;
  onCourseSelect: (id: string) => void;
  onSeeMore: () => void;
  recentlyWatched?: Course | null;
}

const Dashboard: React.FC<DashboardProps> = ({ onCourseClick, onCourseSelect, onSeeMore, recentlyWatched }) => {
  // Sort by newest (simulated by reversing the constant array) and take only the first 3
  const newCourses = [...COURSES].reverse().slice(0, 3);

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-b-[40px] shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1523240715632-d984bc4dd953?auto=format&fit=crop&q=80&w=1200" 
          alt="Students studying" 
          className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-[2s]"
        />
        
        {/* Decorative Overlay - Geometric Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', 
            backgroundSize: '24px 24px' 
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/30 to-transparent"></div>

        {/* Inspirational Element - Rotating Geometric Star */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] opacity-[0.07] pointer-events-none">
             <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor" className="text-white animate-[spin_60s_linear_infinite]">
                 <path d="M50 0L61 35L98 35L68 57L79 91L50 70L21 91L32 57L2 35L39 35L50 0Z" />
             </svg>
        </div>

        <div className="absolute bottom-10 left-8 right-8">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 mb-4 animate-in slide-in-from-bottom-2 fade-in duration-1000">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
             <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Daily Wisdom</span>
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight serif-font animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-100">
            "Seek knowledge from the cradle to the grave."
          </h1>
          <p className="text-emerald-100/60 text-[10px] font-medium mt-2 uppercase tracking-widest animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200">— Authentic Tradition</p>
        </div>
      </div>

      <div className="p-6 space-y-10 flex-1">
        {/* Recently Watched Section */}
        <section className="bg-white p-5 rounded-[2.5rem] border border-emerald-950/5 shadow-sm">
          <div className="flex items-center space-x-2 mb-4 px-1">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
               Recently Watched
             </h2>
          </div>
             
             {recentlyWatched ? (
               <div className="flex items-start gap-4">
                 {/* Thumbnail */}
                 <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border border-slate-100 relative group cursor-pointer" onClick={() => onCourseClick(recentlyWatched.id)}>
                    <img 
                        src={recentlyWatched.thumbnail} 
                        alt={recentlyWatched.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                        <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm scale-90 group-hover:scale-100 transition-transform">
                            <svg className="w-3 h-3 text-emerald-800 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-col space-y-2 flex-1 min-w-0 py-0.5">
                   <h3 className="text-sm font-bold text-emerald-dark leading-tight line-clamp-2">
                     {recentlyWatched.title}
                   </h3>
                   <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                     Continue your journey through the latest lesson in this course.
                   </p>
                   <div className="pt-1">
                      <button 
                        onClick={() => onCourseClick(recentlyWatched.id)}
                        className="bg-emerald-dark text-white px-5 py-2.5 rounded-xl text-[10px] font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-950/10 active:scale-[0.98] flex items-center w-fit space-x-2"
                      >
                        <span>Continue</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="flex flex-col space-y-3">
                 <h3 className="text-xl font-bold text-emerald-dark tracking-tight">
                   Start Learning
                 </h3>
                 <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                   Begin your first lesson and explore authentic Islamic sciences.
                 </p>
                 <div className="pt-2">
                    <button 
                      onClick={() => onCourseClick(COURSES[0].id)}
                      className="bg-emerald-dark text-white px-10 py-3.5 rounded-full text-xs font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-950/10 active:scale-[0.98]"
                    >
                      Continue
                    </button>
                 </div>
               </div>
             )}
        </section>

        {/* New Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">New Courses</h3>
            <div className="h-px bg-slate-100 flex-1 ml-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newCourses.map(course => (
              <CourseCard key={course.id} course={course} onClick={onCourseSelect} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={onSeeMore}
              className="px-8 py-3 rounded-full border border-emerald-900/10 text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-all flex items-center space-x-2"
            >
              <span>More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>

        {/* Decorative Quote */}
        <div className="text-center py-6 px-10">
          <p className="serif-font text-emerald-800 italic text-sm opacity-60 leading-relaxed">
            "Knowledge is not what is memorized, but what is beneficial."
          </p>
          <p className="text-[9px] font-bold text-emerald-900/40 uppercase tracking-widest mt-2">— Imam ash-Shafi'i</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
