const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required').isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 2000 }),
  body('dueDate').isISO8601().withMessage('Please provide a valid due date'),
  body('subject').optional().trim().isLength({ max: 50 }),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('points').optional().isInt({ min: 0, max: 1000 })
];

const updateTaskValidation = [
  body('title').optional().trim().notEmpty().isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 2000 }),
  body('dueDate').optional().isISO8601(),
  body('status').optional().isIn(['pending', 'completed']),
  body('subject').optional().trim().isLength({ max: 50 }),
  body('priority').optional().isIn(['low', 'medium', 'high']),
  body('points').optional().isInt({ min: 0, max: 1000 })
];

// Apply auth middleware to all routes
router.use(auth);

// Task CRUD
router.get('/', taskController.getTasks);
router.get('/subjects', taskController.getSubjects);
router.get('/:id', taskController.getTask);
router.post('/', taskValidation, taskController.createTask);
router.put('/:id', updateTaskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Actions
router.patch('/:id/toggle', taskController.toggleTaskStatus);
router.patch('/:id/turnin', taskController.turnInTask);
router.patch('/:id/pin', taskController.togglePin);

// Submissions
router.post('/:id/submissions', taskController.addSubmission);
router.delete('/:id/submissions/:submissionId', taskController.deleteSubmission);

// Comments
router.post('/:id/comments', taskController.addComment);
router.delete('/:id/comments/:commentId', taskController.deleteComment);

module.exports = router;
