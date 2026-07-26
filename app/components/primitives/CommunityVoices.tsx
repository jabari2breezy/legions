"use client";

import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    quote: "Before Legions, I never thought students could actually renovate an entire classroom. Now we have done five.",
    author: "Amina Juma",
    role: "Volunteer, Class Renovation Project",
  },
  {
    quote: "The beach cleanup changed how I see my own neighborhood. We returned the next weekend on our own.",
    author: "Daniel Mushi",
    role: "Team Lead, Mbezi Beach Cleanup",
  },
  {
    quote: "Legions taught me that organizing people is harder than organizing data. Both matter.",
    author: "Grace Kimaro",
    role: "Project Coordinator, Food Drive",
  },
];

export function CommunityVoices() {
  return (
    <div className="community-voices">
      <div className="community-voices-header">
        <p className="community-voices-label">COMMUNITY VOICES</p>
        <h2 className="community-voices-title">What people say</h2>
      </div>
      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            className="testimonial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-40px" }}
          >
            <span className="testimonial-quote-mark">&ldquo;</span>
            <p className="testimonial-text">{t.quote}</p>
            <p className="testimonial-author">{t.author}</p>
            <p className="testimonial-role">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
