const Card = ({ children, className = '', hover = false, onClick }) => {
  const baseClasses = 'bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;