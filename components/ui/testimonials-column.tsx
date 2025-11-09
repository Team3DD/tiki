// components/ui/testimonials-column.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card"; // Asegúrate de la ruta correcta

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`relative overflow-hidden h-[700px] ${props.className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <GlassCard
                key={`${groupIndex}-${i}`}
                variant="muted"
                rounded="lg"
                padding="lg"
                blur="md"
                className="max-w-xs w-full"
              >
                <div className="text-foreground/80 text-sm leading-relaxed">{text}</div>
                <div className="mt-5">
                  <div className="font-medium tracking-tight leading-5 text-foreground">{name}</div>
                  <div className="leading-5 opacity-60 tracking-tight text-foreground/60">{role}</div>
                </div>
              </GlassCard>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};