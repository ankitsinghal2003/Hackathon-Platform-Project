import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import Navbar from '../common/Navbar';
import Input from '../common/Input';
import Button from '../common/Button';
import toast from 'react-hot-toast';

const ProjectSubmission = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    problemStatement: '',
    solution: '',
    technologies: '',
    features: '',
    demoUrl: '',
    videoUrl: '',
    githubUrl: ''
  });
  const [files, setFiles] = useState({
    projectFiles: [],
    screenshots: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user?.team) {
      toast.error('You need to be part of a team to submit a project');
      navigate('/dashboard');
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles(prev => ({ ...prev, [name]: Array.from(selectedFiles) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert comma-separated strings to arrays
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean)
    };

    setIsLoading(true);
    try {
      const result = await projectService.createProject(projectData, files);
      toast.success('Project submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to submit project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-2">
            Submit Your <span className="gradient-text">Project</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Fill in the details about your amazing project
          </p>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Basic Information</h2>
                
                <Input
                  label="Project Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="My Awesome Project"
                  required
                />

                <Input
                  label="Tagline"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="One sentence description"
                  required
                />

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    className="input"
                    placeholder="Detailed description of your project..."
                    required
                  />
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Problem & Solution</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Problem Statement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    rows={4}
                    className="input"
                    placeholder="What problem does your project solve?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Solution <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleChange}
                    rows={4}
                    className="input"
                    placeholder="How does your project solve the problem?"
                    required
                  />
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Technical Details</h2>

                <Input
                  label="Technologies Used (comma-separated)"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, etc."
                />

                <Input
                  label="Key Features (comma-separated)"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Links</h2>

                <Input
                  label="Demo URL"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  placeholder="https://demo.example.com"
                  type="url"
                />

                <Input
                  label="Video URL"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://youtube.com/..."
                  type="url"
                />

                <Input
                  label="GitHub URL"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  type="url"
                />
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Files</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Files (Optional)
                  </label>
                  <input
                    type="file"
                    name="projectFiles"
                    onChange={handleFileChange}
                    multiple
                    className="input"
                  />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Max 5 files, 10MB each
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Screenshots (Optional)
                  </label>
                  <input
                    type="file"
                    name="screenshots"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="input"
                  />
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    Max 10 images
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <Button type="submit" variant="primary" isLoading={isLoading} fullWidth>
                  Submit Project
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

export default ProjectSubmission;