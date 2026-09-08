import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { formspreeEndpoint, objectiveOptions, profile } from "../data/profile";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Select from "./ui/Select";

const contactItems = [
  { icon: HiOutlineMail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: HiOutlinePhone, label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { icon: FaLinkedin, label: profile.linkedinHandle, href: profile.linkedin },
  { icon: HiOutlineLocationMarker, label: profile.location, href: null },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", objective: objectiveOptions[0], message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear that field's error as soon as the user edits it, rather than
    // leaving stale error text until the next submit attempt.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    else if (form.name.trim().length < 2) next.name = "Name must be at least 2 characters.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Message is required.";
    else if (form.message.trim().length < 10) next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // NOTE: replace `formspreeEndpoint` in src/data/profile.js with your real
      // Formspree endpoint (https://formspree.io/f/YOUR_FORM_ID) once created.
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", objective: objectiveOptions[0], message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something together"
          subtitle="Open to new opportunities, collaborations, and interesting problems."
        />

        <div className="mt-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <Reveal className="h-full flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-sm font-medium text-emerald mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
              </span>
              {profile.availability}
            </div>

            <div className="space-y-4">
              {contactItems.map(({ icon: Icon, label, href }) => {
                const content = (
                  <>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/10 text-emerald group-hover:bg-emerald group-hover:text-white transition-colors shrink-0">
                      <Icon size={18} />
                    </span>
                    <span className="text-sm text-body-light dark:text-body-dark group-hover:text-emerald transition-colors break-all">
                      {label}
                    </span>
                  </>
                );
                return href ? (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-3"
                  >
                    {content}
                  </motion.a>
                ) : (
                  <div key={label} className="group flex items-center gap-3">
                    {content}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light-alt dark:bg-bg-dark-alt p-6 sm:p-8"
            >
              <h3 className="font-display font-semibold text-lg text-navy dark:text-white mb-6">
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-body-light dark:text-body-dark mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    className={`w-full rounded-lg border bg-bg-light dark:bg-bg-dark px-4 py-2.5 text-sm text-body-light dark:text-body-dark focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
                        : "border-navy/15 dark:border-white/15 focus:ring-emerald/50 focus:border-emerald"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-body-light dark:text-body-dark mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    className={`w-full rounded-lg border bg-bg-light dark:bg-bg-dark px-4 py-2.5 text-sm text-body-light dark:text-body-dark focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
                        : "border-navy/15 dark:border-white/15 focus:ring-emerald/50 focus:border-emerald"
                    }`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="objective" className="block text-sm font-medium text-body-light dark:text-body-dark mb-1.5">
                  What's this about?
                </label>
                <Select
                  id="objective"
                  value={form.objective}
                  onChange={(v) => updateField("objective", v)}
                  options={objectiveOptions}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="block text-sm font-medium text-body-light dark:text-body-dark mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  className={`w-full rounded-lg border bg-bg-light dark:bg-bg-dark px-4 py-2.5 text-sm text-body-light dark:text-body-dark focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
                      : "border-navy/15 dark:border-white/15 focus:ring-emerald/50 focus:border-emerald"
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-navy to-emerald hover:brightness-110 active:scale-95 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 transition-all duration-200"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-emerald/10 text-emerald px-4 py-3 text-sm"
                  >
                    <HiOutlineCheckCircle size={18} />
                    Message sent — thank you! I'll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 text-red-500 px-4 py-3 text-sm"
                  >
                    <HiOutlineExclamationCircle size={18} />
                    Something went wrong — please try again or email me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
