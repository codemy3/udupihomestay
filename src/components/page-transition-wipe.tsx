"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [wipeKey, setWipeKey] = useState(0);
  const [showChildren, setShowChildren] = useState(true);
  const [wipeDirection, setWipeDirection] = useState<'in' | 'out' | null>(null);

  useEffect(() => {
    setWipeDirection('in');
    setShowChildren(false);
    const wipeIn = setTimeout(() => {
      setWipeDirection('out');
      setShowChildren(true);
    }, 600); // duration of wipe in
    const wipeOut = setTimeout(() => {
      setWipeDirection(null);
      setWipeKey((k) => k + 1);
    }, 1200); // duration of wipe in + out
    return () => {
      clearTimeout(wipeIn);
      clearTimeout(wipeOut);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={wipeKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
          style={{ height: "100%" }}
        >
          {showChildren && children}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {wipeDirection === 'in' && (
          <motion.div
            key={"wipe-in" + wipeKey}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1, originX: 0 }}
            exit={{}}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "#849826",
              zIndex: 9999,
              pointerEvents: "none",
              transformOrigin: "left"
            }}
          />
        )}
        {wipeDirection === 'out' && (
          <motion.div
            key={"wipe-out" + wipeKey}
            initial={{ scaleX: 1, originX: 1 }}
            animate={{ scaleX: 0, originX: 1 }}
            exit={{}}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "#849826",
              zIndex: 9999,
              pointerEvents: "none",
              transformOrigin: "right"
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
