import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Timeline from '../components/landing/Timeline';

const Schedule = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold text-center mb-6">
            Event <span className="gradient-text">Schedule</span>
          </h1>
          <p className="text-xl text-center text-slate-600 dark:text-slate-400 mb-12">
            Important dates and timeline for HackFlow 2025
          </p>
        </div>
      </div>
      <Timeline />
      <Footer />
    </>
  );
};

export default Schedule;