import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import Countdown from '../common/Countdown';
import { FiUsers, FiUpload, FiAward, FiCalendar } from 'react-icons/fi';
import { HACKATHON_END } from '../../utils/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStats({
        hasTeam: !!user?.team,
        submissions: 0,
        evaluations: 0
      });
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
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">
              Welcome back, <span className="gradient-text">{user?.firstName}</span>!
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's your hackathon dashboard
            </p>
          </div>

          {/* Countdown */}
          <div className="card p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Time Remaining</h2>
            <Countdown targetDate={HACKATHON_END} />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="card p-6">
              <FiUsers className="text-primary-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">
                {stats.hasTeam ? '1' : '0'}
              </div>
              <div className="text-slate-600 dark:text-slate-400">
                Team{stats.hasTeam ? ' Joined' : 's'}
              </div>
            </div>

            <div className="card p-6">
              <FiUpload className="text-green-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">{stats.submissions}</div>
              <div className="text-slate-600 dark:text-slate-400">Submissions</div>
            </div>

            <div className="card p-6">
              <FiAward className="text-yellow-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">{stats.evaluations}</div>
              <div className="text-slate-600 dark:text-slate-400">Evaluations</div>
            </div>

            <div className="card p-6">
              <FiCalendar className="text-blue-600 mb-3" size={32} />
              <div className="text-3xl font-bold mb-1">$21K</div>
              <div className="text-slate-600 dark:text-slate-400">Prize Pool</div>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {!stats.hasTeam ? (
              <>
                <Link to="/team/create" className="card p-8 hover-lift">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-2xl font-bold mb-2">Create a Team</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Start your own team and invite others to join
                  </p>
                </Link>

                <Link to="/team/join" className="card p-8 hover-lift">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold mb-2">Join a Team</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Use an invite code to join an existing team
                  </p>
                </Link>
              </>
            ) : (
              <>
                <Link to="/team" className="card p-8 hover-lift">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-2xl font-bold mb-2">Manage Team</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    View and manage your team members
                  </p>
                </Link>

                <Link to="/submit" className="card p-8 hover-lift">
                  <div className="text-4xl mb-4">📤</div>
                  <h3 className="text-2xl font-bold mb-2">Submit Project</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Upload your project submission
                  </p>
                </Link>
              </>
            )}

            <Link to="/profile" className="card p-8 hover-lift">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-2">Edit Profile</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Update your information and skills
              </p>
            </Link>

            <Link to="/leaderboard" className="card p-8 hover-lift">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">Leaderboard</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Check out the top projects
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;