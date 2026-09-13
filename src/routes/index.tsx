import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Menu,
  Send,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import avatarAsset from "@/assets/samar-avatar.png.asset.json";
import { BeyondCanvas, HeroCanvas } from "@/components/three/Lazy3D";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samar Dev — Creative Developer" },
      {
        name: "description",
        content:
          "Samar Dev builds high-performance websites, interactive interfaces, and immersive 3D web experiences.",
      },
      { property: "og:title", content: "Samar Dev — Creative Developer" },
      {
        property: "og:description",
        content:
          "High-performance websites, interactive interfaces, and immersive 3D web experiences by Samar Dev.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Projects", "Services", "Process", "Contact"];
const roles = ["CREATIVE FULL-STACK DEVELOPER", "3D WEB EXPERIENCE DESIGNER", "MOTION UI CREATOR"];

const socialLinks = {
  instagram: { url: "https://instagram.com/samar._.x7", label: "Instagram", handle: "@samar._.x7", placeholder: false },
  github: { url: "https://github.com/", label: "GitHub", handle: "Placeholder link", placeholder: true },
  linkedin: { url: "https://linkedin.com/", label: "LinkedIn", handle: "Placeholder link", placeholder: true },
  email: { url: "mailto:hello@samerdev.com", label: "Email", handle: "hello@samerdev.com", placeholder: false },
};

const EMAIL = "hello@samerdev.com";

const projects = [
  {
    id: "orbit",
    number: "01",
    title: "Orbit AI",
    heading: "Orbit AI — Interactive SaaS Experience",
    type: "AI PRODUCT EXPERIENCE",
    year: "2026",
    cta: "EXPLORE PROJECT",
    summary:
      "A calm, high-velocity workspace that turns scattered research into clear, actionable intelligence.",
    tags: ["Next.js", "TypeScript", "WebGL"],
    palette: "project-orbit",
    detail:
      "Orbit AI reframes a complex research workflow as an approachable visual system. I led the experience from product language and interaction models through a performant front-end system.",
    contributions: ["Experience strategy", "Interaction design", "Front-end architecture", "Motion direction"],
  },
  {
    id: "beyond",
    number: "02",
    title: "Beyond Limits",
    heading: "Beyond Limits — Immersive Web Experience",
    type: "IMMERSIVE 3D EXPERIENCE",
    year: "2025",
    cta: "ENTER EXPERIENCE",
    summary:
      "A playful spatial portfolio where visitors navigate ideas through motion, light, and responsive sound.",
    tags: ["Three.js", "React Three Fiber", "GSAP"],
    palette: "project-beyond",
    detail:
      "Beyond Limits is an experimental web space built around discovery. I developed the creative concept, spatial interaction language, and adaptive system that keeps the experience fluid across devices.",
    contributions: ["Creative development", "3D art direction", "Shader prototyping", "Performance design"],
  },
];

const services = [
  ["01", "Creative development", "Expressive, high-performance sites built where design and engineering meet."],
  ["02", "Digital product design", "Useful systems shaped from first principle through polished interaction."],
  ["03", "3D & immersive web", "Spatial stories and WebGL moments that remain fast, clear, and purposeful."],
  ["04", "Motion & prototyping", "Interaction studies that make an idea tangible before full production."],
];

const process = [
  ["Discover", "Understanding ideas and goals"],
  ["Design", "Planning interfaces and experiences"],
  ["Build", "Writing clean, scalable code"],
  ["Refine", "Polish, optimize and perfect"],
];

type Project = (typeof projects)[number];
type Errors = Partial<Record<"name" | "email" | "project" | "message", string>>;

function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);
  return touch;
}

function Portfolio() {
  const reduced = useReducedMotion() ?? false;
  const touch = useIsTouch();
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectType, setProjectType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const processRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [processProgress, setProcessProgress] = useState(0);

  const { scrollY } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const avatarY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : -70]);
  const avatarScale = useTransform(heroProgress, [0, 1], [1, reduced ? 1 : 0.9]);
  const heroCopyY = useTransform(heroProgress, [0, 1], [0, reduced ? 0 : 60]);
  const heroFade = useTransform(heroProgress, [0, 0.85], [1, reduced ? 1 : 0.15]);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 320));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.35;
      let current = navItems[0]!;
      navItems.forEach((item) => {
        const el = document.getElementById(item.toLowerCase());
        if (el && el.getBoundingClientRect().top <= line) current = item;
      });
      setActiveSection(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const section = processRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const distance = section.offsetHeight + window.innerHeight * 0.5;
      const value = (window.innerHeight * 0.65 - rect.top) / distance;
      setProcessProgress(Math.max(0, Math.min(1, value)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollTo = (item: string) => {
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const nextErrors: Errors = {};
    if (name.length < 2) nextErrors.name = "Please share your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!projectType) nextErrors.project = "Choose a project type.";
    if (message.length < 20) nextErrors.message = "Tell me a little more (at least 20 characters).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitState("loading");
    window.setTimeout(() => {
      setSubmitState("success");
      form.reset();
      setProjectType("");
    }, 850);
  };

  const enter = (delay: number) =>
    reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        };

  return (
    <main className="overflow-clip bg-background text-foreground">
      <motion.header
        className={cn("site-header", scrolled && "is-scrolled")}
        {...enter(0.75)}
      >
        <div className="nav-pill mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)_auto] items-center px-3 py-2 sm:flex sm:justify-between">
          <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            SD<span>.</span>
          </button>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className={cn("nav-link", activeSection === item && "is-active")}>
                {item}
              </button>
            ))}
          </nav>
          <Button size="icon" variant="ghost" className="press sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <span className="hidden items-center gap-2 text-[11px] font-bold uppercase sm:flex"><i className="status-dot" /> Available</span>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="nav-mobile mx-auto mt-2 max-w-sm p-3 sm:hidden"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            >
              {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}<ChevronRight /></button>)}
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      <section ref={heroRef} className="hero relative flex min-h-[760px] items-end px-4 pb-10 pt-28 sm:min-h-[820px] sm:px-8 lg:min-h-screen lg:px-12">
        <motion.div className="hero-scene-layer" style={{ opacity: heroFade }} {...enter(0)}>
          <HeroCanvas />
        </motion.div>
        <motion.div className="peach-glow" {...enter(0.25)} />
        <div className="crosshair crosshair-one" aria-hidden="true" />
        <div className="hero-grid relative z-10 mx-auto w-full max-w-[1500px]">
          <motion.div className="hero-copy self-center pb-4 lg:pb-14" style={{ y: heroCopyY }}>
            <motion.p className="eyebrow mb-5" {...enter(0.55)}><span>◆</span> SAMAR DEV · CREATIVE DEVELOPER</motion.p>
            <motion.h1 className="hero-title hero-statement" {...enter(0.6)}>I’m born to build <em>immersive web experiences.</em></motion.h1>
            <motion.p className="signature-line" {...enter(0.66)}>Code with a point of view.</motion.p>
            <motion.div className="role-line mt-5" {...enter(0.7)}><strong key={roleIndex}>{roles[roleIndex]}</strong></motion.div>
            <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" {...enter(0.74)}>I bridge clean engineering and bold visual design to create digital experiences that people remember.</motion.p>
            <motion.div className="hero-stats mt-8" {...enter(0.8)}><div><b>1+ Year</b><span>Hands-on development</span></div><div><b>Global-ready</b><span>Built for connected audiences</span></div><div><b>Selected work</b><span>Projects with a point of view</span></div></motion.div>
          </motion.div>
          <motion.div
            className="avatar-stage relative flex min-h-[390px] items-end justify-center sm:min-h-[520px] lg:min-h-[650px]"
            style={{ y: avatarY, scale: avatarScale }}
            {...enter(0.4)}
          >
            <span className="avatar-label avatar-label-left">BASED IN<br /><b>THE INTERNET</b></span>
            <img src={avatarAsset.url} alt="3D portrait of Samar Dev wearing a bright orange hoodie" className="avatar-image" />
            <span className="avatar-label avatar-label-right">OPEN TO<br /><b>SELECT PROJECTS</b></span>
            <div className="signal-card"><i className="status-dot" /><span>ONLINE</span><b>12:48 UTC</b></div>
          </motion.div>
          <motion.button className="scroll-cue press" onClick={() => scrollTo("About")} {...enter(0.9)}><span>SCROLL TO EXPLORE</span><ArrowDown /></motion.button>
        </div>
      </section>

      <Ticker reduced={reduced} />

      <AboutSection reduced={reduced} touch={touch} />

      <ProjectsSection onOpen={setSelectedProject} touch={touch} reduced={reduced} />

      <section id="services" className="section-shell border-t border-border">
        <SectionIndex number="03" label="Services" aside="Available independently or as one connected engagement." />
        <div className="services-list mt-12 sm:mt-16">
          {services.map(([number, title, description], i) => (
            <motion.div
              className="service-row"
              key={number}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <span>{number}</span><h3>{title}</h3><p>{description}</p>
              <i className="service-node" aria-hidden="true" />
              <b className="service-diamond" aria-hidden="true">◆</b>
              <em className="service-line" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="experience-band">
        <div className="section-shell py-0">
          <SectionIndex number="04" label="Experience" />
          <div className="experience-list mt-12">
            <div><time>NOW</time><h3>1+ Year Hands-on Web Development</h3><p>Building, learning and shipping modern web experiences.</p></div>
          </div>
        </div>
      </section>

      <section id="process" ref={processRef} className="section-shell border-t border-border">
        <SectionIndex number="05" label="Process" aside="Clear stages. Close collaboration. No black boxes." />
        <div className="process-layout mt-14">
          <div className="process-rail" aria-hidden="true"><span style={{ transform: `scaleY(${processProgress})` }} /></div>
          <div className="process-steps">
            {process.map(([title, description], index) => (
              <article key={title} className={cn("process-step", processProgress >= index / process.length && "is-reached")}>
                <b>0{index + 1}</b><h3>{title}</h3><p>{description}</p><span className="process-diamond" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <AvailabilityBand onCta={() => scrollTo("Contact")} reduced={reduced} />

      <ContactScene
        reduced={reduced}
        touch={touch}
        copied={copied}
        onCopy={copyEmail}
        errors={errors}
        projectType={projectType}
        setProjectType={setProjectType}
        submitState={submitState}
        setSubmitState={setSubmitState}
        onSubmit={submitContact}
      />

      <footer><div className="section-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"><b>SD<span>.</span></b><p>© 2026 Samar Dev. Built with curiosity.</p><div><a href={socialLinks.linkedin.url} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a><a href={socialLinks.github.url} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></div></div></footer>

      <AnimatePresence>
        {scrolled && (
          <motion.button
            className="back-to-top press"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
          >
            <span className="btt-orbit" aria-hidden="true" />
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="project-dialog max-h-[88vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <p className="eyebrow text-primary">PROJECT CONCEPT · {selectedProject.number}</p>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.heading} · {selectedProject.year}</DialogDescription>
            </DialogHeader>
            <div className={cn("dialog-art", selectedProject.palette)}>
              {selectedProject.id === "orbit" ? <OrbitArtwork /> : <BeyondArtwork />}
            </div>
            <p className="dialog-lede">{selectedProject.detail}</p>
            <div className="flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="dialog-meta single"><div><span>CONTRIBUTIONS</span>{selectedProject.contributions.map((item) => <p key={item}>{item}</p>)}</div></div>
            <p className="text-xs text-muted-foreground">Concept case study — no public live URL for this project yet.</p>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}

/* ---------- Ticker with scroll-velocity response ---------- */
function Ticker({ reduced }: { reduced: boolean }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 300 });
  const x = useMotionValue(0);
  const base = useRef(0);
  useAnimationFrame((_, delta) => {
    if (reduced) return;
    const boost = Math.min(4, Math.abs(smooth.get()) / 900);
    base.current -= (delta / 1000) * (60 + boost * 220);
    if (base.current < -1600) base.current += 1600;
    x.set(base.current);
  });
  return (
    <div className="ticker" aria-label="Creative development services">
      <motion.div style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i}>CREATIVE CODE <b>◆</b> FULL-STACK DEVELOPER <b>•</b> WEB DESIGNER <b>◆</b> 3D WEB EXPERIENCES <b>•</b> ANIMATION SPECIALIST <b>◆</b> MOTION UI <b>•</b></span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- About with line reveal + pointer-reactive orbit ---------- */
function AboutSection({ reduced, touch }: { reduced: boolean; touch: boolean }) {
  const lines = ["I turn ideas into", "high-performance", "digital experiences."];
  const orbitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (touch || reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = orbitRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      el.style.transform = `rotateX(${-dy * 16}deg) rotateY(${dx * 20}deg)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [touch, reduced]);

  return (
    <section id="about" className="section-shell grid-section relative">
      <SectionIndex number="01" label="About" />
      <div className="about-copy">
        <p className="display-copy">
          {lines.map((line, i) => (
            <span className="reveal-line" key={line}>
              <motion.span
                initial={reduced ? { opacity: 0 } : { y: "110%" }}
                whileInView={reduced ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.75, delay: i * 0.11, ease: [0.2, 0.85, 0.2, 1] }}
              >
                {i === 0 ? line : <em>{line}</em>}
              </motion.span>
            </span>
          ))}
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <p className="body-copy">I create modern websites, interactive interfaces and immersive 3D web experiences with a focus on performance, usability and visual precision.</p>
          <p className="body-copy location-copy"><span>+</span> Punjab, Pakistan · Working globally</p>
        </div>
        <motion.span
          className="signal-draw"
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.2, 0.85, 0.2, 1] }}
        />
      </div>
      <div className="about-orbit" aria-hidden="true">
        <div className="about-orbit-inner" ref={orbitRef}>
          <i className="ao-ring" /><i className="ao-ring two" /><i className="ao-ring three" />
          <b className="ao-node" /><b className="ao-node two" />
          <span className="ao-diamond">◆</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects: layered sticky stage sequence ---------- */
function ProjectsSection({
  onOpen,
  touch,
  reduced,
}: {
  onOpen: (p: Project) => void;
  touch: boolean;
  reduced: boolean;
}) {
  return (
    <section id="projects" className="projects-section border-t border-border">
      <div className="section-shell pb-0">
        <SectionIndex number="02" label="Selected projects" aside="Two art-directed experiences — scroll through each stage." />
      </div>
      <div className="project-track">
        {projects.map((project, index) => (
          <ProjectStage key={project.id} project={project} index={index} onOpen={onOpen} touch={touch} reduced={reduced} />
        ))}
      </div>
    </section>
  );
}

function ProjectStage({
  project,
  index,
  onOpen,
  touch,
  reduced,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  touch: boolean;
  reduced: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.85, 1], reduced ? [1, 1, 1, 1] : [0.86, 1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], reduced ? [1, 1, 1, 1] : [0.2, 1, 1, 0.35]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (touch || reduced) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    pointerRef.current = { x: x * 2, y: y * 2 };
    el.style.setProperty("--tilt-x", `${-y * 6}deg`);
    el.style.setProperty("--tilt-y", `${x * 8}deg`);
    el.style.setProperty("--sweep-x", `${(x + 0.5) * 100}%`);
  };

  const reset = () => {
    setHover(false);
    pointerRef.current = { x: 0, y: 0 };
    const el = stageRef.current;
    if (el) {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    }
  };

  return (
    <div className="project-wrap" ref={wrapRef}>
      <motion.article className="project-sticky" style={{ scale, opacity }}>
        <div
          ref={stageRef}
          className={cn("project-stage", project.palette, hover && "is-hover")}
          onPointerMove={onPointerMove}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={reset}
        >
          <button
            className="project-hit"
            onClick={() => onOpen(project)}
            aria-label={`${project.cta} — ${project.heading}`}
          >
            <span className="sr-only">{project.cta}</span>
          </button>
          <div className="project-grid-lines" aria-hidden="true" />
          <span className="stage-sweep" aria-hidden="true" />
          <div className="stage-art">
            {project.id === "orbit" ? (
              <LivingOrbit pointerRef={pointerRef} />
            ) : (
              <>
                <BeyondCanvas pointerRef={pointerRef} />
                <BeyondArtwork />
              </>
            )}
          </div>
          <span className="stage-number">{project.number}</span>
          <span className="stage-crosshair one" aria-hidden="true" />
          <span className="stage-crosshair two" aria-hidden="true" />
          <motion.span
            className="stage-float-label"
            initial={false}
            animate={hover && !touch ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            aria-hidden="true"
          >
            {project.cta} ↗
          </motion.span>
          <div className="stage-panel">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{project.type}</span>
              <span className="text-xs font-bold">{project.year}</span>
            </div>
            <h3>{project.title}</h3>
            <p className="stage-heading">{project.heading}</p>
            <p className="stage-summary">{project.summary}</p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-6">
              <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <button className="view-project press" onClick={() => onOpen(project)}>
                {project.cta} <ArrowRight />
              </button>
            </div>
          </div>
          {index === 0 && <span className="stage-diamond" aria-hidden="true">◆</span>}
        </div>
      </motion.article>
    </div>
  );
}

/* Living orbit visualization (CSS/RAF driven, pointer parallax) */
function LivingOrbit({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<HTMLDivElement>(null);
  useAnimationFrame((t) => {
    const el = ref.current;
    if (!el) return;
    const p = pointerRef.current ?? { x: 0, y: 0 };
    el.style.transform = `translate3d(${p.x * 18}px, ${p.y * 14}px, 0) rotate(${(t / 90) % 360}deg)`;
  });
  return (
    <div className="living-orbit" aria-hidden="true">
      <div className="lo-spin" ref={ref}>
        <i className="lo-ring r1" /><i className="lo-ring r2" /><i className="lo-ring r3" />
        <b className="lo-node n1" /><b className="lo-node n2" /><b className="lo-node n3" /><b className="lo-node n4" />
      </div>
      <div className="orb-core"><span>O</span></div>
    </div>
  );
}

/* ---------- Availability ---------- */
function AvailabilityBand({ onCta, reduced }: { onCta: () => void; reduced: boolean }) {
  return (
    <section className="availability-band">
      <motion.span
        className="availability-orbit"
        aria-hidden="true"
        initial={{ scale: 0.75, opacity: 0 }}
        whileInView={reduced ? { scale: 1, opacity: 0.5 } : { scale: [0.85, 1.05, 1], opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10 lg:px-16">
        <div>
          <p className="eyebrow text-primary-foreground"><i className="status-dot available" /> AVAILABLE FOR SELECTED PROJECTS</p>
          <h2>Open to meaningful collaborations</h2>
        </div>
        <Button size="lg" variant="secondary" onClick={onCta} className="press cta-arrow h-14 px-7">START A CONVERSATION <span>↗</span></Button>
      </div>
    </section>
  );
}

/* ---------- Contact closing scene ---------- */
const stickers = [
  { key: "instagram", cls: "st1" },
  { key: "github", cls: "st2" },
  { key: "linkedin", cls: "st3" },
  { key: "email", cls: "st4" },
] as const;

function ContactScene(props: {
  reduced: boolean;
  touch: boolean;
  copied: boolean;
  onCopy: () => void;
  errors: Errors;
  projectType: string;
  setProjectType: (v: string) => void;
  submitState: "idle" | "loading" | "success";
  setSubmitState: (v: "idle" | "loading" | "success") => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  const { reduced, touch, copied, onCopy, errors, projectType, setProjectType, submitState, setSubmitState, onSubmit } = props;
  return (
    <section id="contact" className="contact-scene">
      <div className="section-shell">
        <SectionIndex number="06" label="Contact" aside="Let’s make something that moves." />
        <motion.h2
          className="contact-mega mt-10"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.85, 0.2, 1] }}
        >
          HAVE AN IDEA <em>WORTH BUILDING?</em>
        </motion.h2>

        <div className="contact-stage mt-14">
          <div className="email-block">
            <p className="copy-label">{copied ? "COPIED ✓" : "CLICK TO COPY EMAIL"}</p>
            <button className="mega-email press" onClick={onCopy} aria-label={`Copy email address ${EMAIL}`}>
              {EMAIL}
              <span className="copy-icon">{copied ? <Check /> : <Copy />}</span>
            </button>
          </div>

          <div className="sticker-field">
            {stickers.map(({ key, cls }) => {
              const link = socialLinks[key];
              return (
                <Sticker key={key} className={cls} href={link.url} label={link.label} handle={link.handle} placeholder={link.placeholder} touch={touch} reduced={reduced} />
              );
            })}
            <span className="sticker-marker m1" aria-hidden="true" />
            <span className="sticker-marker m2" aria-hidden="true" />
          </div>
        </div>

        <div className="contact-form-wrap mt-20">
          <div className="contact-form-intro">
            <p className="eyebrow"><span>◆</span> OR SEND A BRIEF</p>
            <p className="body-copy mt-4">Tell me about the idea and I’ll reply from {EMAIL} within two working days.</p>
          </div>
          <form className="contact-form" onSubmit={onSubmit} noValidate>
            {submitState === "success" ? (
              <div className="success-state"><span><Check /></span><h3>Message received.</h3><p>Thanks for the thoughtful note. I’ll get back to you within two working days.</p><Button type="button" variant="outline" className="press" onClick={() => setSubmitState("idle")}>Send another note</Button></div>
            ) : (
              <>
                <Field label="Name" error={errors.name}><Input name="name" placeholder="Your name" maxLength={100} aria-invalid={Boolean(errors.name)} /></Field>
                <Field label="Email" error={errors.email}><Input name="email" type="email" placeholder="you@example.com" maxLength={255} aria-invalid={Boolean(errors.email)} /></Field>
                <Field label="Project Type" error={errors.project}><Select value={projectType} onValueChange={setProjectType}><SelectTrigger aria-invalid={Boolean(errors.project)}><SelectValue placeholder="Choose one" /></SelectTrigger><SelectContent><SelectItem value="website">Creative website</SelectItem><SelectItem value="product">Digital product</SelectItem><SelectItem value="3d">3D experience</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent></Select></Field>
                <Field label="Message" error={errors.message}><Textarea name="message" placeholder="Tell me about the idea..." maxLength={1200} rows={5} aria-invalid={Boolean(errors.message)} /></Field>
                <Button type="submit" size="lg" className="press h-14 w-full sm:w-auto" disabled={submitState === "loading"}>{submitState === "loading" ? "SENDING…" : "SEND INQUIRY"}<Send /></Button>
                <p className="text-xs text-muted-foreground">This form validates locally in your browser. It does not send or store your details remotely yet.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Sticker({
  className,
  href,
  label,
  handle,
  placeholder,
  touch,
  reduced,
}: {
  className: string;
  href: string;
  label: string;
  handle: string;
  placeholder: boolean;
  touch: boolean;
  reduced: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (touch || reduced) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const pull = dist < 220 ? (1 - dist / 220) * 16 : 0;
      el.style.setProperty("--mx", `${(dx / (dist || 1)) * pull}px`);
      el.style.setProperty("--my", `${(dy / (dist || 1)) * pull}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [touch, reduced]);

  return (
    <a
      ref={ref}
      className={cn("sticker press", className, placeholder && "is-placeholder")}
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
    >
      <b>{label}</b>
      <small>{placeholder ? "Placeholder link" : handle}</small>
      <ArrowUpRight />
    </a>
  );
}

function SectionIndex({ number, label, aside }: { number: string; label: string; aside?: string }) {
  return <div className="section-index"><p><span>{number}</span> {label}</p>{aside && <p>{aside}</p>}<span className="section-line" /></div>;
}

function Field({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}{error && <small>{error}</small>}</label>;
}

function OrbitArtwork() {
  return <div className="orbit-art" aria-hidden="true"><div className="orb-core"><span>O</span></div><i className="ring r1" /><i className="ring r2" /><i className="ring r3" /><b className="node n1" /><b className="node n2" /><b className="node n3" /></div>;
}

function BeyondArtwork() {
  return <div className="beyond-art" aria-hidden="true"><b className="tech-mark s1">◆</b><b className="tech-mark s2">+</b><b className="tech-mark s3">&lt;&gt;</b></div>;
}
