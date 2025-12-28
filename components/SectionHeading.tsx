import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ title, subtitle, alignment = 'center', className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${alignment === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block"
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-serif font-bold text-foreground"
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className={`h-0.5 bg-primary/40 mt-6 ${alignment === 'center' ? 'mx-auto' : ''} w-24`}
      />
    </div>
  );
}
