"use client";

import { useEffect, useCallback, memo, useState, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { CollaborationCard } from "@/components/ui/collaboration-card";
import type { Collaboration } from "@/types";

interface CollaborationColumnProps {
  collaborations: Collaboration[];
  className?: string;
  duration?: number;
  delay?: number;
}

export const CollaborationColumn = memo(({
  collaborations,
  className = "",
  duration = 80,
  delay = 0,
}: CollaborationColumnProps) => {
  const controls = useAnimationControls();
  const [isColumnHovered, setIsColumnHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const motionDivRef = useRef<HTMLDivElement>(null);

  // Triplicamos el array para scroll infinito más fluido
  const infiniteItems = collaborations.length > 0 
    ? [...collaborations, ...collaborations, ...collaborations] 
    : [];

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const startAnimation = async () => {
      if (delay > 0) {
        timeoutId = setTimeout(() => {
          if (!isColumnHovered) {
            controls.start({
              y: ["-33.33%", "-66.66%"],
              transition: {
                duration: duration,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              },
            });
          }
        }, delay * 1000);
      } else {
        if (!isColumnHovered) {
          controls.start({
            y: ["-33.33%", "-66.66%"],
            transition: {
              duration: duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          });
        }
      }
    };

    startAnimation();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [controls, duration, delay, isColumnHovered]);

  // Manejar scroll manual infinito
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !motionDivRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    
    const thirdHeight = scrollHeight / 3;
    
    // Si llegamos al final del segundo tercio, volvemos al primer tercio
    if (scrollTop + clientHeight >= thirdHeight * 2) {
      container.scrollTop = scrollTop - thirdHeight;
    }
    // Si volvemos al inicio, saltamos al segundo tercio
    else if (scrollTop <= 0) {
      container.scrollTop = thirdHeight;
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Iniciar en el segundo tercio para permitir scroll en ambas direcciones
    container.scrollTop = container.scrollHeight / 3;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, infiniteItems.length]);

  const handleColumnMouseEnter = useCallback(() => {
    setIsColumnHovered(true);
    controls.stop();
  }, [controls]);

  const handleColumnMouseLeave = useCallback(() => {
    setIsColumnHovered(false);
    controls.start({
      y: ["-33.33%", "-66.66%"],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, duration]);

  if (infiniteItems.length === 0) {
    return null;
  }

  return (
    <div
      className={`relative h-[700px] w-full max-w-xs ${className}`}
      onMouseEnter={handleColumnMouseEnter}
      onMouseLeave={handleColumnMouseLeave}
      style={{ 
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div 
        ref={scrollContainerRef}
        className="overflow-y-scroll overflow-x-hidden h-full scrollbar-hide" 
        style={{ scrollbarWidth: 'none' }}
      >
        <motion.div
          ref={motionDivRef}
          animate={controls}
          initial={{ y: "-33.33%" }}
          className="flex flex-col gap-6"
        >
          {infiniteItems.map((item, i) => (
            <CollaborationCard
              key={`${item.name}-${i}`}
              name={item.name}
              logo={item.logo}
              description={item.description}
              onClick={item.onClick}
            />
          ))}
        </motion.div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
});

CollaborationColumn.displayName = 'CollaborationColumn';