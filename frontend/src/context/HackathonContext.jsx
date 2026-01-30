import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const HackathonContext = createContext(null);

export const useHackathon = () => {
  const context = useContext(HackathonContext);
  if (!context) {
    throw new Error('useHackathon must be used within a HackathonProvider');
  }
  return context;
};

export const HackathonProvider = ({ children }) => {
  const [hackathon, setHackathon] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHackathonData();
    fetchCategories();
  }, []);

  const fetchHackathonData = async () => {
    try {
      const response = await api.get('/admin/hackathon');
      setHackathon(response.data.data);
    } catch (error) {
      console.error('Failed to fetch hackathon data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/admin/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const getTimeRemaining = () => {
    if (!hackathon) return null;

    const now = new Date().getTime();
    const end = new Date(hackathon.endDate).getTime();
    const distance = end - now;

    if (distance < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true
      };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isExpired: false
    };
  };

  const value = {
    hackathon,
    categories,
    loading,
    getTimeRemaining,
    refreshHackathon: fetchHackathonData,
    refreshCategories: fetchCategories,
  };

  return (
    <HackathonContext.Provider value={value}>
      {children}
    </HackathonContext.Provider>
  );
};

export default HackathonContext;