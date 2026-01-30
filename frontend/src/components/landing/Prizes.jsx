import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import { FiDollarSign } from 'react-icons/fi';

const Prizes = () => {
  const prizes = [
    {
      category: 'AI for Social Good',
      amount: '$5,000',
      icon: '🤖',
      color: 'from-blue-500 to-purple-500',
      benefits: ['Mentorship Program', 'API Credits', 'Recognition']
    },
    {
      category: 'FinTech Revolution',
      amount: '$4,000',
      icon: '💰',
      color: 'from-purple-500 to-pink-500',
      benefits: ['API Credits', 'Tech Resources', 'Networking']
    },
    {
      category: 'Climate Tech',
      amount: '$4,000',
      icon: '🌍',
      color: 'from-green-500 to-teal-500',
      benefits: ['Incubation Support', 'Media Coverage', 'Grants']
    },
    {
      category: 'Gaming & Metaverse',
      amount: '$3,500',
      icon: '🎮',
      color: 'from-pink-500 to-orange-500',
      benefits: ['Platform Credits', 'Gaming Tools', 'Showcase']
    },
    {
      category: 'HealthTech Innovation',
      amount: '$4,500',
      icon: '🏥',
      color: 'from-red-500 to-orange-500',
      benefits: ['Healthcare API', 'Expert Connect', 'Investment']
    }
  ];

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
            <FaTrophy className="inline mb-2" /> Amazing <span className="gradient-text">Prizes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400"
          >
            $21,000 total prize pool across 5 categories
          </motion.p>
        </div>

        {/* Prizes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card p-6 hover-lift h-full">
                {/* Icon */}
                <div className={`text-6xl mb-4 bg-gradient-to-r ${prize.color} bg-clip-text`}>
                  {prize.icon}
                </div>

                {/* Category */}
                <h3 className="text-2xl font-display font-bold mb-2">
                  {prize.category}
                </h3>

                {/* Amount */}
                <div className="flex items-center gap-2 mb-4">
                  <FiDollarSign className="text-green-500" size={24} />
                  <span className="text-3xl font-bold text-green-500">{prize.amount}</span>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-300">
                    Additional Benefits:
                  </p>
                  <ul className="space-y-1">
                    {prize.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <span className="text-primary-500">✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Prize Pool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block card p-8">
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">Total Prize Pool</p>
            <p className="text-5xl font-display font-bold gradient-text">$21,000</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Prizes;