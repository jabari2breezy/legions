"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Legions stepped in when we needed them most. The dedication these students showed in renovating Ujasiri House was nothing short of inspiring.",
    author: "Staff Representative",
    role: "Ujasiri House / Muhimbili",
  },
  {
    quote: "Seeing the youth take charge of our environment gives me hope. The tree planting initiative changed our school environment completely.",
    author: "School Headmaster",
    role: "Dar es Salaam Partner School",
  },
  {
    quote: "I joined to get service hours, but I stayed because of the family. Legions taught me that my age doesn't limit my ability to help.",
    author: "Student Volunteer",
    role: "Legions Member",
  },
];

export default function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="overflow-hidden py-6">
      <motion.div
        className="flex gap-16 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((t, i) => (
          <div key={i} className="w-[500px] flex-shrink-0 border-t border-line pt-8">
            <p className="font-serif text-2xl leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-6">
              <p className="text-sm font-medium">{t.author}</p>
              <p className="text-xs text-muted tracking-wide">{t.role}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
