import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, FileText, Type, BookOpen, Flag, Award, Paperclip, Plus, Trash2, Upload } from 'lucide-react';
import './TaskForm.css';

const SUBJECTS_PRESET = [
  'CPE 401', 'CPE 402', 'Math 201', 'Physics 101', 'English 102',
  'Electronics', 'Programming', 'Database', 'Networking', 'Other'
];

const TaskForm = ({ task, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    subject: '',
    priority: 'medium',
    points: 0
  });
  const [loading, setLoading] = useState(false);
  const [customSubject, setCustomSubject] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [newAttachName, setNewAttachName] = useState('');
  const [newAttachUrl, setNewAttachUrl] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (task) {
      const subjectInPreset = SUBJECTS_PRESET.includes(task.subject);
      setCustomSubject(!subjectInPreset && task.subject !== '');
      setFormData({
        title: task.title,
        description: task.description || '',
        dueDate: new Date(task.dueDate).toISOString().split('T')[0],
        subject: task.subject || '',
        priority: task.priority || 'medium',
        points: task.points || 0
      });
      setAttachments(task.attachments || []);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setFormData(prev => ({
        ...prev,
        dueDate: tomorrow.toISOString().split('T')[0]
      }));
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectSelect = (e) => {
    const val = e.target.value;
    if (val === '__custom__') {
      setCustomSubject(true);
      setFormData(prev => ({ ...prev, subject: '' }));
    } else {
      setCustomSubject(false);
      setFormData(prev => ({ ...prev, subject: val }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    const taskData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: new Date(formData.dueDate).toISOString(),
      points: Number(formData.points) || 0,
      attachments
    };

    await onSubmit(taskData);
    setLoading(false);
  };

  const handleAddAttachment = () => {
    if (!newAttachName.trim() || !newAttachUrl.trim()) return;
    setAttachments(prev => [...prev, { name: newAttachName.trim(), url: newAttachUrl.trim(), type: 'link' }]);
    setNewAttachName('');
    setNewAttachUrl('');
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      // Create a local URL for the file (in production, you'd upload to cloud storage)
      const fileUrl = URL.createObjectURL(file);
      setAttachments(prev => [...prev, { 
        name: file.name, 
        url: fileUrl, 
        type: 'file',
        size: file.size,
        fileObj: file
      }]);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  return (
    <div className="task-form-overlay" onClick={onClose}>
      <div className="task-form-modal" onClick={e => e.stopPropagation()}>
        <div className="task-form-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          {/* Title */}
          <div className="form-group">
            <label className="form-label">
              <Type size={18} />
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter task title..."
              maxLength={100}
              required
            />
          </div>

          {/* Subject + Priority row */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">
                <BookOpen size={18} />
                Subject / Class
              </label>
              {!customSubject ? (
                <select
                  value={formData.subject || ''}
                  onChange={handleSubjectSelect}
                  className="form-input"
                >
                  <option value="">No subject</option>
                  {SUBJECTS_PRESET.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  <option value="__custom__">+ Custom subject...</option>
                </select>
              ) : (
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Type subject name..."
                  maxLength={50}
                />
              )}
            </div>

            <div className="form-group flex-1">
              <label className="form-label">
                <Flag size={18} />
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="form-input"
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              <FileText size={18} />
              Instructions / Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Add instructions or details..."
              maxLength={2000}
              rows={4}
            />
          </div>

          {/* Due Date + Points row */}
          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">
                <Calendar size={18} />
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input"
                min={getTodayDate()}
                required
              />
            </div>

            <div className="form-group flex-1">
              <label className="form-label">
                <Award size={18} />
                Points
              </label>
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
                className="form-input"
                min="0"
                max="1000"
                placeholder="0"
              />
            </div>
          </div>

          {/* Attachments */}
          <div className="form-group">
            <label className="form-label">
              <Paperclip size={18} />
              Attachments (PDF, links, reference files)
            </label>

            {attachments.length > 0 && (
              <div className="attachments-list">
                {attachments.map((att, i) => (
                  <div key={i} className="attachment-item">
                    <span className="attachment-name">{att.type === 'file' ? '📄' : '🔗'} {att.name}</span>
                    {att.type === 'link' && (
                      <a href={att.url} target="_blank" rel="noreferrer" className="attachment-url">{att.url}</a>
                    )}
                    {att.type === 'file' && att.size && (
                      <span className="attachment-url">{(att.size / 1024).toFixed(1)} KB</span>
                    )}
                    <button type="button" className="attachment-remove" onClick={() => handleRemoveAttachment(i)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File upload button */}
            <div className="file-upload-section">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.xlsx,.pptx,.zip"
                style={{ display: 'none' }}
                id="file-upload-input"
              />
              <button
                type="button"
                className="btn btn-secondary file-upload-btn"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                <Upload size={16} /> Upload File
              </button>
              <span className="file-upload-hint">PDF, DOC, images, etc.</span>
            </div>
            <small style={{ color: '#a0aec0', fontSize: '0.78rem' }}>
              Upload files directly from your computer.
            </small>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading || !formData.title.trim()}>
              {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
