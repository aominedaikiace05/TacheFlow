import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import toast from 'react-hot-toast';
import api from '../services/api';
import { Plus, Filter, Calendar, CheckSquare, Clock, BookOpen, AlertCircle } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setShowTaskForm(false);
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(prev => prev.map(t => t._id === editingTask._id ? response.data.task : t));
      setEditingTask(null);
      setShowTaskForm(false);
      toast.success('Task updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(t => t._id !== taskId));
      toast.success('Task deleted!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/toggle`);
      setTasks(prev => prev.map(t => t._id === taskId ? response.data.task : t));
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePinTask = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/pin`);
      setTasks(prev => prev.map(t => t._id === taskId ? response.data.task : t));
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to pin task');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Filtering
  const filteredTasks = tasks.filter(task => {
    const statusMatch = filter === 'all' || filter === 'overdue'
      ? true
      : task.status === filter;
    const subjectMatch = subjectFilter === 'all' || task.subject === subjectFilter;
    const overdueMatch = filter === 'overdue'
      ? task.status === 'pending' && new Date(task.dueDate) < new Date()
      : true;
    return statusMatch && subjectMatch && overdueMatch;
  }).sort((a, b) => {
    // Pinned first
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  // Stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const overdueTasks = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate) < new Date()).length;

  // Get unique subjects
  const subjects = [...new Set(tasks.map(t => t.subject).filter(Boolean))];

  // Subject progress
  const subjectProgress = subjects.map(sub => {
    const subTasks = tasks.filter(t => t.subject === sub);
    const done = subTasks.filter(t => t.status === 'completed').length;
    return { name: sub, total: subTasks.length, done, pct: subTasks.length > 0 ? Math.round((done / subTasks.length) * 100) : 0 };
  });

  if (loading) {
    return <div className="loading">Loading your tasks...</div>;
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, {user.name}!</h1>
            <p>{overdueTasks > 0 ? `⚠️ You have ${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}` : 'All caught up — nice work!'}</p>
          </div>
          <button onClick={() => setShowTaskForm(true)} className="btn btn-primary add-task-btn">
            <Plus size={20} />
            Add Task
          </button>
        </div>

        {/* Due Soon Banner */}
        {(() => {
          const now = new Date();
          const dueToday = tasks.filter(t => t.status === 'pending' && new Date(t.dueDate).toDateString() === now.toDateString());
          if (dueToday.length === 0) return null;
          return (
            <div className="due-soon-banner">
              <span className="dsb-icon">⏰</span>
              <span className="dsb-text">
                <strong>{dueToday.length} task{dueToday.length > 1 ? 's' : ''} due today:</strong>{' '}
                {dueToday.map(t => t.title).join(', ')}
              </span>
            </div>
          );
        })()}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon"><CheckSquare size={24} /></div>
            <div className="stat-info"><h3>{totalTasks}</h3><p>Total Tasks</p></div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon"><Clock size={24} /></div>
            <div className="stat-info"><h3>{pendingTasks}</h3><p>Pending</p></div>
          </div>
          <div className="stat-card completed">
            <div className="stat-icon"><CheckSquare size={24} /></div>
            <div className="stat-info"><h3>{completedTasks}</h3><p>Completed</p></div>
          </div>
          <div className="stat-card overdue-card">
            <div className="stat-icon"><AlertCircle size={24} /></div>
            <div className="stat-info"><h3>{overdueTasks}</h3><p>Overdue</p></div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        {(() => {
          const now = new Date();
          const days = [];
          for (let i = 6; i >= 0; i--) {
            const d = new Date(now);
            d.setDate(d.getDate() - i);
            const dateStr = d.toDateString();
            const created = tasks.filter(t => new Date(t.createdAt).toDateString() === dateStr).length;
            const completed = tasks.filter(t => t.completedAt && new Date(t.completedAt).toDateString() === dateStr).length;
            days.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }), created, completed });
          }
          const maxCount = Math.max(...days.map(d => Math.max(d.created, d.completed)), 1);
          return (
            <div className="weekly-chart">
              <h3 className="section-title">📈 This Week's Activity</h3>
              <div className="chart-legend">
                <span className="legend-item"><span className="legend-dot created"></span> Created</span>
                <span className="legend-item"><span className="legend-dot completed"></span> Completed</span>
              </div>
              <div className="chart-bars">
                {days.map((d, i) => (
                  <div key={i} className="chart-bar-col">
                    <span className="chart-count">{d.created + d.completed}</span>
                    <div className="chart-bar-group">
                      <div className="chart-bar created-bar" style={{ height: `${(d.created / maxCount) * 100}%`, minHeight: d.created > 0 ? '8px' : '3px' }}></div>
                      <div className="chart-bar completed-bar" style={{ height: `${(d.completed / maxCount) * 100}%`, minHeight: d.completed > 0 ? '8px' : '3px' }}></div>
                    </div>
                    <span className="chart-label">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Subject Progress */}
        {subjectProgress.length > 0 && (
          <div className="subject-progress-section">
            <h3 className="section-title"><BookOpen size={18} /> Progress by Subject</h3>
            <div className="subject-progress-grid">
              {subjectProgress.map(sp => (
                <div key={sp.name} className="subject-progress-card">
                  <div className="sp-header">
                    <span className="sp-name">{sp.name}</span>
                    <span className="sp-count">{sp.done}/{sp.total}</span>
                  </div>
                  <div className="sp-bar">
                    <div className="sp-bar-fill" style={{ width: `${sp.pct}%` }}></div>
                  </div>
                  <span className="sp-pct">{sp.pct}% complete</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <Filter size={18} />
            <span>Status:</span>
            {['all', 'pending', 'completed', 'overdue'].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`filter-btn ${filter === f ? 'active' : ''}`}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {subjects.length > 0 && (
            <div className="filter-group subject-filter">
              <BookOpen size={18} />
              <span>Subject:</span>
              <button onClick={() => setSubjectFilter('all')} className={`filter-btn ${subjectFilter === 'all' ? 'active' : ''}`}>
                All
              </button>
              {subjects.map(s => (
                <button key={s} onClick={() => setSubjectFilter(s)} className={`filter-btn ${subjectFilter === s ? 'active' : ''}`}>
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Grid */}
        <div className="tasks-section">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} />
              <h3>No tasks found</h3>
              <p>
                {filter === 'all' && subjectFilter === 'all'
                  ? "You don't have any tasks yet. Create your first task!"
                  : "No tasks match your current filters."
                }
              </p>
              {filter === 'all' && subjectFilter === 'all' && (
                <button onClick={() => setShowTaskForm(true)} className="btn btn-primary">
                  <Plus size={18} /> Create Your First Task
                </button>
              )}
            </div>
          ) : (
            <div className="tasks-grid">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onToggle={handleToggleTask}
                  onPin={handlePinTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onClose={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
