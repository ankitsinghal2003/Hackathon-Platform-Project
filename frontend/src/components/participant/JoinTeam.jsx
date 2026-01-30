import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { teamService } from '../../services/teamService';
import Navbar from '../common/Navbar';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const JoinTeam = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.team) {
      toast.error('You already have a team');
      navigate('/team');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inviteCode.trim()) {
      toast.error('Please enter an invite code');
      return;
    }

    setIsLoading(true);
    try {
      await teamService.joinTeam(inviteCode.toUpperCase().trim());
      toast.success('Joined team successfully!');
      await refreshUser();
      navigate('/team');
    } catch (error) {
      toast.error(error.message || 'Failed to join team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">
              Join a <span className="gradient-text">Team</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Enter the invite code to join an existing team
            </p>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  label="Invite Code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="ABC123"
                  className="text-2xl text-center font-mono"
                  required
                />
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Ask your team leader for the 6-character invite code
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
                  Join Team
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <p className="text-center text-slate-600 dark:text-slate-400 mb-4">
                Don't have an invite code?
              </p>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/team/create')}
              >
                Create Your Own Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinTeam;