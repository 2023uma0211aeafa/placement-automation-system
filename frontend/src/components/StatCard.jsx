import { memo } from 'react';
import { motion } from 'framer-motion';

const StatCard = memo(({ title, value, subtitle }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 gpu-accelerate flex flex-col items-center justify-center text-center"
    >
      <h2 className="text-sapphire-100 text-sm uppercase tracking-widest font-semibold mb-2">{title}</h2>
      <p className="text-5xl font-bold text-gold-500 mb-1">{value}</p>
      {subtitle && <p className="text-sapphire-300 text-sm">{subtitle}</p>}
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';
export default StatCard;
