// Validate registration form
export const validateRegistration = (formData) => {
  const errors = {};

  // First name
  if (!formData.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  // Last name
  if (!formData.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Email
  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Password
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
    errors.password = 'Password must contain uppercase, lowercase, and number';
  }

  // Confirm password
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

// Validate login form
export const validateLogin = (formData) => {
  const errors = {};

  if (!formData.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  }

  return errors;
};

// Validate team creation
export const validateTeam = (formData) => {
  const errors = {};

  if (!formData.name?.trim()) {
    errors.name = 'Team name is required';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Team name must be at least 3 characters';
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Team name cannot exceed 50 characters';
  }

  if (!formData.category) {
    errors.category = 'Please select a category';
  }

  if (formData.description && formData.description.length > 500) {
    errors.description = 'Description cannot exceed 500 characters';
  }

  return errors;
};

// Validate project submission
export const validateProject = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = 'Project title is required';
  } else if (formData.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters';
  } else if (formData.title.trim().length > 100) {
    errors.title = 'Title cannot exceed 100 characters';
  }

  if (!formData.tagline?.trim()) {
    errors.tagline = 'Tagline is required';
  } else if (formData.tagline.trim().length > 200) {
    errors.tagline = 'Tagline cannot exceed 200 characters';
  }

  if (!formData.description?.trim()) {
    errors.description = 'Description is required';
  } else if (formData.description.trim().length < 50) {
    errors.description = 'Description must be at least 50 characters';
  } else if (formData.description.trim().length > 5000) {
    errors.description = 'Description cannot exceed 5000 characters';
  }

  if (!formData.problemStatement?.trim()) {
    errors.problemStatement = 'Problem statement is required';
  } else if (formData.problemStatement.trim().length > 2000) {
    errors.problemStatement = 'Problem statement cannot exceed 2000 characters';
  }

  if (!formData.solution?.trim()) {
    errors.solution = 'Solution is required';
  } else if (formData.solution.trim().length > 2000) {
    errors.solution = 'Solution cannot exceed 2000 characters';
  }

  if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
    errors.demoUrl = 'Please enter a valid URL';
  }

  if (formData.githubUrl) {
    if (!isValidUrl(formData.githubUrl)) {
      errors.githubUrl = 'Please enter a valid URL';
    } else if (!formData.githubUrl.includes('github.com')) {
      errors.githubUrl = 'Must be a GitHub URL';
    }
  }

  return errors;
};

// Validate evaluation
export const validateEvaluation = (formData) => {
  const errors = {};

  const criteria = ['innovation', 'technical', 'implementation', 'impact'];

  criteria.forEach(criterion => {
    const score = formData.scores?.[criterion]?.score;
    if (score === undefined || score === null || score === '') {
      errors[criterion] = `${capitalize(criterion)} score is required`;
    } else if (score < 0 || score > 10) {
      errors[criterion] = 'Score must be between 0 and 10';
    }
  });

  return errors;
};

// Validate file upload
export const validateFile = (file, maxSize = 10 * 1024 * 1024) => {
  const errors = [];

  if (!file) {
    errors.push('No file selected');
    return errors;
  }

  if (file.size > maxSize) {
    errors.push(`File size exceeds ${maxSize / 1024 / 1024}MB`);
  }

  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-rar-compressed',
  ];

  if (!allowedTypes.includes(file.type)) {
    errors.push('File type not allowed');
  }

  return errors;
};

// Helper functions
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default {
  validateRegistration,
  validateLogin,
  validateTeam,
  validateProject,
  validateEvaluation,
  validateFile,
};