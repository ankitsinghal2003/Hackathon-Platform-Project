import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Loader from '../components/common/Loader';
import { projectService } from '../services/projectService';
import { FaTrophy } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';

const Leaderboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const fetchProjects = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const data = await projectService.getProjects(params);
      const sorted = data.data.sort((a, b) => (b.averageScore || 0) - (a.averageScore || 0));
      setProjects(sorted);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (index) => {
    if (index === 0) return 'bg-yellow-500 text-white';
    if (index === 1) return 'bg-gray-400 text-white';
    if (index === 2) return 'bg-orange-600 text-white';
    return 'bg-slate-200 dark:bg-slate-700';
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold text-center mb-6">
            <FaTrophy className="inline mb-2" /> <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-xl text-center text-slate-600 dark:text-slate-400 mb-12">
            Top performing projects in HackFlow 2025
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`}
            >
              All Categories
            </button>
          </div>

          {/* Leaderboard */}
          <div className="max-w-4xl mx-auto">
            {projects.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-xl text-slate-600 dark:text-slate-400">
                  No projects submitted yet
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project._id} className="card p-6 hover-lift">
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className={`w-16 h-16 rounded-full ${getRankColor(index)} flex items-center justify-center text-2xl font-bold`}>
                        {index + 1}
                      </div>

                      {/* Project Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">{project.tagline}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <FiUsers size={16} />
                            {project.team?.name || 'Team'}
                          </span>
                          <span className="badge badge-primary">
                            {project.category?.name || 'Category'}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-3xl font-bold gradient-text">
                          {project.averageScore?.toFixed(1) || 0}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          / 100
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Leaderboard;