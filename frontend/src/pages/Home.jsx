// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiCalendar } from 'react-icons/fi';
// import Countdown from '../common/Countdown';
// import { HACKATHON_START } from '../../utils/constants';

// const Hero = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Animated Background */}
//       <div className="absolute inset-0 animated-gradient opacity-10" />
      
//       {/* Content */}
//       <div className="container mx-auto px-4 py-20 relative z-10">
//         <div className="text-center max-w-5xl mx-auto">
//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full mb-6"
//           >
//             <FiCalendar />
//             <span className="font-medium">March 1-3, 2025 • 72 Hours</span>
//           </motion.div>

//           {/* Title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="text-5xl md:text-7xl font-display font-bold mb-6"
//           >
//             <span className="gradient-text">HackFlow 2025</span>
//           </motion.h1>

//           {/* Tagline */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8"
//           >
//             Where Innovation Meets Intelligence
//           </motion.p>

//           {/* Theme */}
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto"
//           >
//             Join the ultimate 72-hour hackathon and build tomorrow's solutions with AI. 
//             $21,000 in prizes across 5 cutting-edge categories.
//           </motion.p>

//           {/* Countdown */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             className="mb-12"
//           >
//             <h3 className="text-lg font-semibold mb-4">Hackathon Starts In:</h3>
//             <Countdown targetDate={HACKATHON_START} />
//           </motion.div>

//           {/* CTA Buttons */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//             className="flex flex-col sm:flex-row gap-4 justify-center"
//           >
//             <Link
//               to="/register"
//               className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center gap-2 hover-lift"
//             >
//               Register Now
//               <FiArrowRight />
//             </Link>
//             <Link
//               to="/rules"
//               className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center hover-lift"
//             >
//               View Rules
//             </Link>
//           </motion.div>

//           {/* Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto"
//           >
//             <div>
//               <div className="text-4xl font-bold gradient-text">$21K</div>
//               <div className="text-slate-600 dark:text-slate-400 mt-2">Prize Pool</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold gradient-text">72hrs</div>
//               <div className="text-slate-600 dark:text-slate-400 mt-2">Duration</div>
//             </div>
//             <div>
//               <div className="text-4xl font-bold gradient-text">5</div>
//               <div className="text-slate-600 dark:text-slate-400 mt-2">Categories</div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Categories from '../components/landing/Categories';
import Timeline from '../components/landing/Timeline';
import Prizes from '../components/landing/Prizes';
import FAQ from '../components/landing/FAQ';
import Sponsors from '../components/landing/Sponsors';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Timeline />
      <Prizes />
      <FAQ />
      <Sponsors />
      <Footer />
    </>
  );
};

export default Home;