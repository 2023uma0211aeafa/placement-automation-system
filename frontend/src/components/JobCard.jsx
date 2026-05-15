import { memo } from 'react';
import { motion } from 'framer-motion';
import { Building2, IndianRupee, GraduationCap } from 'lucide-react';

const JobCard = memo(({ drive, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-card p-6 gpu-accelerate flex flex-col gap-4 relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-[100px] -z-10 transition-transform duration-500 group-hover:scale-110" />
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{drive.company}</h3>
        <span className="inline-block px-3 py-1 bg-sapphire-700 text-sapphire-100 rounded-full text-xs font-medium tracking-wide">
          {drive.role}
        </span>
      </div>

      <div className="space-y-3 mt-2">
        <div className="flex items-center text-sapphire-200">
          <IndianRupee className="w-5 h-5 mr-3 text-gold-400" />
          <span className="font-semibold text-lg">{drive.salary} <span className="text-sm font-normal text-sapphire-300">LPA</span></span>
        </div>
        <div className="flex items-center text-sapphire-200">
          <GraduationCap className="w-5 h-5 mr-3 text-gold-400" />
          <span>Min CGPA Required: <span className="font-semibold text-white">{drive.min_cgpa}</span></span>
        </div>
      </div>
      
      <button className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gold-400 border border-white/10 transition-colors font-medium text-sm tracking-wide">
        View Details
      </button>
    </motion.div>
  );
});

JobCard.displayName = 'JobCard';
export default JobCard;
