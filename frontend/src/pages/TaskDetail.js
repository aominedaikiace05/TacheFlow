import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Link2,
  FileText,
  Type,
  Send,
  Trash2,
  ExternalLink,
  File,
  Paperclip,
  Upload
} from 'lucide-react';
import './TaskDetail.css';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submissionType, setSubmissionType] = useState('text');
  const [submissionContent, setSubmissionContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submissionFileRef = useRef(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data.task);
    } catch (error) {
      toast.error('Failed to load task');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!submissionContent.trim()) {
      toast.error('Please enter your submission');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        type: submissionType,
        content: submissionContent.trim(),
        fileName: submissionType === 'file' ? fileName : undefined
      };
      const response = await api.post(`/tasks/${id}/submissions`, payload);
      setTask(response.data.task);
      setSubmissionContent('');
      setFileName('');
      toast.success('Submission added!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    if (!window.confirm('Remove this submission?')) return;
    try {
      const response = await api.delete(`/tasks/${id}/submissions/${submissionId}`);
      setTask(response.data.task);
      toast.success('Submission removed');
    } catch (error) {
      toast.error('Failed to remove submission');
    }
  };

  const handleToggleStatus = async () => {
    try {
      const response = await api.patch(`/tasks/${id}/toggle`);
      setTask(response.data.task);
      toast.success(`Task marked as ${response.data.task.status}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleTurnIn = async () => {
    try {
      const response = await api.patch(`/tasks/${id}/turnin`);
      setTask(response.data.task);
      toast.success(response.data.message);
    } catch (error) {
      toast.error('Failed to turn in');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const text = e.target.commentText.value;
    if (!text.trim()) return;
    try {
      const response = await api.post(`/tasks/${id}/comments`, { text });
      setTask(response.data.task);
      e.target.commentText.value = '';
      toast.success('Comment added');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await api.delete(`/tasks/${id}/comments/${commentId}`);
      setTask(response.data.task);
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  const getDueDateStatus = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return { label: 'Overdue', className: 'overdue' };
    if (diffDays === 0) return { label: 'Due Today', className: 'today' };
    if (diffDays === 1) return { label: 'Due Tomorrow', className: 'tomorrow' };
    if (diffDays <= 7) return { label: `Due in ${diffDays} days`, className: 'soon' };
    return { label: `Due ${due.toLocaleDateString()}`, className: 'normal' };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="task-detail-loading">Loading task...</div>;
  }

  if (!task) {
    return <div className="task-detail-loading">Task not found</div>;
  }

  const dueDateInfo = getDueDateStatus(task.dueDate);

  return (
    <div className="task-detail">
      <div className="container">
        {/* Header */}
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="task-detail-card">
          {/* Task Info */}
          <div className="task-detail-header">
            <div className="task-detail-status">
              <button className="status-toggle-btn" onClick={handleToggleStatus}>
                {task.status === 'completed' ? (
                  <CheckCircle size={28} className="status-icon completed" />
                ) : (
                  <Circle size={28} className="status-icon pending" />
                )}
              </button>
              <div>
                <h1 className={task.status === 'completed' ? 'title-completed' : ''}>
                  {task.title}
                </h1>
                <span className={`status-label ${task.status}`}>
                  {task.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
            <span className={`due-badge ${dueDateInfo.className}`}>
              <Calendar size={14} />
              {dueDateInfo.label}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <div className="task-detail-description">
              <h3>Instructions</h3>
              <p>{task.description}</p>
            </div>
          )}

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div className="task-attachments">
              <h3>📎 Attachments</h3>
              <div className="attachments-detail-list">
                {task.attachments.map((att, i) => (
                  <a key={i} href={att.url} target="_blank" rel="noreferrer" className="attachment-detail-item">
                    <FileText size={18} />
                    <span className="att-name">{att.name}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="task-detail-meta">
            <div className="meta-item">
              <Calendar size={16} />
              <span>Due: {formatDate(task.dueDate)}</span>
            </div>
            <div className="meta-item">
              <Clock size={16} />
              <span>Created: {formatDateTime(task.createdAt)}</span>
            </div>
            {task.completedAt && (
              <div className="meta-item">
                <CheckCircle size={16} />
                <span>Completed: {formatDateTime(task.completedAt)}</span>
              </div>
            )}
            {task.subject && (
              <div className="meta-item">
                <span className="detail-subject-tag">{task.subject}</span>
              </div>
            )}
            {task.points > 0 && (
              <div className="meta-item">
                <span className="detail-points">
                  {task.earnedPoints !== null && task.earnedPoints !== undefined 
                    ? `${task.earnedPoints}/${task.points} points` 
                    : `${task.points} points`}
                </span>
              </div>
            )}
          </div>

          {/* Turn In Button */}
          <div className="turnin-section">
            <button
              className={`btn turnin-btn ${task.turnedIn ? 'turned-in' : 'btn-primary'}`}
              onClick={handleTurnIn}
            >
              {task.turnedIn ? (
                <><CheckCircle size={18} /> Unsubmit</>
              ) : (
                <><Send size={18} /> Turn In</>
              )}
            </button>
            {task.turnedIn && task.turnedInAt && (
              <span className="turnin-info">
                Turned in {formatDateTime(task.turnedInAt)}
                {new Date(task.turnedInAt) > new Date(task.dueDate) && (
                  <span className="late-tag">LATE</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Submissions Section */}
        <div className="submissions-section">
          <h2>
            <Paperclip size={22} />
            Submissions
            {task.submissions?.length > 0 && (
              <span className="submission-count">{task.submissions.length}</span>
            )}
          </h2>

          {/* Existing submissions */}
          {task.submissions && task.submissions.length > 0 && (
            <div className="submissions-list">
              {task.submissions.map((sub) => (
                <div key={sub._id} className={`submission-item type-${sub.type}`}>
                  <div className="submission-icon">
                    {sub.type === 'link' && <Link2 size={18} />}
                    {sub.type === 'text' && <Type size={18} />}
                    {sub.type === 'file' && <File size={18} />}
                  </div>
                  <div className="submission-content">
                    <span className="submission-type-label">{sub.type.toUpperCase()}</span>
                    {sub.type === 'link' ? (
                      <a href={sub.content} target="_blank" rel="noreferrer" className="submission-link">
                        {sub.content}
                        <ExternalLink size={14} />
                      </a>
                    ) : sub.type === 'file' ? (
                      <div className="submission-file">
                        <span className="file-name">{sub.fileName || 'Uploaded file'}</span>
                        <a href={sub.content} target="_blank" rel="noreferrer" className="file-link">
                          Open File <ExternalLink size={14} />
                        </a>
                      </div>
                    ) : (
                      <p className="submission-text">{sub.content}</p>
                    )}
                    <span className="submission-time">{formatDateTime(sub.submittedAt)}</span>
                  </div>
                  <button
                    className="submission-delete"
                    onClick={() => handleDeleteSubmission(sub._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add submission form */}
          <div className="submission-form-card">
            {/* Score Entry */}
            {task.points > 0 && (
              <div style={{ marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a202c' }}>My Score:</span>
                <input
                  type="number"
                  min="0"
                  max={task.points}
                  value={task.earnedPoints !== null && task.earnedPoints !== undefined ? task.earnedPoints : ''}
                  placeholder="—"
                  onChange={async (e) => {
                    const val = e.target.value === '' ? null : Number(e.target.value);
                    try {
                      const response = await api.put(`/tasks/${task._id}`, { earnedPoints: val });
                      setTask(response.data.task);
                    } catch (err) {
                      toast.error('Failed to save score');
                    }
                  }}
                  style={{ width: '70px', padding: '8px 12px', borderRadius: '8px', border: '2px solid #e2e8f0', fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}
                />
                <span style={{ fontSize: '0.95rem', color: '#718096', fontWeight: 600 }}>/ {task.points}</span>
              </div>
            )}

            <h3>Add Submission</h3>

            {/* Type selector */}
            <div className="type-selector">
              <button
                className={`type-btn ${submissionType === 'text' ? 'active' : ''}`}
                onClick={() => setSubmissionType('text')}
              >
                <Type size={16} />
                Type Answer
              </button>
              <button
                className={`type-btn ${submissionType === 'link' ? 'active' : ''}`}
                onClick={() => setSubmissionType('link')}
              >
                <Link2 size={16} />
                Submit Link
              </button>
              <button
                className={`type-btn ${submissionType === 'file' ? 'active' : ''}`}
                onClick={() => setSubmissionType('file')}
              >
                <FileText size={16} />
                Submit PDF/File
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="submission-form">
              {submissionType === 'text' && (
                <textarea
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  placeholder="Type your answer here..."
                  className="form-input form-textarea submission-textarea"
                  rows={5}
                />
              )}

              {submissionType === 'link' && (
                <input
                  type="url"
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  placeholder="https://drive.google.com/... or any URL"
                  className="form-input"
                />
              )}

              {submissionType === 'file' && (
                <div className="file-submission">
                  <input
                    type="file"
                    ref={submissionFileRef}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFileName(file.name);
                        setSubmissionContent(URL.createObjectURL(file));
                      }
                    }}
                    accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.pptx,.zip"
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary file-upload-btn"
                    onClick={() => submissionFileRef.current && submissionFileRef.current.click()}
                    style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px', border: '2px dashed #cbd5e0', borderRadius: '10px', background: '#f8fafc', color: '#667eea', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Upload size={16} /> Upload File
                  </button>
                  {fileName && (
                    <div style={{ padding: '10px 14px', background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: '8px', marginBottom: '12px', fontSize: '0.88rem', color: '#276749' }}>
                      📄 {fileName}
                    </div>
                  )}
                  <p className="file-hint" style={{ color: '#a0aec0', fontSize: '0.8rem' }}>
                    Or paste a link below (Google Drive, Dropbox, etc.)
                  </p>
                  <input
                    type="url"
                    value={submissionContent.startsWith('blob:') ? '' : submissionContent}
                    onChange={(e) => {
                      setSubmissionContent(e.target.value);
                      setFileName('');
                    }}
                    placeholder="https://drive.google.com/... (optional if file uploaded)"
                    className="form-input"
                    style={{ marginTop: '8px' }}
                  />
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={submitting || !submissionContent.trim()}
              >
                <Send size={18} />
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2>
            💬 Comments
            {task.comments?.length > 0 && (
              <span className="submission-count">{task.comments.length}</span>
            )}
          </h2>

          {task.comments && task.comments.length > 0 && (
            <div className="comments-list">
              {task.comments.map(comment => (
                <div key={comment._id} className="comment-item">
                  <div className="comment-body">
                    <p>{comment.text}</p>
                    <span className="comment-time">{formatDateTime(comment.createdAt)}</span>
                  </div>
                  <button className="submission-delete" onClick={() => handleDeleteComment(comment._id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={handleAddComment} className="comment-form">
            <input
              type="text"
              name="commentText"
              placeholder="Add a comment..."
              className="form-input"
            />
            <button type="submit" className="btn btn-primary comment-submit-btn">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
