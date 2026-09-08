import { HiOutlineBadgeCheck } from "react-icons/hi";
import { issuerLogos } from "../../data/profile";

export default function CertificateCard({ certificate, onOpen }) {
  const logo = issuerLogos[certificate.issuer];

  return (
    <div onClick={() => onOpen(certificate)} className="group h-80 sm:h-96 [perspective:1200px] cursor-pointer">
      <div className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front — name, issuer, description */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark p-7 sm:p-9 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <span className="font-mono text-sm text-muted">{certificate.date}</span>
            <span className="relative flex h-11 w-auto max-w-[130px] items-center justify-center rounded-xl bg-white shrink-0 overflow-hidden shadow-sm px-2.5">
              {logo && (
                <img
                  src={logo}
                  alt={certificate.issuer}
                  className="h-full w-auto max-w-full object-contain py-1.5"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling.style.display = "flex";
                  }}
                />
              )}
              <span
                className={`${logo ? "hidden" : "flex"} h-11 w-11 items-center justify-center bg-emerald/10 text-emerald rounded-xl`}
              >
                <HiOutlineBadgeCheck size={22} />
              </span>
            </span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-navy dark:text-white mt-5">
            {certificate.name}
          </h3>
          <p className="text-sm font-medium text-emerald mt-1">{certificate.issuer}</p>
          {certificate.description && (
            <p className="text-sm text-body-light dark:text-body-dark leading-relaxed mt-3 line-clamp-4">
              {certificate.description}
            </p>
          )}
          <p className="mt-auto pt-4 text-[11px] uppercase tracking-wider text-muted">
            <span className="hidden sm:inline">Hover to preview · Click to expand</span>
            <span className="sm:hidden">Tap to expand</span>
          </p>
        </div>

        {/* Back — the certificate paper */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-navy/10 dark:border-white/10 bg-navy/5 dark:bg-white/5 overflow-hidden">
          <div className="relative h-full w-full flex items-center justify-center">
            <img
              src={certificate.paper}
              alt={`${certificate.name} certificate`}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            <div className="hidden absolute inset-0 items-center justify-center text-center px-4">
              <p className="text-sm text-muted">Certificate image coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
