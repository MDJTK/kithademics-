
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
              <i className="fi fi-rr-lock text-white text-sm"></i>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight line-clamp-1">{course.title}</h3>
        <p className="text-[10px] text-slate-400 mb-3 truncate">{course.instructor}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <i className="fi fi-rr-book-alt text-emerald-600 text-[10px]"></i>
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
