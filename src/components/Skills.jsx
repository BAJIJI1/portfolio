import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { FiCode, FiCpu, FiDatabase, FiMonitor, FiServer, FiTool } from "react-icons/fi";
import { skillGroups } from "../data/profile";
import Reveal from "./ui/Reveal";
import SkillCard from "./ui/SkillCard";

const GROUP_ICONS = {
  "Programming Languages": FiCode,
  "Backend Frameworks": FiServer,
  "Frontend Technologies": FiMonitor,
  Databases: FiDatabase,
  "Tools & Technologies": FiTool,
  "Concepts & Methodologies": FiCpu,
};

// The curve stays inside a narrow center band; each card is anchored by its
// near edge to a point on the curve, so the line touches the card without
// ever running across its body.
const CURVE_VIEWBOX = { width: 1000, height: 1700 };
const NODE_X = { left: 42, right: 58 };
const points = skillGroups.map((_, i) => ({
  x: i % 2 === 0 ? NODE_X.left : NODE_X.right,
  y: 10 + i * (80 / Math.max(1, skillGroups.length - 1)),
}));

function toSvgPath(pts) {
  if (pts.length < 2) return "";
  const toXY = (p) => ({ x: (p.x / 100) * CURVE_VIEWBOX.width, y: (p.y / 100) * CURVE_VIEWBOX.height });
  const svgPts = pts.map(toXY);
  let d = `M ${svgPts[0].x} ${svgPts[0].y}`;
  for (let i = 0; i < svgPts.length - 1; i++) {
    const p0 = svgPts[i];
    const p1 = svgPts[i + 1];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

const curvePath = toSvgPath(points);

export default function Skills() {
  const curveRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: curveRef,
    offset: ["start 80%", "end 60%"],
  });

  return (
    <section id="skills" className="relative py-24 sm:py-28 overflow-hidden bg-bg-light-alt dark:bg-bg-dark-alt">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-6rem] left-[15%] h-[22rem] w-[22rem] rounded-full bg-emerald/10 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[10%] h-[24rem] w-[24rem] rounded-full bg-emerald/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-block font-mono text-sm text-emerald font-medium mb-3">
            Skills
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
            Tools I build with
          </h2>
          <p className="mt-4 text-muted dark:text-white/60 max-w-2xl">
            A full-stack toolkit spanning languages, frameworks, databases, and the tooling that
            ships secure production systems.
          </p>
        </Reveal>

        {/* Desktop — cards sit along a winding curve that draws in as you scroll */}
        <div ref={curveRef} className="hidden lg:block relative mt-16 h-[1700px]">
          <svg
            viewBox={`0 0 ${CURVE_VIEWBOX.width} ${CURVE_VIEWBOX.height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            fill="none"
          >
            <path d={curvePath} stroke="currentColor" strokeWidth="2" className="text-navy/10 dark:text-white/10" />
            <motion.path
              d={curvePath}
              stroke="var(--color-emerald)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>

          {skillGroups.map((group, i) => {
            const Icon = GROUP_ICONS[group.group] ?? FiCode;
            const point = points[i];
            const isLeft = i % 2 === 0;
            return (
              <div key={group.group}>
                {/* Node marking where the curve meets this card's edge */}
                <div
                  className="absolute h-2.5 w-2.5 rounded-full bg-emerald shadow-[0_0_10px_3px_rgba(16,185,129,0.6)] z-10"
                  style={{ left: `${point.x}%`, top: `${point.y}%`, transform: "translate(-50%, -50%)" }}
                />
                <div
                  className="absolute w-[320px] z-10"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    transform: isLeft ? "translate(-100%, -50%) translateX(-1rem)" : "translate(0%, -50%) translateX(1rem)",
                  }}
                >
                  <SkillCard
                    group={group}
                    index={i}
                    icon={Icon}
                    scrollYProgress={scrollYProgress}
                    frac={point.y / 100}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile / tablet — simple stacked list, no curve */}
        <div className="lg:hidden mt-14 space-y-6">
          {skillGroups.map((group, i) => {
            const Icon = GROUP_ICONS[group.group] ?? FiCode;
            return <SkillCard key={group.group} group={group} index={i} icon={Icon} />;
          })}
        </div>
      </div>
    </section>
  );
}
