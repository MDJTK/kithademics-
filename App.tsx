
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { auth } from './lib/firebase';
import { firebaseService } from './services/firebaseService';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import CoursePlayer from './pages/CoursePlayer';
import CourseCard from './components/CourseCard';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AdminPortal from './pages/AdminPortal';
import { COURSES as INITIAL_COURSES } from './constants';
import { Course } from './types';
import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined);
  const [recentlyWatchedId, setRecentlyWatchedId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [allProgress, setAllProgress] = useState<Record<string, string[]>>({});
  const [spotlightData, setSpotlightData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setShowLanding(false);
        
        // Fetch courses first
        const dbCourses = await firebaseService.getCourses();
        if (dbCourses && dbCourses.length > 0) {
          setCourses(dbCourses);
        }

        // Fetch spotlight
        const spotlight = await firebaseService.getSpotlight();
        if (spotlight) {
          setSpotlightData(spotlight);
        }

        // Ensure user profile exists
        const profile = await firebaseService.getUserProfile(firebaseUser.uid);
        if (profile) {
          setIsAdmin(profile.membershipType === 'admin');
          if (profile.recentlyWatchedCourseId) {
            setRecentlyWatchedId(profile.recentlyWatchedCourseId);
          }
        } else {
          await firebaseService.createUserProfile(
            firebaseUser.uid, 
            firebaseUser.email || '', 
            firebaseUser.displayName || 'Student'
          );
        }

        // Fetch progress
        const fetchedProgress = await firebaseService.getAllProgress(firebaseUser.uid);
        if (fetchedProgress) {
          setAllProgress(fetchedProgress);
        }
      } else {
        setUser(null);
        setShowLanding(true);
      }
      setIsAppLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync state when progress changes
  useEffect(() => {
    if (Object.keys(allProgress).length > 0) {
      setCourses(prevCourses => prevCourses.map(course => {
        const completedIds = allProgress[course.id] || [];
        const lessons = course.lessons.map(lesson => ({
          ...lesson,
          isCompleted: completedIds.includes(lesson.id)
        }));
        const progressPercent = lessons.length > 0 
          ? Math.round((lessons.filter(l => l.isCompleted).length / lessons.length) * 100)
          : 0;
        
        return {
          ...course,
          lessons,
          progress: progressPercent
        };
      }));
    }
  }, [allProgress]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRecentlyWatchedId(null);
      setIsAdmin(false);
      setActiveTab('home');
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleRefreshCourses = async () => {
    const dbCourses = await firebaseService.getCourses();
    if (dbCourses) setCourses(dbCourses);
  };

  const handleCourseClick = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;

    if (course.isLocked) {
      const message = `Assalamu Alaikum, I am interested in purchasing the course: "${course.title}". Please assist me.`;
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    setSelectedCourseId(id);
    setActiveTab('course-detail');
  };

  const handlePlayLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('player');
    
    if (selectedCourseId && user) {
      setRecentlyWatchedId(selectedCourseId);
    }
  };

  const handleContinueCourse = (id: string) => {
    const course = courses.find(c => c.id === id);
    if (!course) return;
    
    if (course.isLocked) {
        handleCourseClick(id);
        return;
    }

    setSelectedCourseId(id);
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

  if (showLanding && !user) {
    return <Landing onGetStarted={() => setShowLanding(false)} />;
  }

  if (!user) {
    return <Login onLogin={() => {}} />;
  }

  const recentlyWatchedCourse = recentlyWatchedId 
    ? courses.find(c => c.id === recentlyWatchedId) 
    : null;

  // Header Component
  const Header = () => (
    <header className="fixed top-0 left-0 right-0 h-16 bg-cream/90 backdrop-blur-md z-50 flex items-center justify-between px-6 border-b border-emerald-900/5">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer" 
        onClick={() => setActiveTab('home')}
      >
        <div className="w-8 h-8 bg-emerald-900 rounded-lg flex items-center justify-center rotate-45 group transition-all duration-500 hover:rotate-[225deg]">
          <i className="fi fi-rr-star text-white text-xs -rotate-45 group-hover:rotate-[135deg] transition-all duration-500"></i>
        </div>
        <span className="ml-3 serif-font font-bold text-lg text-emerald-900 tracking-tight">Kithademics</span>
      </motion.div>
      <div className="flex items-center">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('profile')}
          className={`p-2 transition-colors ${activeTab === 'profile' ? 'text-emerald-800' : 'text-emerald-dark opacity-60'}`}
        >
          <i className="fi fi-rr-user text-xl"></i>
        </motion.button>
      </div>
    </header>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-slate-100 px-12 flex items-center justify-between z-50">
      {[
        { id: 'home', label: 'Home', icon: 'fi-rr-home' },
        { id: 'courses', label: 'Courses', icon: 'fi-rr-book-open-reader' },
        { id: 'profile', label: 'Profile', icon: 'fi-rr-user' }
      ].map(item => (
        <button 
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className="flex flex-col items-center justify-center space-y-1 group flex-1 relative"
        >
          <motion.div 
            animate={{ 
              scale: activeTab === item.id ? 1.1 : 1,
              y: activeTab === item.id ? -2 : 0
            }}
            className={`p-1 transition-colors ${activeTab === item.id ? 'text-emerald-800' : 'text-slate-400'}`}
          >
            <i className={`fi ${item.icon} text-lg`}></i>
          </motion.div>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${activeTab === item.id ? 'text-emerald-800' : 'text-slate-300'}`}>
            {item.label}
          </span>
          {activeTab === item.id && (
            <motion.div 
              layoutId="nav-dot"
              className="absolute -top-1 w-1 h-1 bg-emerald-800 rounded-full"
            />
          )}
        </button>
      ))}
    </nav>
  );

  const ProfileView = () => {
    const myCourses = courses.filter(c => !c.isLocked);
    const completedLessonsCount = myCourses.reduce((acc, course) => acc + course.lessons.filter(l => l.isCompleted).length, 0);

    return (
      <div className="min-h-full flex flex-col bg-slate-50">
        <div className="bg-white p-6 pb-8 rounded-b-[2.5rem] shadow-sm mb-6 border-b border-emerald-900/5">
          <div className="flex flex-col items-center space-y-4 pt-4">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              <img src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.displayName || 'Ahmed'}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="serif-font text-2xl font-bold text-emerald-dark">{user?.displayName || 'Student'}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Student ID: #8294</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <i className="fi fi-rr-book-alt text-emerald-600 opacity-60 text-sm mb-1 block"></i>
              <p className="text-xl font-bold text-emerald-700">{myCourses.length}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Courses</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <i className="fi fi-rr-trophy text-emerald-600 opacity-60 text-sm mb-1 block"></i>
              <p className="text-xl font-bold text-emerald-700">{completedLessonsCount}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Lessons</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl text-center border border-slate-100">
              <i className="fi fi-rr-time-watched text-emerald-600 opacity-60 text-sm mb-1 block"></i>
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
                       <i className="fi fi-rr-angle-small-right text-slate-300 group-hover:text-emerald-500 transition-colors text-lg"></i>
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
            {isAdmin && (
              <button onClick={() => setActiveTab('admin')} className="w-full px-6 py-5 flex items-center justify-between hover:bg-emerald-50 transition-colors border-b border-slate-50 group text-left">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 transition-colors">
                    <i className="fi fi-rr-rectangle-list text-lg"></i>
                  </div>
                  <span className="text-sm font-bold text-emerald-900 transition-colors">Admin Console</span>
                </div>
                <i className="fi fi-rr-angle-small-right text-slate-300 group-hover:text-emerald-500 transition-colors text-lg"></i>
              </button>
            )}
            <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors border-b border-slate-50 group text-left">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                  <i className="fi fi-rr-settings text-lg"></i>
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">Account Settings</span>
              </div>
              <i className="fi fi-rr-angle-small-right text-slate-300 group-hover:text-emerald-500 transition-colors text-lg"></i>
            </button>
            <button onClick={handleLogout} className="w-full px-6 py-5 flex items-center justify-between hover:bg-rose-50 transition-colors group text-left">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-400 group-hover:bg-rose-100 group-hover:text-rose-600 transition-colors">
                  <i className="fi fi-rr-exit text-lg"></i>
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
    const myCourses = courses.filter(c => !c.isLocked);
    const paidCourses = courses.filter(c => c.isLocked);

    return (
      <div className="min-h-full flex flex-col">
        <div className="p-6 flex-1">
          <div className="flex items-end justify-between mb-8">
             <h1 className="serif-font text-2xl text-emerald-dark font-bold">Course Library</h1>
             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{courses.length} Total</span>
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
  const showNav = activeTab !== 'player' && activeTab !== 'course-detail' && activeTab !== 'admin';

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
            spotlightData={spotlightData}
            courses={courses}
          />
        )}
        
        {activeTab === 'courses' && <CoursesView />}

        {activeTab === 'admin' && (
          <AdminPortal 
            courses={courses} 
            onRefreshCourses={handleRefreshCourses}
            onBack={() => setActiveTab('home')} 
          />
        )}

        {activeTab === 'course-detail' && selectedCourseId && (
          <CourseDetail
            course={courses.find(c => c.id === selectedCourseId)!}
            onBack={handleBackToDashboard}
            onPlayLesson={handlePlayLesson}
          />
        )}
        
        {activeTab === 'profile' && <ProfileView />}
        
        {activeTab === 'player' && selectedCourseId && (
          <CoursePlayer 
            course={courses.find(c => c.id === selectedCourseId)!} 
            onBack={handleBackToDetail} 
            initialLessonId={selectedLessonId}
            onProgressUpdate={(lessonId, isCompleted) => {
              setAllProgress(prev => {
                const current = prev[selectedCourseId] || [];
                const next = isCompleted 
                  ? [...new Set([...current, lessonId])]
                  : current.filter(id => id !== lessonId);
                return { ...prev, [selectedCourseId]: next };
              });
            }}
          />
        )}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

export default App;
