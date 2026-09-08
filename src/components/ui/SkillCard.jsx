import { motion, useMotionValue, useTransform } from "framer-motion";

export default function SkillCard({ group, index, icon: Icon, className = "", scrollYProgress, frac }) {
  // When driven by the growing curve (desktop), stay hidden until the tip's
  // scroll progress reaches this card's node, then fade/slide in as it arrives.
  const isScrollSynced = scrollYProgress != null && frac != null;
  const start = isScrollSynced ? Math.max(0, frac - 0.08) : 0;
  const fallbackProgress = useMotionValue(0);
  const syncedOpacity = useTransform(scrollYProgress ?? fallbackProgress, [start, frac ?? 1], [0, 1]);
  const syncedY = useTransform(scrollYProgress ?? fallbackProgress, [start, frac ?? 1], [30, 0]);

  const motionProps = isScrollSynced
    ? { style: { opacity: syncedOpacity, y: syncedY } }
    : {
        initial: { opacity: 0, y: 40, scale: 0.94 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.div className={className} {...motionProps}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className="group relative h-full rounded-2xl border border-navy/10 dark:border-emerald/20 bg-linear-to-br from-navy/3 via-bg-light to-emerald/6 dark:from-white/6 dark:via-white/3 dark:to-emerald/6 p-6 overflow-hidden hover:border-emerald hover:shadow-[0_0_0_1px_rgba(16,185,129,0.6),0_0_18px_rgba(16,185,129,0.55)] transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/10"
      >
        {/* Triangular light wedge in the top-right corner */}
        <div
          className="absolute inset-0 opacity-25 dark:opacity-100"
          style={{
            clipPath: "polygon(100% 0%, 100% 100%, 0% 0%)",
            background:
              "linear-gradient(225deg, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0.12) 40%, transparent 70%)",
          }}
        />

        <div className="relative flex items-start justify-between mb-6">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10 border border-emerald/30 text-emerald">
            <Icon size={22} />
          </span>
          <span className="font-mono text-sm font-bold text-emerald">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="relative font-display font-semibold text-lg text-navy dark:text-white">
          {group.group}
        </h3>
        <p className="relative mt-1.5 text-sm text-muted dark:text-white/50">{group.subtitle}</p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-emerald/30 bg-emerald/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald/90"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
