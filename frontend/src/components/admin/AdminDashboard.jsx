import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import { FiUsers, FiFileText, FiFolder, FiAward } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await adminService.getDashboardStats();
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
            Admin <span className="gradient-text">Dashboard</span>
          </h1>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6">
              <FiUsers className="text-blue-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {stats?.overview?.totalUsers || 0}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Total Users</div>
            </div>

            <div className="card p-6">
              <FiFolder className="text-green-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {stats?.overview?.totalTeams || 0}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Teams</div>
            </div>

            <div className="card p-6">
              <FiFileText className="text-purple-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {stats?.overview?.totalProjects || 0}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Projects</div>
            </div>

            <div className="card p-6">
              <FiAward className="text-orange-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {stats?.overview?.totalEvaluations || 0}
              </div>
              <div className="text-slate-600 dark:text-slate-400">Evaluations</div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/admin/users" className="card p-6 hover-lift">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Manage Users</h3>
              <p className="text-slate-600 dark:text-slate-400">
                View and manage all users
              </p>
            </Link>

            <Link to="/admin/categories" className="card p-6 hover-lift">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-bold mb-2">Manage Categories</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Edit hackathon categories
              </p>
            </Link>

            <Link to="/admin/submissions" className="card p-6 hover-lift">
              <div className="text-4xl mb-4">📤</div>
              <h3 className="text-xl font-bold mb-2">View Submissions</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Monitor project submissions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;