import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button');
      
      setLinkHovered(!!isClickable);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  // Hide on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-exclusion"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-secondary pointer-events-none z-[9998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 1.2 : linkHovered ? 2 : 1,
          opacity: linkHovered ? 1 : 0.5,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          mass: 0.2
        }}
      />
    </>
  );
}
