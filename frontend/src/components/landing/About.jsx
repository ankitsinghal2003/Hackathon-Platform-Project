import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiAward, FiZap } from 'react-icons/fi';

const About = () => {
  const features = [
    {
      icon: <FiTarget size={32} />,
      title: 'Clear Mission',
      description: 'Build tomorrow\'s solutions with AI and emerging technologies'
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Collaborative',
      description: 'Form teams up to 4 members and work together'
    },
    {
      icon: <FiAward size={32} />,
      title: '$21K Prizes',
      description: 'Win amazing prizes across 5 different categories'
    },
    {
      icon: <FiZap size={32} />,
      title: '72 Hours',
      description: 'Non-stop innovation marathon from March 1-3, 2025'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-6">
              About <span className="gradient-text">HackFlow 2025</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              HackFlow 2025 is the ultimate platform where innovation meets intelligence. 
              We bring together developers, designers, and innovators to build cutting-edge 
              solutions using AI and emerging technologies.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Whether you're a student, professional, or entrepreneur, HackFlow provides 
              the perfect environment to showcase your skills, learn new technologies, 
              and compete for amazing prizes.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-primary-600 mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-slate-600 dark:text-slate-400">Expected Participants</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">100+</div>
              <div className="text-slate-600 dark:text-slate-400">Teams</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">20+</div>
              <div className="text-slate-600 dark:text-slate-400">Mentors</div>
            </div>
            <div className="card p-6 text-center">
              <div className="text-4xl font-bold gradient-text mb-2">10+</div>
              <div className="text-slate-600 dark:text-slate-400">Judges</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;