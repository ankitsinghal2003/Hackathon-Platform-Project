import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../../services/projectService';
import { judgeService } from '../../services/adminService';
import Navbar from '../common/Navbar';
import Loader from '../common/Loader';
import Button from '../common/Button';
import Input from '../common/Input';
import toast from 'react-hot-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState({
    innovation: { score: 0 },
    technical: { score: 0 },
    implementation: { score: 0 },
    impact: { score: 0 }
  });
  const [feedback, setFeedback] = useState({
    strengths: '',
    improvements: '',
    generalComments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const data = await projectService.getProject(id);
      setProject(data.data);
    } catch (error) {
      toast.error('Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (criterion, value) => {
    const score = Math.min(10, Math.max(0, parseInt(value) || 0));
    setScores(prev => ({
      ...prev,
      [criterion]: { score }
    }));
  };

  const handleSubmitEvaluation = async (e) => {
    e.preventDefault();

    // Validate scores
    const allScored = Object.values(scores).every(s => s.score > 0);
    if (!allScored) {
      toast.error('Please provide scores for all criteria');
      return;
    }

    setIsSubmitting(true);
    try {
      await judgeService.submitEvaluation({
        project: id,
        scores,
        feedback
      });
      toast.success('Evaluation submitted successfully!');
      navigate('/judge/projects');
    } catch (error) {
      toast.error(error.message || 'Failed to submit evaluation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-display font-bold mb-8">
            Evaluate <span className="gradient-text">Project</span>
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Project Details */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                  {project.tagline}
                </p>
                <div className="flex gap-4 mb-4">
                  <span className="badge badge-primary">{project.category?.name}</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    Team: {project.team?.name}
                  </span>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-400">{project.description}</p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold mb-2">Problem Statement</h3>
                <p className="text-slate-600 dark:text-slate-400">{project.problemStatement}</p>
              </div>

              <div className="card p-6">
                <h3 className="font-bold mb-2">Solution</h3>
                <p className="text-slate-600 dark:text-slate-400">{project.solution}</p>
              </div>

              {project.technologies?.length > 0 && (
                <div className="card p-6">
                  <h3 className="font-bold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="badge badge-primary">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {project.demoUrl && (
                <div className="card p-6">
                  <h3 className="font-bold mb-2">Demo</h3>
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    {project.demoUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Evaluation Form */}
            <div className="card p-6 sticky top-4 h-fit">
              <h2 className="text-2xl font-bold mb-6">Evaluation</h2>
              <form onSubmit={handleSubmitEvaluation} className="space-y-6">
                {/* Scores */}
                {Object.entries({
                  innovation: 'Innovation & Creativity',
                  technical: 'Technical Complexity',
                  implementation: 'Implementation Quality',
                  impact: 'Impact & Usefulness'
                }).map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2">
                      {label} (0-10)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={scores[key].score}
                      onChange={(e) => handleScoreChange(key, e.target.value)}
                      className="input"
                      required
                    />
                  </div>
                ))}

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium mb-2">Strengths</label>
                  <textarea
                    value={feedback.strengths}
                    onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })}
                    rows={3}
                    className="input"
                    placeholder="What did they do well?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Areas for Improvement</label>
                  <textarea
                    value={feedback.improvements}
                    onChange={(e) => setFeedback({ ...feedback, improvements: e.target.value })}
                    rows={3}
                    className="input"
                    placeholder="What could be improved?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">General Comments</label>
                  <textarea
                    value={feedback.generalComments}
                    onChange={(e) => setFeedback({ ...feedback, generalComments: e.target.value })}
                    rows={4}
                    className="input"
                    placeholder="Additional feedback..."
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth isLoading={isSubmitting}>
                  Submit Evaluation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;