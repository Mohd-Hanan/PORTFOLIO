import { useState, useEffect, useRef } from "react";
import profilePhoto from "../assets/profile.png";
import { motion, useInView } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Github,
  ExternalLink,
  Award,
  Code2,
  Cpu,
  Users,
  GraduationCap,
  BookOpen,
  ChevronUp,
  Send,
  Loader2,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle2,
  House,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = {
  Programming: ["Python", "Java", "C", "SQL", "R"],
  Technologies: ["Machine Learning", "Arduino", "Git", "GitHub"],
  Concepts: ["Data Structures", "Clustering Algorithms", "DBMS", "Operating Systems"],
};

const PROJECTS = [
  {
    num: "01",
    role: "Team Lead · 4 Members",
    name: "PowerGuard",
    subtitle: "Electricity Bill Prediction System",
    desc: "ML system that predicts electricity bills from consumption data. Led a 4-person team, managed task splits on GitHub, and handled the model training pipeline in Java.",
    tech: ["Java", "Machine Learning"],
    link: "https://github.com/Mohd-Hanan/AP-PROJECT",
  },
  {
    num: "02",
    role: "Team Lead · 5 Members",
    name: "Customer Segmentation",
    subtitle: "Clustering-Based ML Model",
    desc: "Built a model that groups customers by purchasing behaviour using clustering algorithms. Learned a lot about what 'meaningful segments' actually means when you have to explain it to someone.",
    tech: ["Python", "Machine Learning"],
    link: "https://github.com/Mohd-Hanan/IML-PROJECT",
  },
  {
    num: "03",
    role: "IoT Project · 1st Year",
    name: "Water Level Monitor",
    subtitle: "Arduino-Based IoT System",
    desc: "IoT water-level monitor built with Arduino UNO and ultrasonic sensors for Idea Lab. First hardware project — more debugging than I expected, which is when I got properly into electronics.",
    tech: ["Arduino UNO", "Sensors", "IoT"],
    link: null,
  },
];

const CERTS = [
  { name: "Cyber Security", org: "NPTEL" },
  { name: "Data Science for Engineers", org: "NPTEL" },
  { name: "Programming in Java", org: "NPTEL" },
];

function useScrollSpy() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

interface EmailJSConfig {
  emailjsPublicKey: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [ejsConfig, setEjsConfig] = useState<EmailJSConfig | null>(null);
  const active = useScrollSpy();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((cfg: EmailJSConfig) => {
        if (cfg.emailjsPublicKey) {
          emailjs.init({ publicKey: cfg.emailjsPublicKey });
        }
        setEjsConfig(cfg);
      })
      .catch(() => {});
  }, []);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(data: ContactForm) {
    if (!ejsConfig?.emailjsPublicKey) {
      toast.error("Email service not ready. Please try again in a moment.");
      return;
    }
    setSubmitting(true);
    try {
      await emailjs.send(
        ejsConfig.emailjsServiceId,
        ejsConfig.emailjsTemplateId,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        }
      );
      toast.success("Message sent! I'll reply within a day or two.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function scrollTo(href: string) {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/[0.05] dark:bg-primary/[0.08] blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[400px] rounded-full bg-blue-500/[0.04] dark:bg-blue-500/[0.05] blur-[100px]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] rounded-full bg-primary/[0.03] dark:bg-primary/[0.05] blur-[90px]" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-xl bg-background/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
            className="p-2 rounded-md text-foreground hover:text-primary hover:bg-muted/50 transition-colors"
            aria-label="Home"
          >
            <House size={22} />
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    active === l.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Menu"
              data-testid="button-mobile-menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => scrollTo(l.href)}
                className="text-left px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative z-10 pt-28 pb-24 md:pt-36 md:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 order-2 md:order-1">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="space-y-5"
              >
                <motion.div variants={fadeUp}>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Muhammed<br />
                  <span className="gradient-text">Hanan PP</span>
                </motion.h1>

                <motion.p variants={fadeUp} className="text-muted-foreground text-base font-medium">
                  CS (AI) Student &nbsp;·&nbsp; TKM College of Engineering
                </motion.p>

                <motion.p variants={fadeUp} className="text-foreground/70 text-base leading-relaxed max-w-xl">
                  Second-year BTech student who actually enjoys the debugging part.
                  I build <strong className="text-foreground/90">ML systems and IoT projects</strong>, lead teams without being annoying about it,
                  and care more about code that works than code that looks impressive.
                </motion.p>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                  {["ML pipelines", "IoT prototyping", "Team leadership"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary border border-border text-secondary-foreground text-xs rounded-md font-medium">
                      {tag}
                    </span>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-1">
                  <button
                    onClick={() => scrollTo("#projects")}
                    className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98]"
                    data-testid="button-view-work"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollTo("#contact")}
                    className="px-5 py-2.5 bg-transparent border border-border text-foreground text-sm font-semibold rounded-lg hover:bg-muted/50 hover:border-primary/40 transition-all active:scale-[0.98]"
                    data-testid="button-get-in-touch"
                  >
                    Get in Touch
                  </button>
                </motion.div>
              </motion.div>
            </div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 md:order-2 flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/20 blur-2xl" />
                <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full border-2 border-primary/30 overflow-hidden glow-border">
                  <img
                    src={profilePhoto}
                    alt="Muhammed Hanan PP"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 rounded-full ring-1 ring-primary/20" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-card border border-border rounded-full text-xs text-muted-foreground whitespace-nowrap font-medium">
                  BTech · AI · 2nd Year
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center gap-2 mt-16 text-muted-foreground/50 text-xs"
          >
            <div className="w-5 h-8 border border-muted-foreground/20 rounded-full flex items-start justify-center pt-1.5">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                className="w-1 h-1.5 bg-muted-foreground/40 rounded-full"
              />
            </div>
            <span>Scroll</span>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">About Me</span>
          </RevealSection>
          <div className="mt-8 grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <RevealSection>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Who I Am</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed">
                <p>
                  I'm a <strong className="text-foreground/90">second-year CS (AI) student at TKM College of Engineering</strong>, Kerala.
                  Got into this field because I found it genuinely interesting — not because it's trending.
                  Most of my time goes into building ML pipelines, tinkering with hardware, and figuring out
                  how to lead a team without micromanaging everyone.
                </p>
                <p>
                  I've led two project teams so far, shipping a prediction model and a segmentation system.
                  Both times I learned that clean GitHub history matters almost as much as clean code.
                  Still figuring things out, but I ship, and I learn fast.
                </p>
              </div>
            </RevealSection>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: 3, label: "Projects", icon: Code2 },
                { num: 3, label: "Certifications", icon: Award },
                { num: "4th", label: "Semester", icon: BookOpen },
                { num: 2, label: "Team Lead Roles", icon: Users },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  className="p-5 rounded-xl bg-card border border-card-border glow-border transition-all"
                  data-testid={`card-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <s.icon size={18} className="text-primary mb-3" />
                  <div className="font-display text-3xl font-bold text-foreground">{s.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Education</span>
          </RevealSection>
          <RevealSection className="mt-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-8">Academic Background</h2>
          </RevealSection>
          <RevealSection>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 rounded-xl bg-card border border-card-border glow-border">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <GraduationCap size={22} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground font-medium mb-0.5">2024 – 2028</div>
                <div className="font-semibold text-foreground">BTech — Computer Science (Artificial Intelligence)</div>
                <div className="text-sm text-muted-foreground mt-0.5">TKM College of Engineering, Kollam, Kerala</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold whitespace-nowrap">
                4th Semester
              </span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Technical Skills</span>
          </RevealSection>
          <RevealSection className="mt-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-8">What I Work With</h2>
          </RevealSection>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {Object.entries(SKILLS).map(([group, tags]) => (
              <motion.div
                key={group}
                variants={fadeUp}
                className="p-6 rounded-xl bg-card border border-card-border glow-border"
              >
                <div className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-secondary border border-border text-secondary-foreground text-xs rounded-md font-medium"
                      data-testid={`tag-skill-${tag.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Projects</span>
          </RevealSection>
          <RevealSection className="mt-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-8">What I've Built</h2>
          </RevealSection>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {PROJECTS.map((p) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                className="group p-6 rounded-xl bg-card border border-card-border glow-border flex flex-col"
                data-testid={`card-project-${p.num}`}
              >
                <div className="font-display text-4xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors mb-1">{p.num}</div>
                <div className="text-xs text-muted-foreground font-medium mb-2">{p.role}</div>
                <h3 className="font-display text-xl font-bold text-foreground">{p.name}</h3>
                <p className="text-sm text-primary mb-3">{p.subtitle}</p>
                <p className="text-sm text-foreground/60 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                  {p.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-secondary border border-border text-secondary-foreground text-xs rounded font-medium">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link"
                    data-testid={`link-github-${p.num}`}
                  >
                    View on GitHub
                    <ExternalLink size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Certifications</span>
          </RevealSection>
          <RevealSection className="mt-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-8">Learning & Credentials</h2>
          </RevealSection>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-3"
          >
            {CERTS.map((c, i) => (
              <motion.div
                key={c.name}
                variants={fadeUp}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-card-border glow-border"
                data-testid={`card-cert-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Award size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.org}</div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 size={12} />
                  Completed
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 py-20 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <RevealSection>
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Contact</span>
          </RevealSection>
          <RevealSection className="mt-2">
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-8">Get in Touch</h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">
            {/* Contact info */}
            <RevealSection className="space-y-4">
              <a
                href="mailto:mohdhanan197@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border glow-border hover:border-primary/30 transition-all group"
                data-testid="link-email"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">Email</div>
                  <div className="text-sm text-foreground font-medium">mohdhanan197@gmail.com</div>
                </div>
              </a>

              <a
                href="https://github.com/Mohd-Hanan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-card-border glow-border hover:border-primary/30 transition-all group"
                data-testid="link-github-contact"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <Github size={18} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">GitHub</div>
                  <div className="text-sm text-foreground font-medium">github.com/Mohd-Hanan</div>
                </div>
              </a>

              <div className="p-5 rounded-xl bg-card border border-card-border">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to internships, collaborations, and interesting problems. I usually reply within a day or two.
                </p>
              </div>
            </RevealSection>

            {/* Contact form */}
            <RevealSection>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="p-6 rounded-xl bg-card border border-card-border space-y-4"
                data-testid="form-contact"
              >
                <p className="text-sm text-muted-foreground">Send me a message — I reply within a day or two.</p>

                <div>
                  <label htmlFor="from_name" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="from_name"
                    {...form.register("name")}
                    placeholder="e.g. Arjun Menon"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    data-testid="input-name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="reply_to" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    id="reply_to"
                    type="email"
                    {...form.register("email")}
                    placeholder="you@email.com"
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    data-testid="input-email"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...form.register("message")}
                    placeholder="What's on your mind?"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                    data-testid="textarea-message"
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-destructive mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25"
                  data-testid="button-send-message"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 section-divider">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">&copy; 2025 Muhammed Hanan PP</span>
          <button
            onClick={() => scrollTo("#hero")}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-back-to-top"
          >
            <ChevronUp size={15} />
            Back to top
          </button>
        </div>
      </footer>
    </div>
  );
}
