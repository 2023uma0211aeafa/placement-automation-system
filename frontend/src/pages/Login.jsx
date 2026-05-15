import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';
import { GraduationCap, ShieldCheck, Mail, Phone, Hash, User, Lock } from 'lucide-react';

const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-sapphire-400" />
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-sapphire-300 transition-all"
    />
  </div>
);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '', roll_number: '', password: '', cgpa: '', phone: '', email: '', role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await axios.post('/api/auth/login', {
          roll_number: formData.roll_number,
          password: formData.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        if (res.data.role === 'ADMIN') navigate('/admin');
        else navigate('/student');
      } else {
        await axios.post('/api/auth/register', formData);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sapphire-600 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20" />

      <motion.div 
        layout
        className="glass-card p-8 w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sapphire-700/50 border border-gold-500/30 mb-4 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
            {formData.role === 'ADMIN' ? <ShieldCheck className="w-8 h-8 text-gold-400" /> : <GraduationCap className="w-8 h-8 text-gold-400" />}
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">IIT Jammu</h2>
          <p className="text-sapphire-200 mt-2 font-medium">Placement Automation Portal</p>
        </div>
        
        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 mb-6 rounded-lg text-sm text-center font-medium backdrop-blur-md"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <InputField icon={User} name="name" placeholder="Full Name" onChange={handleChange} required />
                <InputField icon={GraduationCap} name="cgpa" placeholder="CGPA (e.g. 8.5)" type="number" step="0.01" onChange={handleChange} required />
                <InputField icon={Phone} name="phone" placeholder="Phone Number" onChange={handleChange} />
                <InputField icon={Mail} name="email" placeholder="Personal Email" type="email" onChange={handleChange} />
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-sapphire-400" />
                  </div>
                  <select name="role" onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-gold-500 text-white appearance-none">
                    <option value="STUDENT" className="bg-sapphire-900">Student</option>
                    <option value="ADMIN" className="bg-sapphire-900">Admin</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <InputField icon={Hash} name="roll_number" placeholder="Roll Number / ID" onChange={handleChange} required />
          <InputField icon={Lock} name="password" placeholder="Password" type="password" onChange={handleChange} required />
          
          <MagneticButton 
            type="submit" 
            className="w-full bg-gradient-to-r from-gold-500 to-gold-400 text-sapphire-900 font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-gold-500/25 transition-all mt-6"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </MagneticButton>
        </form>
        
        <div className="mt-6 text-center">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-sapphire-300 hover:text-gold-400 transition-colors font-medium focus:outline-none"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
