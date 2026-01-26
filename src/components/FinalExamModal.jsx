
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Check, Trophy, BookOpen } from 'lucide-react';
import { generateFinalExamSubmissions } from '@/lib/GameLogic';
import './FinalExamModal.css';

function FinalExamModal({ 
  isOpen, 
  previousLevel, 
  nextLevel, 
  playerPhilosophy, 
  onComplete, 
  onClose 
}) {
  const [submissions, setSubmissions] = useState([]);
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [grades, setGrades] = useState({});
  const [showCompletion, setShowCompletion] = useState(false);
  const [bonusXP, setBonusXP] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const newSubmissions = generateFinalExamSubmissions(playerPhilosophy);
      setSubmissions(newSubmissions);
      setCurrentSubmissionIndex(0);
      setGrades({});
      setShowCompletion(false);
      setBonusXP(0);
    }
  }, [isOpen, playerPhilosophy]);

  const handleGrade = (grade) => {
    setGrades(prev => ({
      ...prev,
      [currentSubmissionIndex]: grade
    }));

    if (currentSubmissionIndex < submissions.length - 1) {
      setTimeout(() => {
        setCurrentSubmissionIndex(prev => prev + 1);
      }, 400);
    } else {
      setTimeout(() => {
        calculateResults();
        setShowCompletion(true);
      }, 600);
    }
  };

  const calculateResults = () => {
    let totalBonus = 0;
    submissions.forEach(sub => {
      if (sub.isMatch) {
        totalBonus += 500;
      }
    });
    setBonusXP(totalBonus);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center final-exam-modal-overlay p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-4xl relative"
        >
          {/* Main Paper Container */}
          <div className="final-exam-paper rounded-lg p-8 md:p-12 min-h-[600px] flex flex-col relative overflow-hidden grading-cursor">
            
            {/* Header */}
            <div className="text-center border-b-4 border-stone-800 pb-6 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-2 tracking-widest exam-title-font">FINAL EXAMINATION</h1>
              <div className="flex items-center justify-center gap-4 text-stone-700 font-mono-typewriter text-sm uppercase tracking-wider">
                <span>Current: {previousLevel?.name || 'Unknown'}</span>
                <span className="text-stone-400">→</span>
                <span className="font-bold text-stone-900">Candidate: {nextLevel?.name || 'Unknown'}</span>
              </div>
            </div>

            {!showCompletion ? (
              <div className="flex-1 flex flex-col md:flex-row gap-8">
                {/* Left: Progress & Stats */}
                <div className="w-full md:w-1/3 space-y-8">
                  <div className="bg-white/50 p-6 rounded-sm border border-stone-300">
                    <h3 className="font-bold text-stone-800 uppercase tracking-widest text-xs mb-4">Exam Progress</h3>
                    <div className="flex gap-3 justify-center">
                      {submissions.map((_, idx) => (
                        <div 
                          key={idx}
                          className={`w-4 h-4 rounded-full border-2 border-stone-400 transition-colors duration-300
                            ${grades[idx] ? 'bg-green-500 border-green-600' : idx === currentSubmissionIndex ? 'bg-red-500 border-red-600 animate-pulse' : 'bg-stone-200'}
                          `}
                        />
                      ))}
                    </div>
                    <p className="text-center text-xs text-stone-500 mt-2 font-mono-typewriter">
                      {Object.keys(grades).length} / {submissions.length} Graded
                    </p>
                  </div>

                  {submissions[currentSubmissionIndex]?.isMatch && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-sm shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-yellow-800 uppercase mb-1">Philosophy Match</p>
                          <p className="text-xs text-yellow-700 leading-tight">
                            This submission aligns with your teaching philosophy. 
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right: Submission Paper */}
                <div className="w-full md:w-2/3 relative perspective-1000">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSubmissionIndex}
                      initial={{ opacity: 0, rotateX: -10 }}
                      animate={{ opacity: 1, rotateX: 0 }}
                      exit={{ opacity: 0, rotateX: 10 }}
                      transition={{ duration: 0.3 }}
                      className="submission-paper p-8 h-full min-h-[300px] flex flex-col justify-between border border-stone-200"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-6 border-b border-stone-100 pb-4">
                           <span className="font-handwriting text-2xl text-stone-800">Student #{currentSubmissionIndex + 101}</span>
                           <span className="text-xs font-mono-typewriter text-stone-400">ID: {submissions[currentSubmissionIndex]?.id}</span>
                        </div>
                        
                        <h3 className="font-serif font-bold text-xl mb-4 text-stone-900">
                          {submissions[currentSubmissionIndex]?.title}
                        </h3>
                        
                        <p className={`font-serif text-lg leading-relaxed text-stone-700 italic
                           ${submissions[currentSubmissionIndex]?.style === 'handwritten' ? 'font-handwriting' : ''}
                           ${submissions[currentSubmissionIndex]?.style === 'typed' ? 'font-mono-typewriter' : ''}
                        `}>
                          "{submissions[currentSubmissionIndex]?.excerpt}"
                        </p>
                      </div>

                      <div className="mt-8 pt-6 border-t-2 border-stone-100">
                        <p className="text-center text-xs text-stone-400 uppercase tracking-widest mb-4">Select Grade</p>
                        <div className="flex justify-center gap-4">
                          <button 
                            onClick={() => handleGrade('A')}
                            className="grading-btn grading-btn-a w-16 h-16 rounded-full border-4 border-stone-200 font-bold text-2xl text-stone-400 flex items-center justify-center bg-white shadow-sm"
                          >
                            A+
                          </button>
                          <button 
                            onClick={() => handleGrade('B')}
                            className="grading-btn grading-btn-b w-16 h-16 rounded-full border-4 border-stone-200 font-bold text-2xl text-stone-400 flex items-center justify-center bg-white shadow-sm"
                          >
                            B
                          </button>
                          <button 
                            onClick={() => handleGrade('C')}
                            className="grading-btn grading-btn-c w-16 h-16 rounded-full border-4 border-stone-200 font-bold text-2xl text-stone-400 flex items-center justify-center bg-white shadow-sm"
                          >
                            C
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center celebration-bg rounded-lg p-8 border border-stone-200"
              >
                <div className="mb-6 bg-yellow-100 p-4 rounded-full border-4 border-yellow-300 shadow-inner">
                  <Trophy className="w-16 h-16 text-yellow-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-stone-900 mb-2">Examination Complete</h2>
                <p className="text-stone-600 mb-8 max-w-md">
                  You have successfully graded all submissions. Your dedication to your philosophy has been noted by the district.
                </p>

                <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden mb-8">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 border-b border-stone-200">
                      <tr>
                        <th className="p-3 text-xs font-bold text-stone-500 uppercase">Submission</th>
                        <th className="p-3 text-xs font-bold text-stone-500 uppercase">Philosophy Match</th>
                        <th className="p-3 text-xs font-bold text-stone-500 uppercase text-right">Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub, idx) => (
                        <tr key={sub.id} className="border-b border-stone-100 last:border-0">
                          <td className="p-3 text-sm text-stone-700 font-mono-typewriter">#{idx + 101}</td>
                          <td className="p-3">
                            {sub.isMatch ? (
                              <span className="inline-flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                                <Check className="w-3 h-3" /> MATCH
                              </span>
                            ) : (
                              <span className="text-stone-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="p-3 text-right font-mono-typewriter font-bold text-stone-800">
                            {sub.isMatch ? '+500' : '0'} XP
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-yellow-50">
                        <td colSpan="2" className="p-3 text-right font-bold text-stone-900 uppercase text-xs tracking-wider">Total Bonus</td>
                        <td className="p-3 text-right font-bold text-yellow-700">+{bonusXP} XP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={() => onComplete(bonusXP)}
                  className="bg-stone-800 hover:bg-stone-900 text-white text-lg font-bold py-4 px-12 rounded-sm shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-3"
                >
                  <BookOpen className="w-5 h-5" />
                  ACCEPT PROMOTION
                </button>
              </motion.div>
            )}

            {/* Decorative Stamps/Footer */}
            <div className="absolute bottom-4 left-6 opacity-30 pointer-events-none transform rotate-12">
               <div className="border-4 border-red-800 text-red-800 font-bold text-xl px-4 py-2 uppercase tracking-widest rounded-sm">
                 Official
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default FinalExamModal;
