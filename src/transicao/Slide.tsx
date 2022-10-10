import React from 'react';
import { TRANSITION_DURATION_IN_SECONDS } from './TransicaoUtils';
import { motion } from 'framer-motion';

export type SlideProps = React.PropsWithChildren<{
  className?: string;
  from?: 'left' | 'right';
  isIn: boolean;
}>;
function Slide({ className, from = 'left', isIn, children }: SlideProps) {
  const outTransform = { x: from === 'left' ? '-100%' : '100%' };

  return isIn ? (
    <motion.div
      className={className}
      initial={outTransform}
      animate={{ x: 0 }}
      exit={outTransform}
      transition={{ duration: TRANSITION_DURATION_IN_SECONDS }}
    >
      {children}
    </motion.div>
  ) : null;
}

export default Slide;
