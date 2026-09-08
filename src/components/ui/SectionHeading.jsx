import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      {eyebrow && (
        <span className="inline-block font-mono text-sm text-emerald font-medium mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-navy dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-muted max-w-2xl ${center ? "mx-auto" : ""}`}>{subtitle}</p>
      )}
    </Reveal>
  );
}
