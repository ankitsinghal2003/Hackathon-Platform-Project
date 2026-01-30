import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { validateRegistration } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import Navbar from '../common/Navbar';
import { FiUser, FiMail, FiLock, FiPhone, FiBriefcase } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    organization: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4">
        <div className="max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-2">
              Join <span className="gradient-text">HackFlow 2025</span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Create your account and start your hackathon journey
            </p>
          </div>

          {/* Form */}
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiUser className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    className="pl-10"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="relative">
                  <FiUser className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    className="pl-10"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <FiMail className="absolute left-3 top-10 text-slate-400" />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  className="pl-10"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Password Row */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiLock className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="relative">
                  <FiLock className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Optional Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <FiPhone className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="Phone (Optional)"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-10 text-slate-400" />
                  <Input
                    label="Organization (Optional)"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Your University/Company"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
              >
                Create Account
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;