const upload = require('../config/multer');

// Handle file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error'
    });
  }
  next();
};

// Single file upload
exports.uploadSingle = (fieldName) => {
  return [
    upload.single(fieldName),
    handleUploadError
  ];
};

// Multiple files upload
exports.uploadMultiple = (fieldName, maxCount = 5) => {
  return [
    upload.array(fieldName, maxCount),
    handleUploadError
  ];
};

// Multiple fields upload
exports.uploadFields = (fields) => {
  return [
    upload.fields(fields),
    handleUploadError
  ];
};

// Project files upload (mixed fields)
exports.uploadProjectFiles = [
  upload.fields([
    { name: 'projectFiles', maxCount: 5 },
    { name: 'screenshots', maxCount: 10 }
  ]),
  handleUploadError
];

// Profile picture upload
exports.uploadProfilePicture = [
  upload.single('profilePicture'),
  handleUploadError
];