import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Who can participate in HackFlow 2025?',
      answer: 'Anyone aged 18+ with a passion for innovation and technology can participate. Students, professionals, and entrepreneurs are all welcome!'
    },
    {
      question: 'What is the team size limit?',
      answer: 'Teams can have 1-4 members. You can register solo and find teammates, or register as a complete team.'
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No! HackFlow 2025 is completely free to participate. We want to make innovation accessible to everyone.'
    },
    {
      question: 'What should I build?',
      answer: 'Choose one of our 5 categories (AI for Social Good, FinTech, Climate Tech, Gaming, or HealthTech) and build a solution that addresses real-world problems using technology.'
    },
    {
      question: 'Do I need to have a fully working product?',
      answer: 'You need a working prototype or MVP (Minimum Viable Product). It doesn\'t need to be perfect, but it should demonstrate your concept and core functionality.'
    },
    {
      question: 'What technologies can I use?',
      answer: 'Any technology you prefer! We encourage use of AI, machine learning, blockchain, and other cutting-edge technologies, but the choice is yours.'
    },
    {
      question: 'How will projects be judged?',
      answer: 'Projects are evaluated on 4 criteria: Innovation (25%), Technical Complexity (25%), Implementation Quality (25%), and Impact & Usefulness (25%).'
    },
    {
      question: 'Can I work on an existing project?',
      answer: 'No. All projects must be started during the hackathon period. However, you can use existing libraries, frameworks, and APIs.'
    },
    {
      question: 'What if I don\'t have a team?',
      answer: 'No problem! You can participate solo or use our platform to find teammates with complementary skills.'
    },
    {
      question: 'Will there be mentors available?',
      answer: 'Yes! Experienced mentors will be available throughout the hackathon to provide guidance and answer questions.'
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 dark:text-slate-400"
          >
            Got questions? We've got answers!
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full card p-6 text-left hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <FiChevronDown
                    className={`flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                    size={24}
                  />
                </div>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-slate-600 dark:text-slate-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;