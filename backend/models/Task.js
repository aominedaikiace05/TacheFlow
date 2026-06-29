const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'file' } // file, link
});

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 1000 },
  createdAt: { type: Date, default: Date.now }
});

const submissionSchema = new mongoose.Schema({
  type: { type: String, enum: ['link', 'text', 'file'], required: true },
  content: { type: String, required: true },
  fileName: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  subject: {
    type: String,
    trim: true,
    maxlength: [50, 'Subject cannot exceed 50 characters'],
    default: ''
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  turnedIn: {
    type: Boolean,
    default: false
  },
  turnedInAt: {
    type: Date
  },
  pinned: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 30
  }],
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  points: {
    type: Number,
    default: 0,
    min: 0,
    max: 1000
  },
  earnedPoints: {
    type: Number,
    default: null,
    min: 0,
    max: 1000
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  submissions: [submissionSchema],
  comments: [commentSchema],
  attachments: [attachmentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Update completedAt when status changes to completed
taskSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'completed' && !this.completedAt) {
      this.completedAt = new Date();
    } else if (this.status === 'pending') {
      this.completedAt = null;
    }
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
