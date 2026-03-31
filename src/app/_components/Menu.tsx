"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Images, X } from "lucide-react";
import { Albums } from "./Albums";

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
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
        {!isHomePage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="cursor-pointer rounded border border-white/10 bg-black/50 px-4 py-2 transition-all duration-300 hover:bg-black/70"
            onClick={() => router.back()}
          >
            <h4 className="flex items-center gap-1 text-xl"><ChevronLeft size={22} /> Back</h4>
          </motion.div>
        )}
        <motion.div
          layout
          className="cursor-pointer rounded border border-white/10 bg-black/50 px-4 py-2 transition-all duration-300 hover:bg-black/70"
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
              <span className="flex items-center gap-1 text-xl">{isOpen ? <><X size={22} /> Close</> : <><Images size={22} /> Albums</>}</span>
            </motion.h4>
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="scrollbar-hide fixed inset-0 z-40 h-screen w-screen overflow-y-auto bg-black/85 backdrop-blur-sm"
          >
            <motion.div
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, delay: 0.2 }}
              className="p-8"
            >
              <Albums />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
