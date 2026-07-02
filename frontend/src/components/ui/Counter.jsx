import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate, useReducedMotion } from "framer-motion";

// Animated count-up. Runs once when scrolled into view.
export default function Counter({
  to = 100,
  duration = 1.8,
  suffix = "",
  prefix = "",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${to}${suffix}`;
      return;
    }
    const controls = animate(count, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
        }
      },
    });
    return controls.stop;
  }, [inView, to, duration, suffix, prefix, count, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
