import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Edit, Trash2, CheckCircle, Clock, ExternalLink, BookOpen, Pin } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onToggle, onPin }) => {
  const navigate = useNavigate();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return task.status === 'pending' && dueDate < today;
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isLate = () => {
    if (!task.turnedIn || !task.turnedInAt) return false;
    return new Date(task.turnedInAt) > new Date(task.dueDate);
  };

  const renderDueDateInfo = () => {
    if (task.turnedIn) {
      return (
        <div className={`due-date ${isLate() ? 'overdue' : 'completed'}`}>
          <CheckCircle size={16} />
          {isLate() ? 'Turned in late' : 'Turned in'}
        </div>
      );
    }

    if (task.status === 'completed') {
      return (
        <div className="due-date completed">
          <CheckCircle size={16} />
          Completed
        </div>
      );
    }

    const daysUntilDue = getDaysUntilDue();
    const overdue = isOverdue();

    if (overdue) {
      return (
        <div className="due-date overdue">
          <Clock size={16} />
          {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''} overdue
        </div>
      );
    }
    if (daysUntilDue === 0) return <div className="due-date today"><Clock size={16} />Due today</div>;
    if (daysUntilDue === 1) return <div className="due-date tomorrow"><Clock size={16} />Due tomorrow</div>;
    if (daysUntilDue <= 3) return <div className="due-date soon"><Clock size={16} />Due in {daysUntilDue} days</div>;
    return <div className="due-date normal"><Calendar size={16} />Due {formatDate(task.dueDate)}</div>;
  };

  const priorityColors = { high: '#f56565', medium: '#f6ad55', low: '#48bb78' };

  return (
    <div className={`task-card ${task.status} ${isOverdue() ? 'overdue' : ''}`}>
      {/* Priority indicator */}
      <div className="priority-bar" style={{ background: priorityColors[task.priority] || '#f6ad55' }}></div>

      <div className="task-header">
        <div className="task-status">
          <button
            onClick={() => onToggle(task._id)}
            className={`status-toggle ${task.status}`}
            title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
          >
            {task.status === 'completed' ? <CheckCircle size={20} /> : <div className="pending-circle" />}
          </button>
        </div>
        <div className="task-actions">
          <button onClick={() => onPin && onPin(task._id)} className={`btn-icon pin ${task.pinned ? 'pinned' : ''}`} title={task.pinned ? 'Unpin' : 'Pin'}>
            <Pin size={16} />
          </button>
          <button onClick={() => onEdit(task)} className="btn-icon edit" title="Edit"><Edit size={16} /></button>
          <button onClick={() => onDelete(task._id)} className="btn-icon delete" title="Delete"><Trash2 size={16} /></button>
        </div>
      </div>

      <div className="task-content" onClick={() => navigate(`/task/${task._id}`)} style={{ cursor: 'pointer' }}>
        {/* Subject tag */}
        {task.subject && (
          <div className="task-subject-tag">
            <BookOpen size={12} />
            {task.subject}
          </div>
        )}

        <h3 className={`task-title ${task.status === 'completed' ? 'completed' : ''}`}>
          {task.title}
        </h3>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-footer">
          {renderDueDateInfo()}
          <div className="task-meta-row">
            {task.points > 0 && (
              <span className="points-badge">{task.points} pts</span>
            )}
            <button
              className="open-task-btn"
              onClick={(e) => { e.stopPropagation(); navigate(`/task/${task._id}`); }}
              title="Open task"
            >
              <ExternalLink size={14} />
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
