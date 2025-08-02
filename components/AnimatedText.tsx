'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function AnimatedText({ 
  text, 
  className = '',
  delay = 0,
  staggerChildren = 0.05
}: AnimatedTextProps) {
  // Split text into words, preserving the comma and handling special cases
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerChildren, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block', marginRight: '8px' }}
          className={word === 'Whenever' ? 'gradient-text' : ''}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}