import { motion } from 'framer-motion';
import Link from 'next/link';

interface PillarProps {
  title: string;
  code: string;
  description: string;
  index: number;
}

export default function Pillar({ title, code, description, index }: PillarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/domain/${code.toLowerCase()}`}>
        <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-sky-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <h3 className="font-heading text-xl font-semibold text-black mb-2">
            {title}
            <span className="ml-2 text-sm text-sky-600">{code}</span>
          </h3>
          <p className="text-zinc-600 text-sm">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
} 