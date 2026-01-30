import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { FiCheckCircle } from 'react-icons/fi';

const Rules = () => {
  const rules = [
    {
      title: 'Team Size',
      content: 'Teams can have 1-4 members. Solo participants are welcome!'
    },
    {
      title: 'Original Work',
      content: 'All projects must be started during the hackathon period. You can use existing libraries and APIs.'
    },
    {
      title: 'Code of Conduct',
      content: 'Be respectful to all participants, judges, and organizers. Harassment will not be tolerated.'
    },
    {
      title: 'Submission Requirements',
      content: 'Submit your project with source code, demo video, and documentation before the deadline.'
    },
    {
      title: 'Intellectual Property',
      content: 'You retain all rights to your code and projects.'
    },
    {
      title: 'Judging Criteria',
      content: 'Projects judged on Innovation, Technical Complexity, Implementation, and Impact (25% each).'
    },
    {
      title: 'Fair Play',
      content: 'No plagiarism or cheating. Projects must be your own work.'
    },
    {
      title: 'Technical Support',
      content: 'Mentors available for guidance, but they cannot write code for you.'
    },
    {
      title: 'Deadlines',
      content: 'All submissions must be completed by March 3, 2025 11:59 PM UTC.'
    },
    {
      title: 'Have Fun!',
      content: 'Most importantly, enjoy the experience and learn something new!'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold text-center mb-6">
            Hackathon <span className="gradient-text">Rules</span>
          </h1>
          <p className="text-xl text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
            Please read these rules carefully before participating
          </p>

          <div className="max-w-4xl mx-auto grid gap-6">
            {rules.map((rule, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-start gap-4">
                  <FiCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{rule.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{rule.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Rules;