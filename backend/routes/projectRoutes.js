const express = require('express');
const router = express.Router();
const {
  createProject,
  submitProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const { isTeamMember } = require('../middleware/roleMiddleware');
const { uploadProjectFiles } = require('../middleware/uploadMiddleware');
const { projectSubmissionValidation, validate, idValidation } = require('../utils/validators');

router.post('/', protect, isTeamMember, uploadProjectFiles, projectSubmissionValidation, validate, createProject);
router.post('/:id/submit', protect, isTeamMember, idValidation, validate, submitProject);
router.get('/', getProjects);
router.get('/:id', idValidation, validate, getProject);
router.put('/:id', protect, isTeamMember, idValidation, validate, updateProject);
router.delete('/:id', protect, isTeamMember, idValidation, validate, deleteProject);

module.exports = router;