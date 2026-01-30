const express = require('express');
const router = express.Router();
const {
  getProjectsForEvaluation,
  submitEvaluation,
  getMyEvaluations,
  updateEvaluation,
  getJudgeStats
} = require('../controllers/judgeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { evaluationValidation, validate } = require('../utils/validators');

// All routes are protected and require judge role
router.use(protect);
router.use(authorize('judge', 'admin'));

router.get('/projects', getProjectsForEvaluation);
router.post('/evaluate', evaluationValidation, validate, submitEvaluation);
router.get('/my-evaluations', getMyEvaluations);
router.put('/evaluate/:id', evaluationValidation, validate, updateEvaluation);
router.get('/stats', getJudgeStats);

module.exports = router;