import React from "react";
import { motion } from "framer-motion";

export default function FadIn({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.main>
  );
}
