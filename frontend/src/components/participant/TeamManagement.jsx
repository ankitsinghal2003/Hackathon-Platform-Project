import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { teamService } from '../../services/teamService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import Button from '../common/Button';
import Modal from '../common/Modal';
import toast from 'react-hot-toast';
import { FiCopy, FiUserX, FiEdit } from 'react-icons/fi';

const TeamManagement = () => {
  const { user, refreshUser } = useAuth();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    lookingForMembers: true
  });

  useEffect(() => {
    if (user?.team) {
      fetchTeam();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchTeam = async () => {
    try {
      const data = await teamService.getTeam(user.team);
      setTeam(data.data);
      setEditData({
        name: data.data.name,
        description: data.data.description || '',
        lookingForMembers: data.data.lookingForMembers
      });
    } catch (error) {
      toast.error('Failed to fetch team');
    } finally {
      setLoading(false);
    }
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(team.inviteCode);
    toast.success('Invite code copied!');
  };

  const handleRemoveMember = async (userId) => {
    if (!window.confirm('Are you sure you want to remove this member?')) return;

    try {
      await teamService.removeMember(team._id, userId);
      toast.success('Member removed');
      fetchTeam();
    } catch (error) {
      toast.error('Failed to remove member');
    }
  };

  const handleLeaveTeam = async () => {
    if (!window.confirm('Are you sure you want to leave this team?')) return;

    try {
      await teamService.leaveTeam(team._id);
      toast.success('Left team successfully');
      refreshUser();
      window.location.href = '/dashboard';
    } catch (error) {
      toast.error('Failed to leave team');
    }
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    try {
      await teamService.updateTeam(team._id, editData);
      toast.success('Team updated');
      setShowEditModal(false);
      fetchTeam();
    } catch (error) {
      toast.error('Failed to update team');
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!team) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">No Team Yet</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              You need to create or join a team first
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.href = '/team/create'}>
                Create Team
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/team/join'}>
                Join Team
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isLeader = team.leader._id === user._id;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                {team.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {team.category?.name}
              </p>
            </div>
            {isLeader && (
              <Button variant="ghost" onClick={() => setShowEditModal(true)}>
                <FiEdit /> Edit
              </Button>
            )}
          </div>

          {/* Invite Code */}
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Invite Code</h2>
            <div className="flex items-center gap-4">
              <code className="flex-1 bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-lg text-2xl font-mono">
                {team.inviteCode}
              </code>
              <Button onClick={copyInviteCode}>
                <FiCopy /> Copy
              </Button>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Share this code with others to invite them to your team
            </p>
          </div>

          {/* Team Members */}
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              Team Members ({team.memberCount}/{team.maxMembers})
            </h2>

            <div className="space-y-4">
              {/* Leader */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <div className="font-semibold">
                    {team.leader.firstName} {team.leader.lastName}
                    <span className="ml-2 badge badge-primary">Leader</span>
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {team.leader.email}
                  </div>
                </div>
              </div>

              {/* Members */}
              {team.members.map((member) => (
                <div key={member.user._id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="font-semibold">
                      {member.user.firstName} {member.user.lastName}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {member.user.email}
                    </div>
                  </div>
                  {isLeader && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveMember(member.user._id)}
                    >
                      <FiUserX /> Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          {team.description && (
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-slate-600 dark:text-slate-400">{team.description}</p>
            </div>
          )}

          {/* Actions */}
          {!isLeader && (
            <Button variant="danger" onClick={handleLeaveTeam}>
              Leave Team
            </Button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Team"
      >
        <form onSubmit={handleUpdateTeam} className="space-y-4">
          <Input
            label="Team Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="input"
              rows={4}
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editData.lookingForMembers}
              onChange={(e) => setEditData({ ...editData, lookingForMembers: e.target.checked })}
            />
            <span>Looking for members</span>
          </label>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default TeamManagement;