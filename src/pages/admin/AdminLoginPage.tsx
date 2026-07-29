import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Laptop, AlertCircle } from 'lucide-react';
import { fadeInUp } from '../../lib/animations';
import { useToast } from '../../components/ui/Toast';

const ADMIN_PASSWORD = 'TechGear@2024';

interface AdminLoginPageProps {
  onLogin: () => void;
}

const AdminLoginPage = ({ onLogin }: AdminLoginPageProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_authenticated', 'true');
        addToast('Login successful! Welcome to Admin Dashboard.', 'success');
        onLogin();
      } else {
        setError(true);
        addToast('Incorrect password. Please try again.', 'error');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30"
            >
              <Laptop className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-display font-bold text-2xl text-white mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400">
              Enter your password to access the admin dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter admin password"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-700/50 border ${
                    error ? 'border-red-500' : 'border-gray-600'
                  } text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all`}
                />
              </div>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-red-400 text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  Incorrect password
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Login to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Hint */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Contact the administrator if you forgot your password
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
