import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineAcademicCap, HiOutlineBadgeCheck } from "react-icons/hi";
import { certificates, education } from "../data/profile";
import SectionHeading from "./ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "./ui/Stagger";
import CertificateCard from "./ui/CertificateCard";
import CertificateTitleRow from "./ui/CertificateTitleRow";
import CertificateModal from "./ui/CertificateModal";

export default function Education() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeInViewCertificate = certificates[activeIndex];

  return (
    <section id="education" className="py-24 sm:py-28 bg-bg-light-alt dark:bg-bg-dark-alt">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Education" title="Education & Certificates" />

        {/* Education */}
        <div className="mt-14">
          <h3 className="font-display font-semibold text-navy dark:text-white mb-5 flex items-center gap-2">
            <HiOutlineAcademicCap className="text-emerald" size={20} /> Education
          </h3>
          <StaggerContainer className="grid sm:grid-cols-2 gap-5" stagger={0.1}>
            {education.map((e) => (
              <StaggerItem key={e.degree}>
                <div className="h-full rounded-xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-navy dark:text-white text-base">{e.degree}</h4>
                    <span className="font-mono text-xs text-emerald shrink-0">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{e.place}</p>
                  {e.details && (
                    <p className="text-sm text-body-light dark:text-body-dark mt-2 leading-relaxed">
                      {e.details}
                    </p>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Certificates — giant scroll-synced titles on the left, a sticky preview card on the right */}
        <div className="relative mt-20">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-10 left-1/4 h-72 w-72 rounded-full bg-emerald/10 blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-navy/10 dark:bg-emerald/10 blur-[100px]" />
          </div>

          <h3 className="font-display font-semibold text-navy dark:text-white mb-5 flex items-center gap-2">
            <HiOutlineBadgeCheck className="text-emerald" size={20} /> Certificates
          </h3>

          <div className="grid lg:grid-cols-2 gap-x-10">
            <div>
              {certificates.map((c, i) => (
                <div key={c.name}>
                  <CertificateTitleRow
                    certificate={c}
                    index={i}
                    isActive={i === activeIndex}
                    onActive={setActiveIndex}
                    onOpen={setActiveCertificate}
                  />
                  <div className="lg:hidden pb-10">
                    <CertificateCard certificate={c} onOpen={setActiveCertificate} />
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden lg:block">
              <div className="sticky top-28">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeInViewCertificate.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CertificateCard certificate={activeInViewCertificate} onOpen={setActiveCertificate} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CertificateModal certificate={activeCertificate} onClose={() => setActiveCertificate(null)} />
    </section>
  );
}
