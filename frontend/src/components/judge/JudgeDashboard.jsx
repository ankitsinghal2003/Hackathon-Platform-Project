import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { judgeService } from '../../services/adminService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import { FiFileText, FiCheckCircle, FiClock } from 'react-icons/fi';

const JudgeDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await judgeService.getStats();
      setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-8">
            Judge <span className="gradient-text">Dashboard</span>
          </h1>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6">
              <FiFileText className="text-blue-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">{stats?.totalProjects || 0}</div>
              <div className="text-slate-600 dark:text-slate-400">Total Projects</div>
            </div>

            <div className="card p-6">
              <FiCheckCircle className="text-green-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">{stats?.evaluated || 0}</div>
              <div className="text-slate-600 dark:text-slate-400">Evaluated</div>
            </div>

            <div className="card p-6">
              <FiClock className="text-orange-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">{stats?.pending || 0}</div>
              <div className="text-slate-600 dark:text-slate-400">Pending</div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/judge/projects" className="card p-8 hover-lift">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold mb-2">View Projects</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Browse and evaluate submitted projects
              </p>
            </Link>

            <Link to="/judge/projects?evaluated=true" className="card p-8 hover-lift">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">My Evaluations</h3>
              <p className="text-slate-600 dark:text-slate-400">
                View projects you've already evaluated
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default JudgeDashboard;