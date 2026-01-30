import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { projectService } from '../../services/projectService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import { FiCheckCircle, FiClock, FiEye } from 'react-icons/fi';

const SubmissionStatus = () => {
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      // Fetch projects filtered by team
      const data = await projectService.getProjects({ team: user?.team });
      if (data.data.length > 0) {
        setProject(data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">No Submission Yet</h1>
            <p className="text-slate-600 dark:text-slate-400">
              Your team hasn't submitted a project yet
            </p>
          </div>
        </div>
      </>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      draft: 'text-gray-600',
      submitted: 'text-blue-600',
      under_review: 'text-yellow-600',
      reviewed: 'text-green-600'
    };
    return colors[status] || 'text-gray-600';
  };

  const getStatusIcon = (status) => {
    const icons = {
      draft: FiClock,
      submitted: FiCheckCircle,
      under_review: FiEye,
      reviewed: FiCheckCircle
    };
    const Icon = icons[status] || FiClock;
    return <Icon size={32} />;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-display font-bold mb-8">
            Submission <span className="gradient-text">Status</span>
          </h1>

          {/* Status Card */}
          <div className="card p-8 mb-8">
            <div className={`flex items-center gap-4 mb-6 ${getStatusColor(project.submissionStatus)}`}>
              {getStatusIcon(project.submissionStatus)}
              <div>
                <div className="text-2xl font-bold capitalize">
                  {project.submissionStatus.replace('_', ' ')}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Current Status
                </div>
              </div>
            </div>

            {project.submittedAt && (
              <p className="text-slate-600 dark:text-slate-400">
                Submitted on: {new Date(project.submittedAt).toLocaleString()}
              </p>
            )}
          </div>

          {/* Project Details */}
          <div className="card p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              {project.tagline}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.category?.name}
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Team</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.team?.name}
                </p>
              </div>

              {project.technologies?.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="font-semibold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge badge-primary">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Evaluation Status */}
          {project.evaluations && project.evaluations.length > 0 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-4">Evaluation</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Evaluations Received</h3>
                  <p className="text-3xl font-bold text-primary-600">
                    {project.evaluations.length}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Average Score</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {project.averageScore?.toFixed(1) || 0} / 100
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubmissionStatus;