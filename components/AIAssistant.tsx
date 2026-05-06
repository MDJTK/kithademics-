
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';

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
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-[420px] h-[640px] flex flex-col border border-emerald-100 overflow-hidden soft-shadow"
          >
            {/* Header */}
            <div className="bg-emerald-900 p-6 flex items-center justify-between text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <i className="fi fi-rr-book-open-reader text-8xl"></i>
              </div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <i className="fi fi-rr-sparkles text-2xl text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight font-serif">Study Assistant</h4>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <p className="text-[10px] text-emerald-300 uppercase tracking-widest font-bold">Online & Scholarly</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors relative z-10">
                <i className="fi fi-rr-cross-small text-xl"></i>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              {messages.length === 0 && (
                <div className="text-center py-12 px-8">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <i className="fi fi-rr-info text-2xl"></i>
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
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
                >
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
                </motion.div>
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
                  className={`absolute right-2 top-2 p-2.5 rounded-xl transition-all flex items-center justify-center ${
                    input.trim() 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  <i className="fi fi-rr-paper-plane text-lg"></i>
                </button>
              </div>
              <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-4">
                Academic Support Mode • 2.0
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-emerald-900 text-white pl-6 pr-8 py-5 rounded-[2rem] shadow-2xl hover:bg-emerald-800 transition-all flex items-center space-x-4 group border border-white/10"
        >
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-emerald-900 z-10 animate-pulse"></div>
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-inner">
              <i className="fi fi-rr-messages text-2xl"></i>
            </div>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest leading-none mb-1">Knowledge Hub</p>
            <p className="text-sm font-bold tracking-tight">AI Study Tutor</p>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default AIAssistant;
