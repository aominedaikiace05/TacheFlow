import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ChevronLeft, ChevronRight, CheckCircle, Clock } from 'lucide-react';
import './CalendarView.css';

const CalendarView = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasks(res.data.tasks);
      } catch (e) { /* ignore */ }
    };
    fetchTasks();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getTasksForDay = (day) => {
    return tasks.filter(t => {
      const d = new Date(t.dueDate);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="calendar-page">
      <div className="container">
        <div className="calendar-header">
          <h1>📅 Calendar</h1>
          <div className="month-nav">
            <button onClick={prevMonth} className="month-btn"><ChevronLeft size={20} /></button>
            <span className="month-label">{monthNames[month]} {year}</span>
            <button onClick={nextMonth} className="month-btn"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="calendar-grid">
          {dayNames.map(d => <div key={d} className="cal-day-name">{d}</div>)}
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="cal-cell empty"></div>;
            const dayTasks = getTasksForDay(day);
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
            return (
              <div key={day} className={`cal-cell ${isToday ? 'today' : ''} ${dayTasks.length > 0 ? 'has-tasks' : ''}`}>
                <span className="cal-day-num">{day}</span>
                <div className="cal-tasks">
                  {dayTasks.slice(0, 3).map(t => (
                    <div
                      key={t._id}
                      className={`cal-task-dot ${t.status}`}
                      onClick={() => navigate(`/task/${t._id}`)}
                      title={t.title}
                    >
                      {t.status === 'completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                      <span>{t.title.slice(0, 12)}{t.title.length > 12 ? '…' : ''}</span>
                    </div>
                  ))}
                  {dayTasks.length > 3 && <span className="cal-more">+{dayTasks.length - 3} more</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
