import { motion } from "framer-motion";
import { HiOutlineArrowRight, HiOutlineDownload, HiOutlineSparkles } from "react-icons/hi";
import { profile } from "../data/profile";
import TypewriterQuoteCard from "./ui/TypewriterQuoteCard";

const roles = ["Full-Stack Software Developer", "React & Spring Boot Engineer", "ASP.NET Core Builder"];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-bg-light dark:bg-bg-dark">
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-navy/30 dark:bg-navy/40 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 50, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-emerald/30 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 30, -60, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-6rem] left-1/4 h-[24rem] w-[24rem] rounded-full bg-emerald/20 dark:bg-navy/30 blur-[110px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(31,56,100,0.08)_1px,transparent_0)] [background-size:28px_28px]" />
      </div>

      <div className="mx-auto max-w-6xl w-full px-5 sm:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-sm font-medium text-emerald mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-navy dark:text-white"
          >
            Hlo, I'm <span className="text-gradient-brand">{profile.name}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-4 font-mono text-emerald text-base sm:text-lg"
          >
            {roles[0]}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-5 text-base sm:text-lg text-black dark:text-white max-w-xl leading-relaxed"
          >
            Based in {profile.location}, I build secure, data-driven web applications end to end —
            from real-time analytics dashboards to production systems handling authentication, payments,
            and fraud detection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-5 flex items-center gap-2 text-sm text-muted"
          >
            <HiOutlineSparkles className="text-emerald shrink-0" size={18} />
            <span>
              Currently learning{" "}
              <span className="text-navy dark:text-body-dark font-medium">
                {profile.currentlyLearning.join(" · ")}
              </span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              href={profile.cvPath}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex items-center gap-1.5 rounded-full bg-emerald text-white text-sm font-semibold px-4 py-2 shadow-lg shadow-emerald/25 transition-shadow duration-300 hover:shadow-xl hover:shadow-emerald/40"
            >
              <HiOutlineDownload size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group inline-flex items-center gap-1.5 rounded-full border-2 border-navy dark:border-white/30 text-navy dark:text-white text-sm font-semibold px-4 py-2 overflow-hidden relative transition-colors duration-300 hover:border-emerald hover:text-white dark:hover:text-white"
            >
              <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-emerald transition-transform duration-300 ease-out group-hover:scale-x-100" />
              Hire Me!
              <HiOutlineArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-65 sm:max-w-75"
        >
          {/* Slow continuous float */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <TypewriterQuoteCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
