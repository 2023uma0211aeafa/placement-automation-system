import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LogOut, LayoutDashboard, SearchX } from 'lucide-react';
import JobCard from '../components/JobCard';
import StatCard from '../components/StatCard';
import MagneticButton from '../components/MagneticButton';

export default function StudentDashboard() {
  const [drives, setDrives] = useState([]);
  const [cgpa, setCgpa] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/');

    axios.get('/api/drives/eligible', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setDrives(res.data.drives);
      setCgpa(res.data.studentCGPA);
    })
    .catch(err => {
      console.error(err);
      if (err.response?.status === 401) navigate('/');
    });
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pb-12 relative"
    >
      {/* Background gradients */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sapphire-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30 -z-10" />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b-0 border-white/10 px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="w-6 h-6 text-gold-400" />
            <h1 className="text-xl font-bold text-white tracking-wide">Student Portal</h1>
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

      <div className="max-w-7xl mx-auto px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Current CGPA" value={cgpa} subtitle="Verified Academic Record" />
          <StatCard title="Eligible Drives" value={drives.length} subtitle="Opportunities Available" />
          <StatCard title="Status" value="Active" subtitle="Ready for Placements" />
        </div>

        {/* Drives Section */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Eligible Job Drives</h2>
          <div className="h-px bg-gradient-to-r from-sapphire-600 to-transparent flex-grow ml-6"></div>
        </div>

        {drives.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 flex flex-col items-center justify-center text-center border-dashed"
          >
            <div className="w-20 h-20 bg-sapphire-800 rounded-full flex items-center justify-center mb-4">
              <SearchX className="w-10 h-10 text-sapphire-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Opportunities Found</h3>
            <p className="text-sapphire-300 max-w-md">There are currently no job drives available that match your CGPA profile. Keep checking back!</p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drives.map((drive, index) => (
              <JobCard key={drive.id} drive={drive} index={index} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
