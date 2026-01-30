import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { judgeService } from '../../services/adminService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import { FiEye } from 'react-icons/fi';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await judgeService.getProjectsForEvaluation();
      setProjects(data.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
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
            Projects to <span className="gradient-text">Evaluate</span>
          </h1>

          {projects.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-xl text-slate-600 dark:text-slate-400">
                No projects to evaluate yet
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {projects.map((project) => (
                <div key={project._id} className="card p-6 hover-lift">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {project.tagline}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="badge badge-primary">
                          {project.category?.name}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          Team: {project.team?.name}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/judge/projects/${project._id}`}
                      className="btn-primary flex items-center gap-2"
                    >
                      <FiEye /> View & Evaluate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectList;