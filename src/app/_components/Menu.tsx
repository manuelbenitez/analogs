"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Albums } from "./Albums";

// Animation variants for cleaner code
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="absolute top-4 left-4 z-50">
        <motion.div
          layout
          className="cursor-pointer rounded bg-black/50 p-2 transition-all duration-300 hover:bg-black/70"
          onClick={() => setIsOpen(!isOpen)}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            <motion.h4
              key={isOpen ? "close" : "albums"}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              layout
            >
              {isOpen ? "Close" : "Albums"}
            </motion.h4>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 z-40 h-screen w-screen overflow-y-auto bg-black/85 backdrop-blur-sm"
          >
            {/* Menu content goes here */}
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-8 text-white"
            >
              {/* Add your menu items here */}
              <Albums />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
