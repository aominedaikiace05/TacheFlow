import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Award, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import './GradesPage.css';

const GradesPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try { const res = await api.get('/tasks'); setTasks(res.data.tasks); } catch (e) {}
    };
    fetchTasks();
  }, []);

  const subjects = [...new Set(tasks.map(t => t.subject).filter(Boolean))];

  const subjectGrades = subjects.map(sub => {
    const subTasks = tasks.filter(t => t.subject === sub && t.points > 0);
    const graded = subTasks.filter(t => t.earnedPoints !== null && t.earnedPoints !== undefined);
    const totalPossible = subTasks.reduce((sum, t) => sum + t.points, 0);
    const earned = subTasks.reduce((sum, t) => sum + (t.earnedPoints !== null && t.earnedPoints !== undefined ? t.earnedPoints : 0), 0);
    const pct = totalPossible > 0 ? Math.round((earned / totalPossible) * 100) : 0;
    return { name: sub, earned, totalPossible, graded: graded.length, total: subTasks.length, pct };
  });

  const overallEarned = subjectGrades.reduce((s, g) => s + g.earned, 0);
  const overallPossible = subjectGrades.reduce((s, g) => s + g.totalPossible, 0);
  const overallPct = overallPossible > 0 ? Math.round((overallEarned / overallPossible) * 100) : 0;

  const getGradeLetter = (pct) => {
    if (pct >= 90) return 'A';
    if (pct >= 80) return 'B';
    if (pct >= 70) return 'C';
    if (pct >= 60) return 'D';
    return 'F';
  };

  return (
    <div className="grades-page">
      <div className="container">
        <h1><Award size={28} /> Gradebook</h1>

        <div className="overall-grade">
          <div className="grade-circle">
            <span className="grade-letter">{getGradeLetter(overallPct)}</span>
            <span className="grade-pct">{overallPct}%</span>
          </div>
          <div className="grade-info">
            <h2>Overall Grade</h2>
            <p>{overallEarned} / {overallPossible} points earned</p>
          </div>
        </div>

        {subjectGrades.length === 0 ? (
          <div className="grades-empty">
            <p>No graded tasks yet. Create tasks with points to see your grades here.</p>
          </div>
        ) : (
          <div className="grades-list">
            {subjectGrades.map(g => (
              <div key={g.name} className="grade-card">
                <div className="grade-card-header">
                  <BookOpen size={18} />
                  <span className="grade-subject">{g.name}</span>
                  <span className="grade-card-letter">{getGradeLetter(g.pct)}</span>
                </div>
                <div className="grade-bar">
                  <div className="grade-bar-fill" style={{ width: `${g.pct}%` }}></div>
                </div>
                <div className="grade-card-stats">
                  <span><CheckCircle size={14} /> {g.graded}/{g.total} graded</span>
                  <span><TrendingUp size={14} /> {g.earned}/{g.totalPossible} pts ({g.pct}%)</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GradesPage;
