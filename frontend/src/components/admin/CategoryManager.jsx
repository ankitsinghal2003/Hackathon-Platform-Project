import Navbar from '../common/Navbar';

const CategoryManager = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-8">
            Category <span className="gradient-text">Manager</span>
          </h1>
          <div className="card p-12 text-center">
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Category management coming soon
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryManager;