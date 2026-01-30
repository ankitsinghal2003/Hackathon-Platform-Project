import { motion } from 'framer-motion';
import { FiCalendar, FiClock } from 'react-icons/fi';

const Timeline = () => {
  const events = [
    {
      date: 'February 1, 2025',
      time: '12:00 AM UTC',
      title: 'Registration Opens',
      description: 'Start registering your team and get ready for the hackathon',
      icon: '📝',
      color: 'bg-blue-500'
    },
    {
      date: 'February 28, 2025',
      time: '11:59 PM UTC',
      title: 'Registration Closes',
      description: 'Last day to register your team',
      icon: '🚪',
      color: 'bg-purple-500'
    },
    {
      date: 'March 1, 2025',
      time: '12:00 AM UTC',
      title: 'Hackathon Begins',
      description: 'Let the coding marathon begin! 72 hours of non-stop innovation',
      icon: '🚀',
      color: 'bg-green-500'
    },
    {
      date: 'March 3, 2025',
      time: '11:59 PM UTC',
      title: 'Submission Deadline',
      description: 'Final deadline to submit your projects',
      icon: '⏰',
      color: 'bg-orange-500'
    },
    {
      date: 'March 4-5, 2025',
      time: 'TBD',
      title: 'Judging Period',
      description: 'Our expert judges evaluate all submissions',
      icon: '⚖️',
      color: 'bg-yellow-500'
    },
    {
      date: 'March 6, 2025',
      time: 'TBD',
      title: 'Results Announcement',
      description: 'Winners will be announced across all categories',
      icon: '🏆',
      color: 'bg-red-500'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            Event <span className="gradient-text">Timeline</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400"
          >
            Mark your calendars for these important dates
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0"
            >
              {/* Line */}
              {index < events.length - 1 && (
                <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-transparent" />
              )}

              {/* Dot */}
              <div className={`absolute left-0 top-2 w-6 h-6 ${event.color} rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                {index + 1}
              </div>

              {/* Content */}
              <div className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{event.icon}</div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <FiCalendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <FiClock size={16} />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold mb-2">{event.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;