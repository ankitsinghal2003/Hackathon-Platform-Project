// Generate random string
exports.generateRandomString = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
  };
  
  // Generate unique invite code
  exports.generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };
  
  // Calculate pagination
  exports.getPagination = (page = 1, limit = 10) => {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;
    
    return {
      page: pageNum,
      limit: limitNum,
      skip
    };
  };
  
  // Format pagination response
  exports.formatPaginationResponse = (data, total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    
    return {
      data,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  };
  
  // Remove sensitive fields from object
  exports.removeSensitiveFields = (obj, fields = ['password', '__v']) => {
    const newObj = { ...obj };
    fields.forEach(field => {
      delete newObj[field];
    });
    return newObj;
  };
  
  // Format date to readable string
  exports.formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Calculate time remaining
  exports.getTimeRemaining = (endDate) => {
    const total = Date.parse(endDate) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds,
      isExpired: total <= 0
    };
  };
  
  // Slugify string
  exports.slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };
  
  // Generate avatar URL (using UI Avatars)
  exports.generateAvatarUrl = (name) => {
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=6366f1&color=fff&size=200`;
  };
  
  // Check if date is in range
  exports.isDateInRange = (date, startDate, endDate) => {
    const checkDate = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return checkDate >= start && checkDate <= end;
  };
  
  // Calculate percentage
  exports.calculatePercentage = (value, total) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(2);
  };
  
  // Sort array of objects by field
  exports.sortByField = (array, field, order = 'asc') => {
    return array.sort((a, b) => {
      if (order === 'asc') {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
  };
  
  // Group array by field
  exports.groupBy = (array, key) => {
    return array.reduce((result, item) => {
      (result[item[key]] = result[item[key]] || []).push(item);
      return result;
    }, {});
  };
  
  // Sanitize filename
  exports.sanitizeFilename = (filename) => {
    return filename
      .replace(/[^a-z0-9.-]/gi, '_')
      .toLowerCase();
  };
  
  // Get file extension
  exports.getFileExtension = (filename) => {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  };
  
  // Format file size
  exports.formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };
  
  // Deep clone object
  exports.deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  
  // Check if object is empty
  exports.isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  
  // Capitalize first letter
  exports.capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  // Generate random color
  exports.generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };