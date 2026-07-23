"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

type Item = { src: string; alt: string };

export default function ColumnsSlider({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const colA = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const colB = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const colC = useTransform(scrollYProgress, [0, 1], ["-25%", "5%"]);

  const columns = [colA, colB, colC];

  return (
    <div ref={ref} className="grid grid-cols-3 gap-4 h-[80vh] overflow-hidden">
      {[0, 1, 2].map((c) => (
        <motion.div key={c} style={{ y: columns[c] }} className="flex flex-col gap-4">
          {items.filter((_, i) => i % 3 === c).map((item, i) => (
            <div key={i} className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
              <Image src={item.src} alt={item.alt} fill className="object-cover" />
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
