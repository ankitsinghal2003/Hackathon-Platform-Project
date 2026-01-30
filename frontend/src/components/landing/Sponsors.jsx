import { motion } from 'framer-motion';

const Sponsors = () => {
  const sponsors = {
    platinum: [
      { name: 'TechCorp', logo: '🏢' },
      { name: 'InnovateLabs', logo: '🚀' }
    ],
    gold: [
      { name: 'CloudSystems', logo: '☁️' },
      { name: 'DataFlow', logo: '📊' },
      { name: 'AIVentures', logo: '🤖' }
    ],
    silver: [
      { name: 'StartupHub', logo: '💡' },
      { name: 'CodeAcademy', logo: '💻' },
      { name: 'DevTools', logo: '🛠️' },
      { name: 'TechMedia', logo: '📱' }
    ]
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Our <span className="gradient-text">Sponsors</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400"
          >
            Supported by leading tech companies
          </motion.p>
        </div>

        {/* Platinum Sponsors */}
        <div className="mb-12">
          <h3 className="text-2xl font-display font-bold text-center mb-8 text-slate-400">
            Platinum Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {sponsors.platinum.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-12 text-center hover-lift"
              >
                <div className="text-6xl mb-4">{sponsor.logo}</div>
                <h4 className="text-xl font-semibold">{sponsor.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-12">
          <h3 className="text-2xl font-display font-bold text-center mb-8 text-yellow-600">
            Gold Sponsors
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sponsors.gold.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-8 text-center hover-lift"
              >
                <div className="text-5xl mb-3">{sponsor.logo}</div>
                <h4 className="text-lg font-semibold">{sponsor.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div>
          <h3 className="text-2xl font-display font-bold text-center mb-8 text-slate-500">
            Silver Sponsors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {sponsors.silver.map((sponsor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center hover-lift"
              >
                <div className="text-4xl mb-2">{sponsor.logo}</div>
                <h4 className="text-sm font-semibold">{sponsor.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Become Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
            Interested in sponsoring HackFlow 2025?
          </p>
          <a
            href="mailto:sponsor@hackflow2025.com"
            className="btn-primary inline-flex items-center"
          >
            Become a Sponsor
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;