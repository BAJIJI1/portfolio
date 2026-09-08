import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function CertificateTitleRow({ certificate, index, isActive, onActive, onOpen }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <div
      ref={ref}
      onClick={() => onOpen(certificate)}
      className="min-h-[45vh] flex flex-col justify-center cursor-pointer"
    >
      <span
        className={`font-mono text-sm mb-2 transition-colors ${
          isActive ? "text-emerald" : "text-muted"
        }`}
      >
        ({String(index + 1).padStart(2, "0")})
      </span>
      <h4
        className={`font-display font-black text-4xl sm:text-5xl leading-[0.95] transition-colors ${
          isActive ? "text-navy dark:text-white" : "text-navy/30 dark:text-white/25"
        }`}
      >
        {certificate.name}
      </h4>
    </div>
  );
}
