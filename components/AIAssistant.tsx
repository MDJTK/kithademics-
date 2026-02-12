
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await geminiService.chat(messages, input);
      const aiMessage: ChatMessage = { role: 'model', parts: [{ text: response }] };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-[2.5rem] shadow-2xl w-[420px] h-[640px] flex flex-col border border-emerald-100 overflow-hidden animate-in slide-in-from-bottom-8 zoom-in-95 duration-500">
          {/* Header */}
          <div className="bg-emerald-900 p-6 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
              </svg>
            </div>
            <div className="flex items-center space-x-4 relative z-10">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">Study Assistant</h4>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold">Online & Scholarly</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors relative z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.length === 0 && (
              <div className="text-center py-12 px-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <p className="serif-font text-xl text-slate-800 font-bold mb-3 italic">
                  "Assalamu Alaikum"
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  How can I support your study of the Islamic Sciences today? I can help with Fiqh, Seerah, or clarify concepts from your current lessons.
                </p>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}>
                {msg.role === 'model' && (
                  <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0 mb-1">
                    <span className="text-[10px] text-white font-bold">K</span>
                  </div>
                )}
                <div 
                  className={`max-w-[80%] px-5 py-3.5 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-[1.5rem] rounded-br-none shadow-emerald-600/10' 
                    : 'bg-white border border-slate-100 text-slate-700 rounded-[1.5rem] rounded-bl-none'
                  }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] text-white font-bold animate-pulse">K</span>
                </div>
                <div className="bg-white border border-slate-100 rounded-[1.5rem] rounded-bl-none px-5 py-3.5 flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about your lesson..."
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-5 pr-14 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`absolute right-2 top-2 p-2.5 rounded-xl transition-all ${
                  input.trim() 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-slate-200 text-slate-400'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">
              Academic Support Mode • 2.0
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-emerald-900 text-white pl-6 pr-8 py-5 rounded-[2rem] shadow-2xl hover:bg-emerald-800 transition-all transform hover:scale-105 flex items-center space-x-4 group border border-white/10"
        >
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-900 z-10 animate-pulse"></div>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none mb-1">Knowledge Hub</p>
            <p className="text-sm font-bold tracking-tight">AI Study Tutor</p>
          </div>
        </button>
      )}
    </div>
  );
};

export default AIAssistant;
