
import React, { useState, useEffect } from 'react';
import { firebaseService } from '../services/firebaseService';
import { Course, Lesson } from '../types';
import { motion } from 'motion/react';

interface AdminPortalProps {
  courses: Course[];
  onRefreshCourses: () => void;
  onBack: () => void;
}

const AdminPortal: React.FC<AdminPortalProps> = ({ courses, onRefreshCourses, onBack }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'users' | 'spotlight'>('courses');
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [spotlightForm, setSpotlightForm] = useState({
    title: '',
    quote: '',
    author: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (activeTab === 'users') {
      firebaseService.getAllUsers().then(data => data && setUsers(data));
    }
    if (activeTab === 'spotlight') {
      firebaseService.getSpotlight().then(data => data && setSpotlightForm(data));
    }
  }, [activeTab]);

  const handleSaveCourse = async () => {
    if (!editingCourse?.title || !editingCourse?.id) return;
    await firebaseService.saveCourse(editingCourse as Course);
    setEditingCourse(null);
    onRefreshCourses();
  };

  const handleSaveSpotlight = async () => {
    await firebaseService.saveSpotlight(spotlightForm);
    alert('Spotlight updated!');
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    await firebaseService.updateUserMembership(userId, role);
    const data = await firebaseService.getAllUsers();
    data && setUsers(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-emerald-900 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold serif-font uppercase italic">Admin Portal</h1>
            <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest mt-1">Console v1.0</p>
          </div>
          <button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
            <i className="fi fi-rr-cross text-xs"></i>
          </button>
        </div>

        <div className="flex space-x-6 mt-8">
          {(['courses', 'users', 'spotlight'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-white border-b-2 border-emerald-400 pb-2' : 'text-emerald-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6">
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
               <h2 className="text-emerald-900 font-bold text-lg">Course Inventory</h2>
               <button 
                onClick={() => setEditingCourse({ id: `course-${Date.now()}`, title: '', lessons: [], isLocked: false, price: '0', instructor: '' })}
                className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest"
               >
                 Add New Course
               </button>
            </div>

            {editingCourse ? (
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xl space-y-4">
                 <h3 className="font-bold text-emerald-900">Edit Course: {editingCourse.id}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Title" 
                      value={editingCourse.title || ''} 
                      onChange={e => setEditingCourse({...editingCourse, title: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Instructor" 
                      value={editingCourse.instructor || ''} 
                      onChange={e => setEditingCourse({...editingCourse, instructor: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Thumbnail URL" 
                      value={editingCourse.thumbnail || ''} 
                      onChange={e => setEditingCourse({...editingCourse, thumbnail: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                    />
                    <input 
                      type="text" 
                      placeholder="Price (e.g. Free or $49)" 
                      value={editingCourse.price || ''} 
                      onChange={e => setEditingCourse({...editingCourse, price: e.target.value})}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                    />
                 </div>
                 <div className="flex items-center space-x-3 p-4 bg-emerald-50 rounded-2xl">
                    <input 
                      type="checkbox" 
                      checked={editingCourse.isLocked} 
                      onChange={e => setEditingCourse({...editingCourse, isLocked: e.target.checked})}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">Locked (Premium)</span>
                 </div>
                 <div className="flex space-x-3 pt-4">
                    <button onClick={handleSaveCourse} className="flex-1 bg-emerald-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest">Save Course</button>
                    <button onClick={() => setEditingCourse(null)} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest">Cancel</button>
                 </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                       <img src={course.thumbnail} className="w-12 h-12 rounded-xl object-cover" />
                       <div>
                          <h4 className="text-xs font-bold text-emerald-950">{course.title}</h4>
                          <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mt-0.5">{course.lessons.length} Lessons • {course.isLocked ? 'Premium' : 'Free'}</p>
                       </div>
                    </div>
                    <button onClick={() => setEditingCourse(course)} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                       <i className="fi fi-rr-edit text-xs"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            <h2 className="text-emerald-900 font-bold text-lg">Student Directory</h2>
            <div className="grid grid-cols-1 gap-4">
               {users.map(u => (
                 <div key={u.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.displayName}`} />
                          </div>
                          <div>
                             <h4 className="text-xs font-bold text-emerald-950">{u.displayName}</h4>
                             <p className="text-[9px] text-slate-400 font-medium">{u.email}</p>
                          </div>
                       </div>
                       <select 
                        value={u.membershipType || 'free'} 
                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                        className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-700 border-none rounded-lg p-2"
                       >
                         <option value="free">Free</option>
                         <option value="pro">Pro</option>
                         <option value="admin">Admin</option>
                       </select>
                    </div>
                    <div className="flex gap-2">
                       <div className="bg-slate-50 px-3 py-2 rounded-xl flex-1 text-center">
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Enrolled</p>
                          <p className="text-[10px] font-black text-emerald-800">Jan 12, 24</p>
                       </div>
                       <div className="bg-slate-50 px-3 py-2 rounded-xl flex-1 text-center">
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Expiry</p>
                          <p className="text-[10px] font-black text-rose-600">Dec 31, 24</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeTab === 'spotlight' && (
          <div className="space-y-6">
             <h2 className="text-emerald-900 font-bold text-lg">Experience Control</h2>
             <div className="bg-white p-6 rounded-[2.5rem] border border-emerald-100 shadow-xl space-y-4">
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Spotlight Headline</label>
                   <input 
                    type="text" 
                    value={spotlightForm.title} 
                    onChange={e => setSpotlightForm({...spotlightForm, title: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Daily Quote</label>
                   <textarea 
                    value={spotlightForm.quote} 
                    onChange={e => setSpotlightForm({...spotlightForm, quote: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs min-h-[100px]"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Quote Author</label>
                   <input 
                    type="text" 
                    value={spotlightForm.author} 
                    onChange={e => setSpotlightForm({...spotlightForm, author: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Background Image URL</label>
                   <input 
                    type="text" 
                    value={spotlightForm.imageUrl} 
                    onChange={e => setSpotlightForm({...spotlightForm, imageUrl: e.target.value})}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-none text-xs"
                   />
                </div>
                <button onClick={handleSaveSpotlight} className="w-full bg-emerald-900 text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest mt-6">Apply Changes</button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPortal;
