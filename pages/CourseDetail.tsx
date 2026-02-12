
import React from 'react';
import { Course } from '../types';
import Footer from '../components/Footer';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onPlayLesson: (lessonId: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onPlayLesson }) => {
  return (
    <div className="min-h-full flex flex-col bg-slate-50">
      {/* Course Overview Banner */}
      <div className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm px-6 py-4 flex items-center space-x-4">
        <button 
          onClick={onBack} 
          className="p-2 -ml-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="font-bold text-slate-800 text-lg">Course Overview</h1>
      </div>

      <div className="flex-1">
        {/* Course Info Card */}
        <div className="bg-white p-6 pb-8 mb-4 rounded-b-[2.5rem] shadow-sm border-b border-emerald-950/5">
          <div className="flex flex-col md:flex-row gap-6 items-start">
             <div className="w-full md:w-1/3 aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative group">
               <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
             </div>
             <div className="flex-1 space-y-3">
               <div className="flex items-center space-x-2">
                 <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{course.category}</span>
                 {course.progress === 100 && (
                   <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Completed</span>
                 )}
               </div>
               <h2 className="serif-font text-2xl font-bold text-emerald-950 leading-tight">{course.title}</h2>
               <p className="text-sm font-medium text-slate-500">{course.instructor}</p>
               <p className="text-sm text-slate-400 leading-relaxed max-w-xl">{course.description}</p>
               
               {/* Progress Bar */}
               <div className="pt-2 max-w-md">
                 <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                   <span>Your Progress</span>
                   <span>{course.progress}%</span>
                 </div>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="px-6 pb-20 max-w-4xl mx-auto mt-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800">Curriculum</h3>
            <span className="text-xs font-medium text-slate-400">{course.lessons.length} Lessons</span>
          </div>

          <div className="space-y-4">
            {course.lessons.map((lesson, index) => (
              <div 
                key={lesson.id}
                onClick={() => onPlayLesson(lesson.id)}
                className="group bg-white p-3 rounded-2xl border border-slate-100 hover:border-emerald-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center space-x-4"
              >
                {/* Thumbnail */}
                <div className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 ${!lesson.isCompleted ? 'grayscale' : ''}`}>
                  <img src={lesson.thumbnail || course.thumbnail} alt={lesson.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm scale-90 group-hover:scale-100 transition-transform">
                       <svg className="w-3 h-3 text-emerald-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                       </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                     <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Lesson {index + 1}</span>
                     {lesson.isCompleted && (
                       <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-full">Completed</span>
                     )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-emerald-700 transition-colors">{lesson.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{lesson.duration}</p>
                </div>

                {/* Arrow */}
                <div className="pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetail;
