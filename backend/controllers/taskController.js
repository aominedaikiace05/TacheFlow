const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Get all tasks for the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const { status, sort, subject, priority } = req.query;
    let query = { userId: req.user._id };

    if (status && ['pending', 'completed'].includes(status)) {
      query.status = status;
    }
    if (subject) {
      query.subject = subject;
    }
    if (priority && ['low', 'medium', 'high'].includes(priority)) {
      query.priority = priority;
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'dueDate') sortOption = { dueDate: 1 };
    else if (sort === 'title') sortOption = { title: 1 };
    else if (sort === 'priority') sortOption = { priority: -1 };

    const tasks = await Task.find(query).sort(sortOption);

    res.json({ success: true, count: tasks.length, tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Get all unique subjects for a user
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Task.distinct('subject', {
      userId: req.user._id,
      subject: { $ne: '' }
    });
    res.json({ success: true, subjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ success: true, task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error while fetching task' });
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { title, description, dueDate, subject, priority, points, attachments } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      subject: subject || '',
      priority: priority || 'medium',
      points: points || 0,
      attachments: attachments || [],
      userId: req.user._id
    });

    await task.save();
    res.status(201).json({ success: true, message: 'Task created successfully', task });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, dueDate, status, subject, priority, points, attachments } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;
    if (subject !== undefined) task.subject = subject;
    if (priority !== undefined) task.priority = priority;
    if (points !== undefined) task.points = points;
    if (attachments !== undefined) task.attachments = attachments;

    await task.save();
    res.json({ success: true, message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error while updating task' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};

// Toggle task status
exports.toggleTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.json({ success: true, message: `Task marked as ${task.status}`, task });
  } catch (error) {
    console.error('Toggle task status error:', error);
    res.status(500).json({ message: 'Server error while updating task status' });
  }
};

// Turn in a task
exports.turnInTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.turnedIn) {
      // Unsubmit
      task.turnedIn = false;
      task.turnedInAt = null;
    } else {
      task.turnedIn = true;
      task.turnedInAt = new Date();
      task.status = 'completed';
      task.completedAt = new Date();
    }
    await task.save();
    res.json({ success: true, message: task.turnedIn ? 'Turned in!' : 'Unsubmitted', task });
  } catch (error) {
    console.error('Turn in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add submission to task
exports.addSubmission = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { type, content, fileName } = req.body;
    if (!type || !content) return res.status(400).json({ message: 'Type and content required' });
    if (!['link', 'text', 'file'].includes(type)) return res.status(400).json({ message: 'Invalid type' });

    task.submissions.push({ type, content, fileName });
    await task.save();
    res.json({ success: true, message: 'Submission added', task });
  } catch (error) {
    console.error('Add submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a submission
exports.deleteSubmission = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.submissions = task.submissions.filter(s => s._id.toString() !== req.params.submissionId);
    await task.save();
    res.json({ success: true, message: 'Submission removed', task });
  } catch (error) {
    console.error('Delete submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment to task
exports.addComment = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ message: 'Comment text is required' });

    task.comments.push({ text: text.trim() });
    await task.save();
    res.json({ success: true, message: 'Comment added', task });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.comments = task.comments.filter(c => c._id.toString() !== req.params.commentId);
    await task.save();
    res.json({ success: true, message: 'Comment deleted', task });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Toggle pin/star
exports.togglePin = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.pinned = !task.pinned;
    await task.save();
    res.json({ success: true, message: task.pinned ? 'Task pinned' : 'Task unpinned', task });
  } catch (error) {
    console.error('Toggle pin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
