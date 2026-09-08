import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { HiOutlineArrowUp, HiOutlineDownload } from "react-icons/hi";
import { profile } from "../data/profile";

const socials = [
  { icon: FiGithub, href: profile.github, label: "GitHub" },
  { icon: FiLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-navy/10 dark:border-white/10 bg-bg-light-alt dark:bg-bg-dark-alt">
      {/* Oversized drifting name, kept as faint background texture with a light sweep passing across it */}
      <div className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none">
        <div className="relative flex shrink-0">
          <motion.span
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 whitespace-nowrap font-display font-bold text-navy/[0.025] dark:text-white/[0.035] text-[4rem] sm:text-[5.5rem] leading-none tracking-tight blur-[1px]"
          >
            <span className="pr-12">BAJIJI BORAH </span>
            <span className="pr-12">BAJIJI BORAH </span>
          </motion.span>

          {/* Light sweeping across the same text, giving it a moment of visibility */}
          <motion.span
            aria-hidden="true"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex shrink-0 whitespace-nowrap font-display font-bold text-[4rem] sm:text-[5.5rem] leading-none tracking-tight bg-clip-text text-transparent bg-[linear-gradient(100deg,transparent_47%,var(--color-emerald)_50%,transparent_53%)] bg-[length:260%_100%] animate-footer-shimmer"
          >
            <span className="pr-12">BAJIJI BORAH </span>
            <span className="pr-12">BAJIJI BORAH </span>
          </motion.span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 dark:bg-white/10 text-navy dark:text-white hover:bg-emerald hover:text-white transition-colors"
        >
          <HiOutlineArrowUp size={16} />
        </button>

        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/5 dark:bg-white/10 text-navy dark:text-white hover:bg-emerald hover:text-white transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <a
          href={profile.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-body-light dark:text-body-dark hover:text-emerald transition-colors"
        >
          <HiOutlineDownload size={16} /> Download CV
        </a>
      </div>

      <div className="border-t border-navy/10 dark:border-white/10 py-5">
        <p className="text-center text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
