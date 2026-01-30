import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { teamService } from '../../services/teamService';
import { adminService } from '../../services/adminService';
import Navbar from '../common/Navbar';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const CreateTeam = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    maxMembers: 4
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.team) {
      toast.error('You already have a team');
      navigate('/team');
      return;
    }
    fetchCategories();
  }, [user]);

  const fetchCategories = async () => {
    try {
      const data = await adminService.getCategories();
      setCategories(data.data);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    setIsLoading(true);
    try {
      await teamService.createTeam(formData);
      toast.success('Team created successfully!');
      await refreshUser();
      navigate('/team');
    } catch (error) {
      toast.error(error.message || 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-display font-bold mb-2">
            Create Your <span className="gradient-text">Team</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Start your hackathon journey by creating a team
          </p>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Team Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Code Warriors"
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.icon} {cat.name} - ${cat.prizeAmount}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="input"
                  placeholder="Tell others about your team..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Maximum Team Size
                </label>
                <select
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="1">1 (Solo)</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
                  Create Team
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTeam;