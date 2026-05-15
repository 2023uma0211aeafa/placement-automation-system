import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, ShieldCheck, Building2, Briefcase, IndianRupee, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-sapphire-200 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-sapphire-400" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 bg-sapphire-900/50 border border-sapphire-600/50 rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent text-white placeholder-sapphire-400 transition-all"
      />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [formData, setFormData] = useState({ company_name: '', role: '', salary: '', min_cgpa: '' });
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/drives/admin', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Job drive posted successfully!' });
      setFormData({ company_name: '', role: '', salary: '', min_cgpa: '' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Error posting drive' });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-12 relative"
    >
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-sapphire-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 -z-10" />

      <nav className="sticky top-0 z-50 glass border-b-0 border-white/10 px-8 py-4 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-gold-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">Admin Portal</h1>
          </div>
          <MagneticButton 
            onClick={() => { localStorage.clear(); navigate('/'); }}
            className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign Out</span>
          </MagneticButton>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 sm:p-10"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Post New Drive</h2>
            <p className="text-sapphire-300">Create a new placement opportunity for students.</p>
          </div>
          
          <AnimatePresence mode="wait">
            {message.text && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-4 mb-8 rounded-xl flex items-center border backdrop-blur-md ${
                  message.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/50 text-green-200' 
                    : 'bg-red-500/10 border-red-500/50 text-red-200'
                }`}
              >
                {message.type === 'success' ? <CheckCircle2 className="w-5 h-5 mr-3 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />}
                <p className="font-medium">{message.text}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField label="Company Name" icon={Building2} name="company_name" value={formData.company_name} onChange={handleChange} required placeholder="e.g. Google" />
            <InputField label="Job Role" icon={Briefcase} name="role" value={formData.role} onChange={handleChange} required placeholder="e.g. Software Engineer" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Salary (LPA)" icon={IndianRupee} name="salary" type="number" step="0.1" value={formData.salary} onChange={handleChange} required placeholder="e.g. 30" />
              <InputField label="Minimum CGPA" icon={GraduationCap} name="min_cgpa" type="number" step="0.01" value={formData.min_cgpa} onChange={handleChange} required placeholder="e.g. 8.0" />
            </div>

            <MagneticButton type="submit" className="w-full bg-gradient-to-r from-gold-500 to-gold-400 text-sapphire-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-gold-500/25 transition-all mt-8 text-lg">
              Publish Drive
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
