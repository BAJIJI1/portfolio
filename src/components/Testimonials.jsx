import { HiOutlineChatAlt2 } from "react-icons/hi";
import { testimonials } from "../data/profile";
import SectionHeading from "./ui/SectionHeading";
import { StaggerContainer, StaggerItem } from "./ui/Stagger";

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Testimonials" title="What people say" center />

        <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="h-full rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light-alt dark:bg-bg-dark-alt p-7 scale-100 hover:scale-105 hover:border-emerald/40 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <HiOutlineChatAlt2 className="text-emerald" size={28} />
                  {t.isPlaceholder && (
                    <span className="text-[10px] uppercase tracking-wide font-medium text-muted bg-navy/5 dark:bg-white/10 rounded-full px-2.5 py-1 shrink-0">
                      Placeholder quote
                    </span>
                  )}
                </div>
                <p className="mt-4 text-body-light dark:text-body-dark leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full overflow-hidden bg-navy/10 dark:bg-white/10 shrink-0 flex items-center justify-center">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
                      }}
                    />
                    <span className="hidden font-display font-semibold text-navy/50 dark:text-white/40 text-sm">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-muted mt-0.5">{t.title}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
