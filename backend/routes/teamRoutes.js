const express = require('express');
const router = express.Router();
const {
  createTeam,
  getTeams,
  getTeam,
  updateTeam,
  joinTeam,
  leaveTeam,
  removeMember,
  deleteTeam,
  getTeamMembers
} = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const { isTeamLeader, isTeamMember } = require('../middleware/roleMiddleware');
const { createTeamValidation, validate } = require('../utils/validators');

router.post('/', protect, createTeamValidation, validate, createTeam);
router.get('/', getTeams);
router.get('/:id', getTeam);
router.put('/:id', protect, isTeamLeader, updateTeam);
router.post('/join', protect, joinTeam);
router.delete('/:id/leave', protect, isTeamMember, leaveTeam);
router.delete('/:id/members/:userId', protect, isTeamLeader, removeMember);
router.delete('/:id', protect, isTeamLeader, deleteTeam);
router.get('/:id/members', getTeamMembers);

module.exports = router;