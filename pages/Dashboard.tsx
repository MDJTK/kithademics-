
import React from 'react';
import { Course } from '../types';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';
import { motion } from 'motion/react';

interface DashboardProps {
  onCourseClick: (id: string) => void;
  onCourseSelect: (id: string) => void;
  onSeeMore: () => void;
  recentlyWatched?: (Course & { progress?: number }) | null;
  spotlightData?: any;
  courses: Course[];
}

const Dashboard: React.FC<DashboardProps> = ({ onCourseClick, onCourseSelect, onSeeMore, recentlyWatched, spotlightData, courses }) => {
  const newCourses = [...courses].reverse().slice(0, 3);

  return (
    <div className="min-h-full flex flex-col">
      {/* Hero Section - The Spotlight */}
      <div className="relative h-[380px] w-full overflow-hidden rounded-b-[3rem] shadow-2xl group">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&q=80&w=1200" 
          alt="Islamic Architecture" 
          className="w-full h-full object-cover brightness-[0.5]"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 to-transparent"></div>

        <div className="absolute top-12 left-8 right-8 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 mb-6"
          >
             <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]"></div>
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Featured Spotlight</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-3xl md:text-5xl font-black leading-[1.1] serif-font max-w-sm mb-6 uppercase italic"
          >
            Illuminate Your <span className="text-emerald-400">Soul</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center space-x-4"
          >
            <button 
              onClick={() => onCourseSelect(courses[0].id)}
              className="bg-white text-emerald-950 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-emerald-400 hover:text-white transition-all shadow-xl active:scale-95"
            >
              Start Journey
            </button>
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-950 overflow-hidden shadow-lg">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="User" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-950 flex items-center justify-center text-[10px] font-bold text-white">
                +2k
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Pattern Overlay */}
        <div className="absolute bottom-0 right-0 p-8 opacity-20 pointer-events-none">
           <i className="fi fi-rr-star text-[120px] text-white rotate-12"></i>
        </div>
      </div>

      <div className="p-6 space-y-12 flex-1 -mt-10 relative z-20">
        {/* Recently Watched Section - Redesigned Card */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-2 rounded-[2.5rem] border border-emerald-950/5 shadow-2xl shadow-emerald-950/10"
        >
          <div className="bg-emerald-50/50 p-4 rounded-[2rem] flex items-center gap-5">
             {recentlyWatched ? (
               <>
                 <div className="w-24 h-24 rounded-3xl overflow-hidden shrink-0 shadow-lg relative group cursor-pointer" onClick={() => onCourseClick(recentlyWatched.id)}>
                    <img src={recentlyWatched.thumbnail} alt={recentlyWatched.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-emerald-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <i className="fi fi-rr-play text-white text-2xl"></i>
                    </div>
                    {/* Progress Circle */}
                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-emerald-100 shadow-sm">
                       <span className="text-[10px] font-black text-emerald-700">{recentlyWatched.progress}%</span>
                    </div>
                 </div>

                 <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1.5">
                       <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-100 px-2 py-0.5 rounded-md">Continue Learning</span>
                    </div>
                    <h3 className="text-sm md:text-base font-black text-emerald-950 leading-tight mb-2 truncate">
                      {recentlyWatched.title}
                    </h3>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                       <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${recentlyWatched.progress}%` }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="bg-emerald-600 h-full rounded-full"
                       ></motion.div>
                    </div>
                    <button 
                      onClick={() => onCourseClick(recentlyWatched.id)}
                      className="text-[10px] font-black uppercase tracking-widest text-emerald-700 flex items-center group"
                    >
                      Resume Lesson 
                      <i className="fi fi-rr-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </button>
                 </div>
               </>
             ) : (
               <div className="flex-1 p-4 text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
                     <i className="fi fi-rr-flame text-emerald-600 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-black text-emerald-950 serif-font mb-2">New Here?</h3>
                  <p className="text-xs text-slate-400 font-medium mb-6">Discover the richness of tradition with our beginner's guide to Islam.</p>
                  <button 
                    onClick={() => onCourseSelect(courses[0].id)}
                    className="w-full bg-emerald-dark text-white py-4 rounded-2xl text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
                  >
                    Start First Course
                  </button>
               </div>
             )}
          </div>
        </motion.section>

        {/* Featured Selection Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-emerald-950 serif-font uppercase italic leading-none">New <span className="text-emerald-600">Discoveries</span></h3>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">Updated this week</p>
            </div>
            <button onClick={onSeeMore} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
               <i className="fi fi-rr-arrow-right"></i>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newCourses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * idx }}
              >
                <CourseCard course={course} onClick={onCourseSelect} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Bento Section */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-emerald-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
              <div className="relative z-10">
                 <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-4 text-center">Active Learners</p>
                 <div className="text-3xl font-black serif-font text-center">12.8k</div>
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-10 rotate-12 group-hover:scale-125 transition-transform duration-700">
                 <i className="fi fi-rr-users text-[80px]"></i>
              </div>
           </div>
           <div className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
              <i className="fi fi-rr-star text-emerald-600 text-3xl mb-2"></i>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Community Rank</p>
              <div className="text-xl font-black text-emerald-950">Top 5%</div>
           </div>
        </section>

        {/* Decorative Quote */}
        <div className="text-center py-10 px-6 bg-cream/50 rounded-[3rem] border border-white">
          <i className="fi fi-rr-quote-right text-emerald-900/10 text-6xl mb-[-30px] block"></i>
          <p className="serif-font text-emerald-900 font-bold italic text-base leading-relaxed relative z-10 px-4">
            {spotlightData?.quote || "\"Knowledge is not what is memorized, but what is beneficial.\""}
          </p>
          <div className="h-px w-12 bg-emerald-200 mx-auto my-6"></div>
          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">
            {spotlightData?.author || "Imam ash-Shafi'i"}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
