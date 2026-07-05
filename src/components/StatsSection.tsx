import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function StatCounter({ end, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

interface StatsItem {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

interface StatsSectionProps {
  stats: StatsItem[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="stat-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="stat-value">
            <StatCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-desc">{stat.description}</div>
        </motion.div>
      ))}
    </div>
  );
}
