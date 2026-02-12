
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course.id)}
      className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-50 cursor-pointer group flex flex-col relative"
    >
      <div className="relative h-32">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className={`w-full h-full object-cover transition-all duration-300 ${course.isLocked ? 'grayscale-[0.5] group-hover:grayscale-0' : ''}`}
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full z-10">
           <span className="text-[8px] font-bold text-emerald-800">{course.category}</span>
        </div>
        
        {/* Lock Overlay */}
        {course.isLocked && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/40">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight line-clamp-1">{course.title}</h3>
        <p className="text-[10px] text-slate-400 mb-3 truncate">{course.instructor}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-1.5">
            <div className="w-4 h-4 rounded bg-emerald-50 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
            </div>
            {/* Dynamic Lesson Count */}
            <span className="text-[9px] font-bold text-slate-500">{course.lessons.length} Lessons</span>
          </div>
          
          {/* Price or Progress */}
          {course.isLocked ? (
             <span className="text-[10px] font-bold text-white bg-emerald-600 px-3 py-1 rounded-full shadow-sm shadow-emerald-600/20">{course.price}</span>
          ) : (
             <span className="text-[9px] font-bold text-emerald-600">{course.progress > 0 ? 'In Progress' : 'Purchased'}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
