// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized to access this route'
        });
      }
  
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role '${req.user.role}' is not authorized to access this route`
        });
      }
  
      next();
    };
  };
  
  // Check if user is team leader
  exports.isTeamLeader = async (req, res, next) => {
    try {
      const Team = require('../models/Team');
      const teamId = req.params.teamId || req.body.teamId;
  
      if (!teamId) {
        return res.status(400).json({
          success: false,
          message: 'Team ID is required'
        });
      }
  
      const team = await Team.findById(teamId);
  
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }
  
      if (team.leader.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Only team leader can perform this action'
        });
      }
  
      req.team = team;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking team leadership',
        error: error.message
      });
    }
  };
  
  // Check if user is team member
  exports.isTeamMember = async (req, res, next) => {
    try {
      const Team = require('../models/Team');
      const teamId = req.params.teamId || req.body.teamId || req.user.team;
  
      if (!teamId) {
        return res.status(400).json({
          success: false,
          message: 'Team ID is required'
        });
      }
  
      const team = await Team.findById(teamId);
  
      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }
  
      const isMember = team.isMember(req.user._id);
  
      if (!isMember) {
        return res.status(403).json({
          success: false,
          message: 'You are not a member of this team'
        });
      }
  
      req.team = team;
      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error checking team membership',
        error: error.message
      });
    }
  };
  
  // Check if user owns resource
  exports.isOwner = (model) => {
    return async (req, res, next) => {
      try {
        const Model = require(`../models/${model}`);
        const resourceId = req.params.id;
  
        const resource = await Model.findById(resourceId);
  
        if (!resource) {
          return res.status(404).json({
            success: false,
            message: `${model} not found`
          });
        }
  
        // Check ownership (different models have different owner fields)
        const ownerId = resource.user || resource.createdBy || resource.submittedBy;
  
        if (ownerId.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'You do not have permission to access this resource'
          });
        }
  
        req.resource = resource;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: 'Error checking ownership',
          error: error.message
        });
      }
    };
  };