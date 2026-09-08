import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineDownload, HiOutlineExternalLink, HiOutlineX } from "react-icons/hi";

export default function CertificateModal({ certificate, onClose }) {
  useEffect(() => {
    if (!certificate) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <HiOutlineX size={20} />
            </button>

            <div className="relative min-h-[280px] flex items-center justify-center bg-navy/5 dark:bg-white/5">
              <img
                src={certificate.paper}
                alt={`${certificate.name} certificate`}
                className="max-h-[60vh] w-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="hidden absolute inset-0 items-center justify-center text-center px-6">
                <p className="text-sm text-muted">Certificate image coming soon</p>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <h3 className="font-display font-bold text-lg text-navy dark:text-white">{certificate.name}</h3>
              <p className="text-sm text-emerald font-medium mt-1">{certificate.issuer}</p>
              {certificate.description && (
                <p className="mt-2 text-sm text-body-light dark:text-body-dark leading-relaxed">
                  {certificate.description}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="font-mono text-xs text-muted">{certificate.date}</p>
                {certificate.credentialId && (
                  <p className="font-mono text-xs text-muted">Credential ID {certificate.credentialId}</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {certificate.pdf && (
                  <a
                    href={certificate.pdf}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full bg-emerald hover:brightness-110 text-white text-sm font-semibold px-4 py-2 transition-all"
                  >
                    Download PDF <HiOutlineDownload size={14} />
                  </a>
                )}
                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border-2 border-navy dark:border-white/30 text-navy dark:text-white text-sm font-semibold px-4 py-2 hover:border-emerald hover:text-emerald transition-colors"
                  >
                    Show credential <HiOutlineExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
