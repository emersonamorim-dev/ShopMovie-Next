import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import ListaProvider from "./ListaContext";

type ListaProps = Pick<React.ComponentProps<"ul">, "role"> &
  React.PropsWithChildren<{
    className?: string;
    isAnimated?: boolean;
    emptyMessage?: React.ReactNode;
  }>;

function Lista({
  role,
  className,
  isAnimated,
  emptyMessage = "Sem resultados...",
  children,
}: ListaProps) {
  if (!React.Children.count(children)) {
    return <div className={className}>{emptyMessage}</div>;
  }

  return (
    <ListaProvider isAnimated={isAnimated}>
      <motion.ul layout={isAnimated} role={role} className={className}>
        {isAnimated ? <AnimatePresence>{children}</AnimatePresence> : children}
      </motion.ul>
    </ListaProvider>
  );
}

export default Lista;
