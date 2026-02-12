
import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import CourseCard from './components/CourseCard';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import { COURSES } from './constants';
import { Course } from './types';

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);
  const [recentlyWatchedId, setRecentlyWatchedId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial app resource loading
    const loadTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500);

    const savedSession = localStorage.getItem('kithademics_session');
    const savedRecent = localStorage.getItem('kithademics_recent_course');
    if (savedSession) {
      setIsLoggedIn(true);
      setShowLanding(false);
    }
    if (savedRecent) {
      setRecentlyWatchedId(savedRecent);
    }

    return () => clearTimeout(loadTimer);
  }, []);

  const handleLogin = (name: string) => {
    setIsLoggedIn(true);
    setShowLanding(false);
    localStorage.setItem('kithademics_session', name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLanding(true);
    localStorage.removeItem('kithademics_session');
    setActiveTab('home');
  };

  // Navigates to Course Detail View or redirects to WhatsApp if locked
  const handleCourseClick = (id: string) => {
    const course = COURSES.find(c => c.id === id);
    if (!course) return;

    if (course.isLocked) {
      // Redirect to WhatsApp
      const message = `Assalamu Alaikum, I am interested in purchasing the course: "${course.title}". Please assist me.`;
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    setSelectedCourseId(id);
    setActiveTab('course-detail');
  };

  // Navigates to Player from Detail View or "Continue"
  const handlePlayLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('player');
    
    // If we have a selected course ID, update recent
    if (selectedCourseId) {
      setRecentlyWatchedId(selectedCourseId);
      localStorage.setItem('kithademics_recent_course', selectedCourseId);
    }
  };

  // Handles "Continue" from Dashboard - jumps straight to latest or first lesson
  const handleContinueCourse = (id: string) => {
    // Only continue if not locked (though recently watched usually implies access)
    const course = COURSES.find(c => c.id === id);
    if (!course) return;
    
    if (course.isLocked) {
        handleCourseClick(id); // Use the locked handler
        return;
    }

    setSelectedCourseId(id);
    // Find first incomplete or default to first
    const lessonToPlay = course.lessons.find(l => !l.isCompleted) || course.lessons[0];
    handlePlayLesson(lessonToPlay.id);
  };

  const handleBackToDashboard = () => {
    setSelectedCourseId(null);
    setActiveTab('home');
  };

  const handleBackToDetail = () => {
    setActiveTab('course-detail');
  };

  const handleSeeMoreCourses = () => {
    setActiveTab('courses');
  };

  if (isAppLoading) {
    return <LoadingScreen />;
  }

  if (showLanding && !isLoggedIn) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const recentlyWatchedCourse = recentlyWatchedId 
    ? COURSES.find(c => c.id === recentlyWatchedId) 
    : null;

  // Header Component
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 h-16 bg-cream/90 backdrop-blur-md z-50 flex items-center justify-between px-6">
      <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 5L61.2 21.2L80 20L78.8 38.8L95 50L78.8 61.2L80 80L61.2 78.8L50 95L38.8 78.8L20 80L21.2 61.2L5 50L21.2 38.8L20 20L38.8 21.2L50 5Z" stroke="#1a4731" strokeWidth="6" />
        </svg>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`p-2 transition-transform hover:scale-110 ${activeTab === 'profile' ? 'text-emerald-800' : 'text-emerald-dark'}`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </div>
    </header>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-12 flex items-center justify-between z-50">
      {[
        { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'courses', label: 'Courses', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.247 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
      ].map(item => (
        <button 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className="flex flex-col items-center justify-center space-y-1 group flex-1"
        >
          <div className={`p-1 transition-colors ${activeTab === item.id ? 'text-emerald-800' : 'text-slate-400'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
            </svg>
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === item.id ? 'text-emerald-800' : 'text-slate-300'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );

  const ProfileView = () => {
    const myCourses = COURSES.filter(c => !c.isLocked);
    const completedLessons = myCourses.reduce((acc, course) => acc + course.lessons.filter(l => l.isCompleted).length, 0);

    return (
      <div className="min-h-full flex flex-col bg-slate-50">
        <div className="bg-white p-6 pb-8 rounded-b-[2.5rem] shadow-sm mb-6 border-b border-emerald-900/5">
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem('kithademics_session') || 'Ahmed'}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="serif-font text-2xl font-bold text-emerald-dark">{localStorage.getItem('kithademics_session') || 'Student'}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Student ID: #8294</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-xl font-bold text-emerald-700">{myCourses.length}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Courses</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-xl font-bold text-emerald-700">{completedLessons}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lessons</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <p className="text-xl font-bold text-emerald-700">12h</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hours</p>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-8 pb-10 flex-1">
          {/* Subscription Section */}
          <section>
            <h3 className="text-sm font-bold text-slate-800 mb-4">My Subscription</h3>
            <div className="bg-emerald-900 text-white p-6 rounded-[1.5rem] relative overflow-hidden shadow-lg shadow-emerald-900/20 group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12 pointer-events-none"></div>
              
              <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mb-1">Current Plan</p>
                        <h4 className="text-xl font-bold serif-font">Seeker of Knowledge</h4>
                    </div>
                    <span className="bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 text-[10px] font-bold px-2.5 py-1 rounded text-emerald-100">ACTIVE</span>
                  </div>
                  <p className="text-xs text-emerald-200/70 mb-5 font-medium">Valid until December 31, 2025</p>
                  <button className="w-full py-2.5 bg-white text-emerald-900 rounded-xl text-xs font-bold transition-all hover:bg-emerald-50 shadow-sm">Manage Subscription</button>
              </div>
            </div>
          </section>

          {/* My Courses Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-800">My Learning</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full">{myCourses.length}</span>
            </div>
            <div className="space-y-4">
              {myCourses.map(course => (
                 <div key={course.id} onClick={() => handleCourseClick(course.id)} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center space-x-3 cursor-pointer group">
                    <img src={course.thumbnail} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                       <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">{course.title}</h4>
                       <div className="flex items-center justify-between mt-2 mb-1">
                          <span className="text-[9px] text-slate-400 font-bold">{course.progress}% Complete</span>
                       </div>
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{width: `${course.progress}%`}}></div>
                       </div>
                    </div>
                    <div className="pr-1">
                       <svg className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </div>
                 </div>
              ))}
              {myCourses.length === 0 && (
                 <div className="text-center py-8 bg-white rounded-2xl border border-slate-100 border-dashed">
                    <p className="text-xs text-slate-400">No active courses yet.</p>
                 </div>
              )}
            </div>
          </section>

          {/* Settings Section */}
          <div className="bg-white rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <span className="text-sm font-bold text-slate-700">Account Settings</span>
              </div>
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
            <button onClick={handleLogout} className="w-full px-6 py-5 flex items-center justify-between hover:bg-rose-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                </div>
                <span className="text-sm font-bold text-rose-600">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const CoursesView = () => {
    const myCourses = COURSES.filter(c => !c.isLocked);
    const paidCourses = COURSES.filter(c => c.isLocked);

    return (
      <div className="min-h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-end justify-between mb-8">
             <h1 className="serif-font text-2xl text-emerald-dark font-bold">Course Library</h1>
             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{COURSES.length} Total</span>
          </div>
          
          {/* Purchased Courses */}
          <section className="mb-10">
             <div className="flex items-center space-x-3 mb-5">
                <h2 className="text-sm font-bold text-slate-800">My Learning</h2>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{myCourses.length}</span>
             </div>
             {myCourses.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myCourses.map(course => (
                     <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
                  ))}
               </div>
             ) : (
                <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center">
                   <p className="text-xs text-slate-400">You haven't enrolled in any courses yet.</p>
                </div>
             )}
          </section>

          {/* Suppression / Divider */}
          <div className="relative py-6 mb-10">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
             </div>
             <div className="relative flex justify-center">
                <span className="bg-cream px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Explore Catalog</span>
             </div>
          </div>

          {/* Paid Courses */}
          <section>
             <div className="flex items-center space-x-3 mb-5">
                <h2 className="text-sm font-bold text-slate-800">Premium Courses</h2>
                <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{paidCourses.length}</span>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paidCourses.map(course => (
                   <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
                ))}
             </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  };

  // Hide nav/header for player and course-detail view
  const showNav = activeTab !== 'player' && activeTab !== 'course-detail';

  return (
    <div className="flex flex-col h-screen bg-cream overflow-hidden">
      {showNav && <Header />}
      
      <main className={`flex-1 overflow-y-auto ${showNav ? 'pt-16 pb-20' : ''}`}>
        {activeTab === 'home' && (
          <Dashboard 
            onCourseClick={handleContinueCourse} 
            onCourseSelect={handleCourseClick}
            onSeeMore={handleSeeMoreCourses}
            recentlyWatched={recentlyWatchedCourse} 
          />
        )}
        
        {activeTab === 'courses' && <CoursesView />}

        {activeTab === 'course-detail' && selectedCourseId && (
          <CourseDetail
            course={COURSES.find(c => c.id === selectedCourseId)!}
            onBack={handleBackToDashboard}
            onPlayLesson={handlePlayLesson}
          />
        )}
        
        {activeTab === 'profile' && <ProfileView />}
        
        {activeTab === 'player' && selectedCourseId && (
          <CoursePlayer 
            course={COURSES.find(c => c.id === selectedCourseId)!} 
            onBack={handleBackToDetail} 
            initialLessonId={selectedLessonId}
          />
        )}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default App;
