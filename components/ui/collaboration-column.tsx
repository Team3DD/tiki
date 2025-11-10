"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import type { Collaboration } from "@/types";
import { CollaborationCard } from "./collaboration-card";

const rotateArray = <T,>(arr: T[], startIndex: number): T[] => {
  if (arr.length === 0) return [];
  const start = startIndex % arr.length;
  return [...arr.slice(start), ...arr.slice(0, start)];
};

export interface CollaborationColumnProps {
  collaborations: Collaboration[];
  startIndex: number;
  className?: string;
  autoScroll?: boolean;
  duration?: number;
  delay?: number;
}

export const CollaborationColumn = memo(({
  collaborations,
  startIndex,
  className = "",
  autoScroll = true,
  duration = 20,
  delay = 0,
}: CollaborationColumnProps) => {
  const rotated = rotateArray(collaborations, startIndex);

  if (rotated.length === 0) return null;

  return (
    <div
      className={`relative h-[700px] w-full max-w-xs overflow-hidden ${className}`}
      style={{ 
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      {autoScroll ? (
        <motion.div
          className="flex flex-col gap-6"
          animate={{ y: ["0%", "-50%"] }}
          transition={{
            duration: duration,
            delay: delay, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          {[...rotated, ...rotated].map((item, index) => (
            <CollaborationCard
              key={`${item.name}-${startIndex}-${index}`}
              name={item.name}
              logo={item.logo}
              description={item.description}
              onClick={item.onClick}
            />
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col gap-6">
          {rotated.map((item, index) => (
            <CollaborationCard
              key={`${item.name}-${startIndex}-${index}`}
              name={item.name}
              logo={item.logo}
              description={item.description}
              onClick={item.onClick}
            />
          ))}
        </div>
      )}
    </div>
  );
});

CollaborationColumn.displayName = "CollaborationColumn";