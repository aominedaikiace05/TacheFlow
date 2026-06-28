import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Save, Calendar, CheckSquare, Camera } from 'lucide-react';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const photoInputRef = useRef(null);

  useEffect(() => {
    if (user) { setName(user.name); setEmail(user.email); }
    // Load saved profile photo from localStorage
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) setProfilePhoto(savedPhoto);
    const fetchTasks = async () => {
      try { const res = await api.get('/tasks'); setTasks(res.data.tasks); } catch (e) {}
    };
    fetchTasks();
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
      localStorage.setItem('profilePhoto', reader.result);
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/profile', { name, email });
      toast.success('Profile updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    try {
      await api.put('/auth/change-password', { currentPassword, newPassword });
      toast.success('Password changed!');
      setCurrentPassword(''); setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const totalPoints = tasks.filter(t => t.status === 'completed').reduce((s, t) => s + (t.points || 0), 0);

  return (
    <div className="profile-page">
      <div className="container">
        <h1><User size={28} /> Profile</h1>

        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="profile-avatar-img" />
                ) : (
                  <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                )}
              </div>
              <input
                type="file"
                ref={photoInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className="photo-upload-btn"
                onClick={() => photoInputRef.current && photoInputRef.current.click()}
              >
                <Camera size={14} /> Change Photo
              </button>
            </div>
            <h2>{user?.name}</h2>
            <p className="profile-email">{user?.email}</p>
            <div className="profile-stats">
              <div className="p-stat"><CheckSquare size={16} /><span>{completedTasks} tasks completed</span></div>
              <div className="p-stat"><Calendar size={16} /><span>{tasks.length} total tasks</span></div>
              <div className="p-stat">⭐<span>{totalPoints} points earned</span></div>
            </div>
          </div>

          <div className="profile-forms">
            <form onSubmit={handleUpdateProfile} className="profile-form-card">
              <h3>Edit Profile</h3>
              <div className="form-group">
                <label className="form-label"><User size={16} /> Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label"><Mail size={16} /> Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-input" required />
              </div>
              <button type="submit" className="btn btn-primary"><Save size={16} /> Save Changes</button>
            </form>

            <form onSubmit={handleChangePassword} className="profile-form-card">
              <h3>Change Password</h3>
              <div className="form-group">
                <label className="form-label"><Lock size={16} /> Current Password</label>
                <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="form-input" required />
              </div>
              <div className="form-group">
                <label className="form-label"><Lock size={16} /> New Password</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="form-input" placeholder="Min. 6 characters" required />
              </div>
              <button type="submit" className="btn btn-primary"><Lock size={16} /> Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
