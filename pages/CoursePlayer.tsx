
import React, { useState, useEffect, useRef } from 'react';
import { Course, Lesson } from '../types';

interface CoursePlayerProps {
  course: Course;
  onBack: () => void;
  initialLessonId?: string;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onBack, initialLessonId }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => {
    if (initialLessonId) {
      const found = course.lessons.find(l => l.id === initialLessonId);
      if (found) return found;
    }
    return course.lessons[0];
  });

  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Player state
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Effect to update if prop changes
  useEffect(() => {
    if (initialLessonId) {
       const found = course.lessons.find(l => l.id === initialLessonId);
       if (found) {
         setActiveLesson(found);
         setIsPlaying(false);
       }
    }
  }, [initialLessonId, course]);

  // Handle Play/Pause
  const handlePlayPause = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: command,
        args: []
      }), '*');
      setIsPlaying(!isPlaying);
    }
  };

  // Handle Confirm Action
  const handleConfirmComplete = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      setActiveLesson(prev => ({
        ...prev,
        isCompleted: !prev.isCompleted
      }));
      setIsAnimating(false);
      setShowCompleteModal(false);
    }, 1200);
  };

  // Find next lesson
  const activeLessonIndex = course.lessons.findIndex(l => l.id === activeLesson.id);
  const nextLesson = course.lessons[activeLessonIndex + 1];

  // Construct YouTube URL with origin for API security
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const videoSrc = `https://www.youtube.com/embed/Myr2DVUwaXk?enablejsapi=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&origin=${origin}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1000px] mx-auto h-screen overflow-hidden flex flex-col bg-white shadow-xl shadow-slate-200/50 relative">
        {/* Video Area */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="bg-white px-4 py-3 flex items-center border-b border-slate-100 sticky top-0 z-20">
            <div className="flex items-center space-x-3">
              <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full text-slate-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight text-sm line-clamp-1">{course.title}</h1>
                <p className="text-[10px] text-slate-500 line-clamp-1">{activeLesson.title}</p>
              </div>
            </div>
          </div>

          {/* Player */}
          <div className="w-full bg-black aspect-video relative group shrink-0 overflow-hidden select-none">
            <iframe
              ref={iframeRef}
              className="w-full h-full object-cover pointer-events-none" 
              src={videoSrc}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            
            {/* Main Click Overlay - Always present to toggle play/pause */}
            <div 
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={handlePlayPause}
            ></div>

            {/* Centered Play Button (Visible only when paused) */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 z-20 pointer-events-none transition-opacity duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl animate-in zoom-in duration-200">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
              </div>
            )}
            
            {/* Custom Controls Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col space-y-4 transition-opacity duration-300 z-30 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              {/* Progress Bar (Visual Demo) */}
              <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden cursor-pointer group/progress" onClick={(e) => e.stopPropagation()}>
                <div className="bg-emerald-500 h-full w-1/3 relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-white" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center space-x-4 md:space-x-6">
                  <button onClick={handlePlayPause} className="hover:text-emerald-400 transition-colors focus:outline-none">
                    {isPlaying ? (
                       <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                    ) : (
                       <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                    )}
                  </button>
                  
                  {/* Volume (Mock) */}
                  <div className="group/vol flex items-center space-x-2">
                     <button className="focus:outline-none"><svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg></button>
                     <div className="w-0 overflow-hidden group-hover/vol:w-20 transition-all duration-300">
                        <div className="h-1 bg-white/30 rounded-full w-16 ml-2">
                           <div className="h-full bg-white w-2/3"></div>
                        </div>
                     </div>
                  </div>

                  <span className="text-[10px] md:text-xs font-medium tabular-nums">04:20 / {activeLesson.duration}</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="text-[10px] md:text-xs font-bold bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors">1.0x</button>
                  <button className="hover:text-emerald-400 transition-colors focus:outline-none">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area below video */}
          <div className="p-6 md:p-10 text-slate-800 max-w-3xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="serif-font text-2xl md:text-3xl font-bold">{activeLesson.title}</h2>
              <div>
                <button
                  onClick={() => setShowCompleteModal(true)}
                  className={`flex items-center space-x-2.5 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                    activeLesson.isCompleted
                      ? 'bg-emerald-100 border-emerald-200 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-600'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                     activeLesson.isCompleted ? 'bg-emerald-500 border-emerald-500' : 'border-current'
                  }`}>
                    {activeLesson.isCompleted && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-bold tracking-tight">
                    {activeLesson.isCompleted ? 'Completed' : 'Mark as Complete'}
                  </span>
                </button>
              </div>
            </div>

            <div className="prose max-w-none text-slate-600 leading-relaxed mb-10 text-sm md:text-base">
              <p className="mb-4">
                In this lesson, we explore the foundational principles of {course.title.split(':')[0]}.
                The instructor provides a detailed analysis of traditional texts and how they apply to modern life.
              </p>
              <h3 className="text-slate-900 font-bold text-lg mb-3">Key Takeaways</h3>
              <ul className="list-disc list-inside space-y-2 mb-8">
                <li>Understanding the historical context of the rulings.</li>
                <li>Practical steps for daily implementation.</li>
                <li>Common pitfalls and how to avoid them based on classic scholarship.</li>
              </ul>
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 flex items-start space-x-4">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 mb-1">Scholar's Note</h4>
                  <p className="text-emerald-800 text-sm">
                    "The purpose of knowledge is not simply the accumulation of facts, but the transformation of the heart and the rectification of actions."
                  </p>
                </div>
              </div>
            </div>

            {/* Next Video Section */}
            {nextLesson && (
              <div className="mt-12 pt-8 border-t border-slate-100 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Up Next</h3>
                </div>
                <button 
                  onClick={() => setActiveLesson(nextLesson)}
                  className="w-full bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/5 rounded-2xl p-4 flex items-center text-left transition-all group"
                >
                  <div className="w-24 h-16 md:w-32 md:h-20 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={nextLesson.thumbnail || course.thumbnail} alt={nextLesson.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-sm scale-90 group-hover:scale-100 transition-transform">
                        <svg className="w-4 h-4 text-emerald-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lesson {activeLessonIndex + 2}</span>
                    <h4 className="font-bold text-slate-800 text-base md:text-lg group-hover:text-emerald-700 transition-colors truncate">{nextLesson.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{nextLesson.duration}</p>
                  </div>
                  <div className="ml-4 hidden md:block">
                     <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
                       <svg className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                     </div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => !isAnimating && setShowCompleteModal(false)}></div>
             <div className="bg-white rounded-[2rem] p-8 max-w-xs w-full shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden">
                {isAnimating ? (
                  <div className="flex flex-col items-center justify-center py-6 animate-in fade-in duration-300">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 relative">
                       <div className="absolute inset-0 rounded-full border-4 border-emerald-200 animate-[ping_1.5s_infinite]"></div>
                       <svg className="w-10 h-10 text-emerald-600 animate-[bounce_1s_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg text-center">
                       {activeLesson.isCompleted ? 'Marked Incomplete' : 'Lesson Completed!'}
                    </h3>
                  </div>
                ) : (
                  <div className="text-center">
                     <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <h3 className="font-bold text-slate-800 text-lg mb-2">
                       {activeLesson.isCompleted ? 'Undo Completion?' : 'Mark as Complete?'}
                     </h3>
                     <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8 px-2">
                       {activeLesson.isCompleted 
                         ? 'Are you sure you want to mark this lesson as incomplete?' 
                         : 'Are you sure you want to mark this lesson as finished?'}
                     </p>
                     <div className="grid grid-cols-2 gap-3">
                       <button 
                         onClick={() => setShowCompleteModal(false)}
                         className="py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                       >
                         Cancel
                       </button>
                       <button 
                         onClick={handleConfirmComplete}
                         className="py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                       >
                         Confirm
                       </button>
                     </div>
                  </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
