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
  Moon,
  Send,
  Sun,
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
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import profileAvatar from "@/assets/samar-profile-avatar-hero.webp";
import samarLogo from "@/assets/samar-dev-logo.png?inline";
import cursorArrow from "@/assets/cursor-arrow.svg";
import cursorPointer from "@/assets/cursor-pointer.svg";
import { HeroCanvas } from "@/components/three/Lazy3D";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
      { property: "og:url", content: "https://samar-dev.vercel.app/" },
      { property: "og:image", content: "https://samar-dev.vercel.app/og-image.png" },
      { property: "og:image:alt", content: "Samar Dev — Creative developer portfolio" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Samar Dev — Creative Developer" },
      { name: "twitter:description", content: "Design-led websites, interactive interfaces and immersive web experiences." },
      { name: "twitter:image", content: "https://samar-dev.vercel.app/og-image.png" },
      { name: "author", content: "Samar Dev" },
      { name: "theme-color", content: "#f5f1e9" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon-apple.png" },
      { rel: "canonical", href: "https://samar-dev.vercel.app/" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Skills", "Projects", "Services", "Process", "Contact"];
const roles = ["CREATIVE WEB DEVELOPER", "INTERACTIVE EXPERIENCE DESIGNER", "MOTION-FIRST FRONTEND BUILDER"];

const socialLinks = {
  instagram: { url: "https://instagram.com/samar._.x7", label: "Instagram", handle: "@samar._.x7", placeholder: false },
  github: { url: "https://github.com/samarfarooqdev-code", label: "GitHub", handle: "samarfarooqdev-code", placeholder: false },
  linkedin: { url: "https://www.linkedin.com/in/samar-dev-5a4652438/", label: "LinkedIn", handle: "samar-dev-5a4652438", placeholder: false },
  email: { url: "mailto:samarfarooqdev@gmail.com", label: "Email", handle: "samarfarooqdev@gmail.com", placeholder: false },
};

const EMAIL = "samarfarooqdev@gmail.com";

type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  liveUrl: string;
  image?: string;
  features: string[];
  challenge: string;
  solution: string;
  outcome: string;
  role: string;
  visualTheme: "restaurant" | "fashion" | "heritage";
};

const projects: Project[] = [
  {
    id: "adnan-pizza-burger-point",
    number: "01",
    title: "Adnan Pizza Burger Point — Restaurant Ordering Experience",
    category: "RESTAURANT WEBSITE · ORDERING EXPERIENCE",
    description:
      "A warm, conversion-focused restaurant website for a Chiniot fast-food point, combining menu discovery, ordering, table reservations, gallery storytelling and direct contact actions in a rich late-night dining visual system.",
    tags: ["Restaurant Website", "Ordering Flow", "Responsive UI", "Menu Experience"],
    liveUrl: "https://www.adnanpizzaburgerpoint.online/",
    features: [
      "Menu browsing for pizzas, burgers, shawarma, rolls, drinks and sides.",
      "Online ordering and cart experience.",
      "Table reservations.",
      "Gallery section.",
      "Direct contact and WhatsApp actions.",
      "Location and opening-hours information.",
      "Dine-in, takeaway and delivery messaging.",
    ],
    challenge: "Make a local restaurant easy to discover, trust and order from on mobile.",
    solution: "Built a warm, conversion-focused experience around menu discovery, ordering and direct contact actions.",
    outcome: "A clear path from craving to order, with the important information visible at every step.",
    role: "Strategy · UI design · Frontend development",
    visualTheme: "restaurant",
  },
  {
    id: "dastan-e-nysa",
    number: "02",
    title: "Dastan-e-Nysa — Story-led Fashion Commerce",
    category: "ECOMMERCE · STORY-LED FASHION EXPERIENCE",
    description:
      "A story-led ecommerce experience for women’s ethnic wear, combining editorial brand storytelling, collection discovery, product detail, size guidance, cart flow and WhatsApp-assisted shopping.",
    tags: ["Ecommerce", "Fashion Brand", "Product UX", "WhatsApp Commerce"],
    liveUrl: "https://dastan-story-shop.vercel.app/",
    features: [
      "Shop, Collections, About, Size Guide and Contact navigation.",
      "Product and collection browsing.",
      "Product detail pages with PKR pricing.",
      "Cart flow, account and search controls.",
      "WhatsApp support and Instagram touchpoint.",
      "Shipping, returns, payment, privacy and terms pages.",
    ],
    challenge: "Create a fashion store that feels editorial and personal instead of like a generic catalogue.",
    solution: "Combined story-led brand sections with collections, product detail, size guidance and WhatsApp-assisted shopping.",
    outcome: "A premium browsing journey that connects the brand story with practical purchase decisions.",
    role: "Brand experience · UI design · Frontend development",
    visualTheme: "fashion",
  },
  {
    id: "farooq-saharan",
    number: "03",
    title: "Farooq Saharan — Heritage Craft Portfolio",
    category: "EDITORIAL PORTFOLIO · HERITAGE CRAFT",
    description:
      "An editorial heritage portfolio for a third-generation Chiniot master wood artisan, translating decades of royal interiors, architectural woodwork and handcrafted legacy into a refined digital narrative.",
    tags: ["Editorial Portfolio", "Heritage Craft", "Storytelling", "Responsive Web"],
    liveUrl: "https://farooqsaharan.vercel.app/",
    features: [
      "Legacy, Craft, Assignments, Portfolio, Sketches, Recognition, Curriculum Vitae and Contact.",
      "Decorative doors, windows and joinery.",
      "Spiral and trajectory staircases.",
      "Antique chandeliers and dome finishes.",
      "Architectural woodwork and heritage craftsmanship.",
    ],
    challenge: "Translate four decades of heritage craftsmanship into a digital experience that feels credible and memorable.",
    solution: "Shaped a cinematic editorial narrative around legacy, mastery, prestigious assignments, sketches and recognition.",
    outcome: "A focused digital record that lets the artisan's story and body of work lead the experience.",
    role: "Content structure · Art direction · Frontend development",
    visualTheme: "heritage",
  },
];

const services = [
  ["01", "Creative development", "Expressive, high-performance websites where visual direction meets clean engineering."],
  ["02", "Digital product design", "Clear, useful interfaces shaped from the first idea through every considered interaction."],
  ["03", "3D & immersive web", "Spatial stories and WebGL moments that feel atmospheric, fast and purposeful."],
  ["04", "Motion & prototyping", "Interaction studies that make an idea tangible before it becomes production code."],
];

const serviceDetails = [
  "From structure to final polish: a distinctive digital home for a brand, person or business.",
  "Useful flows, expressive interfaces and systems that make complex digital products feel simple.",
  "Immersive layers, 3D moments and spatial storytelling that stay purposeful and performant.",
  "A faster way to test the feeling before committing to the full build.",
];

const process = [
  ["Discover", "Finding the sharpest version of the idea and the people it is for."],
  ["Design", "Giving the experience a clear visual language and a confident rhythm."],
  ["Build", "Turning the direction into responsive, maintainable and expressive code."],
  ["Refine", "Polishing the details, testing the edges and making the work feel inevitable."],
];

const contactTypes = [
  ["website", "Creative website", "Brand, portfolio or business"],
  ["ecommerce", "Ecommerce", "A store with a point of view"],
  ["product", "Digital product", "A useful interface or system"],
  ["3d", "3D / interactive", "A more immersive direction"],
];

const skillStages = [
  { label: "Think", kicker: "01", description: "Every strong experience starts with a clear question: who is this for, and what should they feel next?", proof: "Strategy · UX direction", tools: [["Discovery", "◎", "Direction", ""], ["UX thinking", "↗", "Structure", ""]] },
  { label: "Design", kicker: "02", description: "I shape that direction into a visual language with rhythm, hierarchy and the small details people remember.", proof: "Figma · Motion · Visual systems", tools: [["Figma", "F", "UI / UX", "https://cdn.simpleicons.org/figma"], ["Framer Motion", "M", "Interaction", "https://cdn.simpleicons.org/framer"], ["Canva", "C", "Visuals", "/tool-logos/canva.svg"]] },
  { label: "Build", kicker: "03", description: "Then I turn the system into responsive, maintainable interfaces that feel as good to use as they look.", proof: "React · Next.js · TypeScript", tools: [["React", "R", "Interfaces", "https://cdn.simpleicons.org/react"], ["Next.js", "N", "Web apps", "https://cdn.simpleicons.org/nextdotjs"], ["TypeScript", "TS", "Systems", "https://cdn.simpleicons.org/typescript"], ["Tailwind CSS", "TW", "UI systems", "https://cdn.simpleicons.org/tailwindcss"]] },
  { label: "Ship", kicker: "04", description: "Finally, I refine, test and take the work from a local idea to a reliable experience people can actually use.", proof: "Git · GitHub · Vercel", tools: [["Git", "git", "Versioning", "https://cdn.simpleicons.org/git"], ["GitHub", "GH", "Collaboration", "https://cdn.simpleicons.org/github"], ["Vercel", "▲", "Deployment", "https://cdn.simpleicons.org/vercel"], ["VS Code", "<> ", "Workflow", "/tool-logos/visual-studio-code.svg"]] },
];

type Errors = Partial<Record<"name" | "email" | "project" | "message", string>>;
type Theme = "light" | "dark";

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
  const [showIntro, setShowIntro] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectType, setProjectType] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const processRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [processProgress, setProcessProgress] = useState(0);
  const formStartedAt = useRef(Date.now());
  const lastSubmitAt = useRef(0);

  useEffect(() => {
    const saved = window.localStorage.getItem("samar-theme");
    const nextTheme: Theme = saved === "dark" || saved === "light"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("samar-theme", theme);
  }, [theme]);

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
    const introSeen = window.sessionStorage.getItem("samar-dev-intro-seen");
    if (introSeen || reduced) {
      setShowIntro(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem("samar-dev-intro-seen", "1");
      setShowIntro(false);
      document.body.style.overflow = "";
    }, 1450);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduced]);

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
    const honeypot = String(data.get("website") ?? "").trim();
    if (honeypot) return;
    const nextErrors: Errors = {};
    if (Date.now() - formStartedAt.current < 1800) nextErrors.message = "Please take a moment to review the brief before sending.";
    if (Date.now() - lastSubmitAt.current < 30000) nextErrors.message = "Please wait a moment before sending another brief.";
    if (name.length < 2) nextErrors.name = "Please share your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!projectType) nextErrors.project = "Choose a project type.";
    if (message.length < 20) nextErrors.message = "Tell me a little more (at least 20 characters).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    lastSubmitAt.current = Date.now();
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
    <main
      id="main-content"
      className="custom-cursor overflow-clip bg-background text-foreground"
      style={{
        "--cursor-default": `url(${cursorArrow}) 3 3, auto`,
        "--cursor-pointer": `url(${cursorPointer}) 3 3, pointer`,
      } as CSSProperties}
    >
      <a className="skip-link" href="#about">Skip to main content</a>
      <AnimatePresence>{showIntro && <LoadingIntro reduced={reduced} />}</AnimatePresence>
      <motion.header
        className={cn("site-header", scrolled && "is-scrolled")}
        {...enter(0.75)}
      >
        <div className="nav-pill mx-auto grid max-w-4xl grid-cols-[minmax(0,1fr)_auto] items-center px-3 py-2 sm:flex sm:justify-between">
          <button className="brand-mark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Samar Dev — Back to top">
            <img src={samarLogo} alt="Samar Dev" className="brand-logo" />
          </button>
          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className={cn("nav-link", activeSection === item && "is-active")} aria-current={activeSection === item ? "location" : undefined}>
                {item}
              </button>
            ))}
          </nav>
          <Button size="icon" variant="ghost" className="press sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <span className="hidden items-center gap-2 text-[11px] font-bold uppercase sm:flex"><i className="status-dot" /> Available</span>
          <button type="button" className="theme-toggle press" onClick={() => setTheme((value) => value === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} aria-pressed={theme === "dark"}>
            <span className="theme-toggle-track"><motion.span className="theme-toggle-thumb" layout transition={{ type: "spring", stiffness: 500, damping: 30 }}>{theme === "light" ? <Sun /> : <Moon />}</motion.span></span>
            <span className="theme-toggle-label">{theme === "light" ? "Light" : "Dark"}</span>
          </button>
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
              {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)} aria-current={activeSection === item ? "location" : undefined}>{item}<ChevronRight className="arrow-icon" /></button>)}
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
        <motion.div className="hero-editorial-meta hero-meta-top" {...enter(0.35)}><span>CREATIVE SYSTEM / 001</span><i /></motion.div>
        <motion.div className="hero-editorial-meta hero-meta-side" {...enter(0.45)}><span>31.5204° N<br />74.3587° E</span><b>BUILDING FROM PAKISTAN</b></motion.div>
        <div className="hero-grid relative z-10 mx-auto w-full max-w-[1500px]">
          <motion.div className="hero-copy self-center pb-4 lg:pb-14" style={{ y: heroCopyY }}>
            <motion.p className="eyebrow mb-5" {...enter(0.55)}><span>◆</span> SAMAR DEV · CREATIVE DEVELOPER</motion.p>
            <motion.h1 className="hero-title hero-statement" {...enter(0.6)}>I build digital<br /><em>experiences with<br />a point of view.</em></motion.h1>
            <motion.p className="signature-line" {...enter(0.66)}>Design with intent. Build with character.</motion.p>
            <motion.div className="role-line mt-5" {...enter(0.7)}><strong key={roleIndex}>{roles[roleIndex]}</strong></motion.div>
            <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg" {...enter(0.74)}>I combine thoughtful design, clean frontend engineering and meaningful motion to turn ideas into live experiences people remember.</motion.p>
            <motion.div className="hero-actions" {...enter(0.78)}><motion.div whileHover={{ y: -4 }} whileTap={{ scale: .97 }}><Button size="lg" className="press cta-arrow hero-cta hero-cta-primary" onClick={() => scrollTo("Projects")}>VIEW SELECTED WORK <ArrowUpRight className="arrow-icon" /></Button></motion.div><motion.div whileHover={{ y: -4 }} whileTap={{ scale: .97 }}><Button size="lg" variant="outline" className="press cta-arrow hero-cta hero-cta-secondary" onClick={() => scrollTo("Contact")}>START A PROJECT <ArrowUpRight className="arrow-icon" /></Button></motion.div></motion.div>
            <motion.div className="hero-stats mt-8" {...enter(0.82)}><div><b>03</b><span>Live experiences</span></div><div><b>04</b><span>Creative disciplines</span></div><div><b>01</b><span>Connected workflow</span></div></motion.div>
            <motion.div className="hero-project-signal" {...enter(0.88)}><span>SELECTED WORK / 02</span><strong>Dastan-e-Nysa</strong><small>Story-led fashion commerce</small><button onClick={() => setSelectedProject(projects[1]!)}>VIEW CASE STUDY <ArrowUpRight className="arrow-icon" /></button></motion.div>
          </motion.div>
          <motion.div
            className="avatar-stage relative flex min-h-[390px] items-end justify-center sm:min-h-[520px] lg:min-h-[650px]"
            style={{ y: avatarY, scale: avatarScale }}
            {...enter(0.4)}
          >
            <span className="avatar-label avatar-label-left">BASED IN<br /><b>THE INTERNET</b></span>
            <div className="avatar-frame">
              <img
                src={profileAvatar}
                alt="Illustrated portrait of Samar Dev"
                className="avatar-image"
                width={1000}
                height={1000}
                loading="eager"
                decoding="async"
              />
            </div>
            <span className="avatar-label avatar-label-right">OPEN TO<br /><b>SELECT PROJECTS</b></span>
            <div className="signal-card"><i className="status-dot" /><span>ONLINE</span><b>12:48 UTC</b></div>
          </motion.div>
          <motion.button className="scroll-cue press" onClick={() => scrollTo("About")} {...enter(0.9)}><span>SCROLL TO EXPLORE</span><ArrowDown className="arrow-icon" /></motion.button>
        </div>
      </section>

      <Ticker reduced={reduced} />

      <FeaturedWorkStrip reduced={reduced} onOpen={setSelectedProject} />

      <AboutSection reduced={reduced} touch={touch} />

      <SkillsSection reduced={reduced} />

      <ProjectsSection onOpen={setSelectedProject} touch={touch} reduced={reduced} />

      <ServicesSection reduced={reduced} />

      <ExperienceSection reduced={reduced} />

      <section id="process" ref={processRef} className="section-shell border-t border-border">
        <SectionIndex number="06" label="Process" aside="Clear stages. Close collaboration. No black boxes." />
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

      <footer><div className="section-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"><a className="footer-brand" href="#top" aria-label="Samar Dev — Back to top"><img src={samarLogo} alt="Samar Dev" className="footer-logo" loading="lazy" decoding="async" /></a><p>© 2026 Samar Dev. Built with curiosity.</p><div><a href={socialLinks.linkedin.url} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight className="arrow-icon" /></a><a href={socialLinks.github.url} target="_blank" rel="noreferrer">GitHub <ArrowUpRight className="arrow-icon" /></a></div></div></footer>

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
            <ArrowUp className="arrow-icon" />
          </motion.button>
        )}
      </AnimatePresence>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="project-dialog max-h-[88vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <p className="eyebrow text-primary">FEATURED PROJECT · {selectedProject.number}</p>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.category}</DialogDescription>
            </DialogHeader>
            <div className={cn("dialog-art", `project-${selectedProject.visualTheme}`)}>
              <ProjectArtwork project={selectedProject} compact />
            </div>
            <p className="dialog-lede">{selectedProject.description}</p>
            <div className="flex flex-wrap gap-2">{selectedProject.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            <div className="case-study-grid">
              <div><span>THE CHALLENGE</span><p>{selectedProject.challenge}</p></div>
              <div><span>THE APPROACH</span><p>{selectedProject.solution}</p></div>
              <div><span>THE OUTCOME</span><p>{selectedProject.outcome}</p></div>
              <div><span>MY ROLE</span><p>{selectedProject.role}</p></div>
            </div>
            <div className="dialog-meta single"><div><span>VERIFIED FEATURES</span>{selectedProject.features.map((item) => <p key={item}>◆ {item}</p>)}</div></div>
            <Button asChild size="lg" className="press cta-arrow w-fit">
              <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer">Visit live site <ArrowUpRight className="arrow-icon" /></a>
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}

function LoadingIntro({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="loading-intro"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: reduced ? .2 : .55, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Loading Samar Dev portfolio"
    >
      <div className="loading-intro-grid" aria-hidden="true" />
      <motion.div className="loading-intro-center" initial={reduced ? { opacity: 0 } : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduced ? .2 : .5, ease: [0.2, .8, .2, 1] }}>
        <motion.span className="loading-orb" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: .3, delay: reduced ? 0 : .08 }} />
        <motion.p className="loading-code-mark" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: reduced ? 0 : .18 }}>&lt; Samar Dev /&gt;</motion.p>
        <motion.img src={samarLogo} alt="Samar Dev" className="loading-logo" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduced ? 0 : .28 }} />
        <motion.p className="loading-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35, delay: reduced ? 0 : .48 }}>CREATIVE DEVELOPER</motion.p>
        <div className="loading-route" aria-hidden="true"><span>DESIGN</span><i /><span>BUILD</span><i /><span>SHIP</span></div>
      </motion.div>
      <span className="loading-status">INITIALIZING EXPERIENCE <b>●</b></span>
      <span className="loading-index">S / 001</span>
    </motion.div>
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
        <div className="about-metrics">
          <div><strong>01</strong><span>Clear by design</span><small>Every detail earns its place.</small></div>
          <div><strong>02</strong><span>Built to move</span><small>Motion with meaning, not noise.</small></div>
          <div><strong>03</strong><span>Ready to ship</span><small>Responsive, refined and live.</small></div>
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
          <div className="about-orbit-caption"><span>01 / POV</span><strong>MAKE IT<br /><em>MEMORABLE.</em></strong></div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills: tool stack with orbiting reveal cards ---------- */
function SkillsSection({ reduced }: { reduced: boolean }) {
  const [activeStage, setActiveStage] = useState(2);
  const stage = skillStages[activeStage]!;

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => setActiveStage((value) => (value + 1) % skillStages.length), 5600);
    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <section id="skills" className="skills-section section-shell border-t border-border">
      <SectionIndex number="02" label="How I bring ideas to life" aside="A focused creative-development workflow, from first direction to final deployment." />
      <div className="skills-intro mt-12 sm:mt-16">
        <motion.div
          className="skills-lede"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="eyebrow"><span>◆</span> THE WORKFLOW</p>
          <h2>Designing the feeling.<br /><em>Building the system.</em></h2>
        </motion.div>
        <motion.p
          className="skills-note"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] }}
        >
          I don’t collect tools for the sake of it. I choose the right tools for the right experience, then carry the work from a sharp idea to a polished, production-ready website.
        </motion.p>
      </div>
      <div className="skill-flow" role="tablist" aria-label="Creative development workflow">
        {skillStages.map((item, index) => (
          <div className={cn("skill-flow-step", activeStage >= index && "is-passed", activeStage === index && "is-active")} key={item.label}>
            <button role="tab" aria-selected={activeStage === index} onClick={() => setActiveStage(index)}>
              <span>{item.kicker}</span><strong>{item.label}</strong>
            </button>
            {index < skillStages.length - 1 && <i aria-hidden="true" />}
          </div>
        ))}
      </div>
      <div className="skill-stage-layout">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="skill-stage-copy"
            key={stage.label}
            initial={reduced ? { opacity: 0 } : { opacity: 0, x: -16, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, x: 16, filter: "blur(5px)" }}
            transition={{ duration: reduced ? .18 : .72, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="skill-stage-kicker">{stage.kicker} / {stage.label.toUpperCase()}</span>
            <h3>{stage.description}</h3>
            <p className="skill-stage-proof">{stage.proof}</p>
            {!reduced && <span className="skill-stage-timer" aria-hidden="true"><i /></span>}
            <div className="skill-tool-list">
              {stage.tools.map(([name, mark, detail, logo], index) => (
                <motion.div className="skill-tool" key={name} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .42, delay: reduced ? 0 : .18 + index * .11 }} whileHover={reduced ? undefined : { y: -4 }} data-tool={name}>
                  {logo ? <img className="skill-logo" src={logo} alt="" loading="lazy" /> : <span className="skill-mark" aria-hidden="true">{mark}</span>}<span><b>{name}</b><small>{detail}</small></span><i aria-hidden="true">↗</i>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        <SkillPipeline reduced={reduced} activeStage={activeStage} />
      </div>
      <motion.div
        className="skills-proof"
        initial={reduced ? { opacity: 0 } : { opacity: 0, scaleX: .85 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: .8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="status-dot available" />
        <strong>Design · Build · Ship</strong>
        <span>Responsive by default · Accessible interactions · Optimized assets · Production-ready deployment</span>
      </motion.div>
    </section>
  );
}

function SkillPipeline({ reduced, activeStage }: { reduced: boolean; activeStage: number }) {
  return (
    <motion.div className="skill-pipeline" initial={reduced ? { opacity: 0 } : { opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .7 }}>
      <div className="pipeline-orbit" aria-hidden="true"><i /><i /><b>◆</b></div>
      <div className={cn("pipeline-node pipeline-code", activeStage >= 2 && "is-lit")}><span>〈/〉</span><small>CODE</small></div>
      <div className={cn("pipeline-node pipeline-design", activeStage >= 1 && "is-lit")}><span>✦</span><small>DESIGN</small></div>
      <div className={cn("pipeline-node pipeline-live", activeStage >= 3 && "is-lit")}><span>↗</span><small>LIVE</small></div>
      <div className="pipeline-line" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(.2, activeStage / 3)})` }} /></div>
      <p>FROM FIRST FRAME<br /><strong>TO LIVE EXPERIENCE</strong></p>
    </motion.div>
  );
}

function ServicesSection({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState(0);
  return (
    <section id="services" className="services-section section-shell border-t border-border">
      <SectionIndex number="04" label="What I can bring" aside="Available independently or as one connected engagement." />
      <div className="services-intro mt-12 sm:mt-16">
        <motion.h2 className="services-title" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }}>One idea.<br /><em>Many ways forward.</em></motion.h2>
        <p>Whether the need is a new digital home, a sharper product flow or a more immersive story, I bring the right mix of thinking, design and build.</p>
      </div>
      <div className="services-list premium-services mt-12 sm:mt-16">
        {services.map(([number, title, description], i) => (
          <motion.button type="button" className={cn("service-row", active === i && "is-active")} key={number} onClick={() => setActive(i)} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .55, delay: i * .08, ease: [0.2, 0.8, 0.2, 1] }}>
            <span>{number}</span><h3>{title}</h3><p>{description}</p><i className="service-node" aria-hidden="true" /><b className="service-diamond" aria-hidden="true">◆</b><em className="service-line" aria-hidden="true" />
            {active === i && <motion.div className="service-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: .35 }}><span>THE VALUE</span><strong>{serviceDetails[i]}</strong></motion.div>}
          </motion.button>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection({ reduced }: { reduced: boolean }) {
  return (
    <section className="experience-band premium-experience">
      <div className="section-shell py-0">
        <SectionIndex number="05" label="Experience" aside="A practice built through curiosity, repetition and shipping." />
        <div className="experience-hero mt-12">
          <div><span className="experience-kicker">THE RECORD SO FAR</span><h2>Learning fast.<br /><em>Shipping with intent.</em></h2></div>
          <p>My experience is measured less by a job title and more by the things I have taken from idea to live: restaurant ordering, fashion commerce, heritage storytelling and interactive portfolios.</p>
        </div>
        <div className="experience-list premium-experience-list mt-14">
          <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}><time>NOW</time><h3>Creative Web Development</h3><p>Building, learning and shipping modern web experiences with a growing focus on motion, clarity and craft.</p><span className="experience-badge">ACTIVE PRACTICE</span></motion.div>
          <motion.div initial={reduced ? { opacity: 0 } : { opacity: 0, x: -22 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .12 }}><time>SELECTED</time><h3>Three Live Digital Experiences</h3><p>Restaurant ordering, story-led fashion commerce and a heritage craft portfolio—each with a different visual language.</p><span className="experience-badge">LIVE WORK</span></motion.div>
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
        <SectionIndex number="03" label="Selected work" aside="Selected digital experiences, presented as case studies." />
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
  const stageRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  const onPointerMove = (e: React.PointerEvent) => {
    if (touch || reduced) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${-y * 6}deg`);
    el.style.setProperty("--tilt-y", `${x * 8}deg`);
    el.style.setProperty("--sweep-x", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--parallax-x", `${x * 14}px`);
    el.style.setProperty("--parallax-y", `${y * 10}px`);
  };

  const reset = () => {
    setHover(false);
    const el = stageRef.current;
    if (el) {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.style.setProperty("--parallax-x", "0px");
      el.style.setProperty("--parallax-y", "0px");
    }
  };

  const artReveal = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : touch
      ? { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, x: index % 2 === 0 ? -54 : 54 }, whileInView: { opacity: 1, x: 0 } };
  const panelReveal = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : touch
      ? { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, x: index % 2 === 0 ? 44 : -44 }, whileInView: { opacity: 1, x: 0 } };

  return (
    <div className="project-wrap">
      <article className="project-sticky">
        <div
          ref={stageRef}
          className={cn("project-stage", `project-${project.visualTheme}`, hover && "is-hover")}
          onPointerMove={onPointerMove}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={reset}
        >
          <button
            className="project-hit"
            onClick={() => onOpen(project)}
            aria-label={`Open details for ${project.title}`}
          >
            <span className="sr-only">Open project details</span>
          </button>
          <div className="project-grid-lines" aria-hidden="true" />
          <span className="stage-sweep" aria-hidden="true" />
          <motion.div className="stage-art" {...artReveal} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? .2 : .78, delay: reduced ? 0 : .06, ease: [0.2, 0.8, 0.2, 1] }}>
            <ProjectArtwork project={project} />
          </motion.div>
          <motion.span className="stage-number" initial={reduced ? { opacity: 0 } : { opacity: 0, scale: .7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .45, delay: .2 }}>{project.number}</motion.span>
          <span className="stage-crosshair one" aria-hidden="true" />
          <span className="stage-crosshair two" aria-hidden="true" />
          <motion.span
            className="stage-float-label"
            initial={false}
            animate={hover && !touch ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.22 }}
            aria-hidden="true"
          >
            VIEW CASE STUDY ↗
          </motion.span>
          <motion.div className="stage-panel" {...panelReveal} viewport={{ once: true, margin: "-15% 0px" }} transition={{ duration: reduced ? .2 : .78, delay: reduced ? 0 : .18, ease: [0.2, 0.8, 0.2, 1] }}>
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">{project.category}</span>
              <span className="preview-label">ART-DIRECTED PROJECT PREVIEW</span>
            </div>
            <h3>{project.title}</h3>
            <p className="stage-summary">{project.description}</p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-6">
              <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
              <div className="project-actions">
                <button className="view-project press" onClick={() => onOpen(project)}>VIEW CASE STUDY <ArrowRight className="arrow-icon" /></button>
                <a className="live-project press" href={project.liveUrl} target="_blank" rel="noreferrer">VISIT LIVE SITE <ArrowUpRight className="arrow-icon" /></a>
              </div>
            </div>
          </motion.div>
          {index === 0 && <span className="stage-diamond" aria-hidden="true">◆</span>}
        </div>
      </article>
    </div>
  );
}

function FeaturedWorkStrip({ reduced, onOpen }: { reduced: boolean; onOpen: (project: Project) => void }) {
  return (
    <section className="featured-strip section-shell" aria-label="Selected work preview">
      <div className="featured-strip-head"><p className="eyebrow"><span>◆</span> SELECTED WORK</p><span>THREE POINTS OF VIEW / 2026</span></div>
      <div className="featured-work-grid">
        {projects.map((project, index) => (
          <motion.button type="button" className={cn("featured-work-card", `featured-${project.visualTheme}`)} key={project.id} onClick={() => onOpen(project)} initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .55, delay: index * .08 }}>
            <span className="featured-number">{project.number}</span><span className="featured-category">{project.category.split(" · ")[0]}</span><strong>{project.title.split(" — ")[0]}</strong><small>{project.tags[0]} · {project.tags[1]}</small><i>VIEW CASE STUDY ↗</i>
          </motion.button>
        ))}
      </div>
    </section>
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
        <Button size="lg" variant="secondary" onClick={onCta} className="press cta-arrow h-14 px-7">START A CONVERSATION <ArrowUpRight className="arrow-icon" /></Button>
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
          HAVE AN IDEA? <em>LET’S GIVE IT A POINT OF VIEW.</em>
        </motion.h2>

        <div className="contact-stage mt-14">
          <div className="email-block">
            <p className="copy-label">{copied ? "EMAIL COPIED ✓" : "START WITH A HELLO"}</p>
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
            <p className="eyebrow"><span>◆</span> PROJECT BRIEF</p>
            <p className="body-copy mt-4">Tell me what you’re building, imagining or untangling. I’ll help shape the next clear step.</p>
            <div className="contact-signal" aria-label="Project signal workflow">
              <span className="contact-signal-label">PROJECT SIGNAL</span>
              <div><b>Idea</b><i /></div><div><b>Direction</b><i /></div><div><b>Experience</b><i /></div><div><b>Live</b></div>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit} noValidate aria-busy={submitState === "loading"}>
            {submitState === "success" ? (
              <div className="success-state" role="status" aria-live="polite"><span><Check /></span><p className="eyebrow"><span>◆</span> BRIEF RECEIVED</p><h3>The next good thing starts here.</h3><p>Thanks for the thoughtful note. I’ll review the idea and get back to you within two working days.</p><Button type="button" variant="outline" className="press" onClick={() => setSubmitState("idle")}>Send another brief</Button></div>
            ) : (
              <>
                <input className="form-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <motion.div className="contact-field-reveal" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduced ? 0 : .05 }}><Field label="Name" error={errors.name} errorId="name-error"><Input name="name" autoComplete="name" placeholder="Your name" maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} /></Field></motion.div>
                <motion.div className="contact-field-reveal" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduced ? 0 : .12 }}><Field label="Email" error={errors.email} errorId="email-error"><Input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={255} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} /></Field></motion.div>
                <motion.div className="contact-field-reveal" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduced ? 0 : .19 }}><Field label="What are we making?" error={errors.project}>
                  <input type="hidden" name="projectType" value={projectType} />
                  <div className="contact-type-grid" role="group" aria-label="Choose a project type">
                    {contactTypes.map(([value, label, detail]) => <button type="button" key={value} className={cn("contact-type", projectType === value && "is-selected")} onClick={() => setProjectType(value)} aria-pressed={projectType === value}><b>{label}</b><small>{detail}</small><span aria-hidden="true">{projectType === value ? "✓" : "↗"}</span></button>)}
                  </div>
                </Field></motion.div>
                <motion.div className="contact-field-reveal" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: reduced ? 0 : .26 }}><Field label="What are you imagining?" error={errors.message} errorId="message-error"><Textarea name="message" placeholder="Tell me about the idea, challenge or feeling you want the experience to create..." maxLength={1200} rows={5} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} /></Field></motion.div>
                <motion.div className="contact-submit-wrap" whileHover={submitState === "loading" ? undefined : { y: -3 }} whileTap={submitState === "loading" ? undefined : { scale: .98 }}><Button type="submit" size="lg" className="press h-14 w-full sm:w-auto contact-submit" disabled={submitState === "loading"}>{submitState === "loading" ? <><span className="submit-spinner" /> PREPARING BRIEF…</> : <>SEND THE BRIEF <Send /></>}</Button></motion.div>
                <p className="text-xs text-muted-foreground">This is a local-first brief form. Your details are not stored remotely yet.</p>
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
      <ArrowUpRight className="arrow-icon" />
    </a>
  );
}

function SectionIndex({ number, label, aside }: { number: string; label: string; aside?: string }) {
  return <div className="section-index"><p><span>{number}</span> {label}</p>{aside && <p>{aside}</p>}<span className="section-line" /></div>;
}

function Field({ label, error, errorId, children }: { label: string; error?: string | undefined; errorId?: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}{error && <small id={errorId} role="alert">{error}</small>}</label>;
}

function ProjectArtwork({ project, compact = false }: { project: Project; compact?: boolean }) {
  if (project.visualTheme === "fashion") return <FashionArtwork compact={compact} />;
  if (project.visualTheme === "heritage") return <HeritageArtwork compact={compact} />;
  return <RestaurantArtwork compact={compact} />;
}

function RestaurantArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("restaurant-art", compact && "is-compact")} aria-hidden="true">
      <div className="restaurant-ambient" />
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="restaurant-browser">
        <div className="restaurant-browser-bar"><i /><i /><i /><span>adnanpizzaburgerpoint.online</span></div>
        <div className="restaurant-home">
          <header><b>ADNAN</b><span>Pizza · Burger · Point</span><nav>MENU&nbsp;&nbsp; RESERVE&nbsp;&nbsp; CONTACT</nav></header>
          <div className="restaurant-hero-copy"><small>CHINIOT · OPEN FOR ORDERS</small><strong>Late-night cravings,<br /><em>served warm.</em></strong><span>ORDER NOW ↗</span></div>
          <div className="restaurant-plate"><i className="pizza-slice" /><i className="pizza-cut one" /><i className="pizza-cut two" /><b className="topping t1" /><b className="topping t2" /><b className="topping t3" /><b className="topping t4" /></div>
        </div>
      </div>
      <div className="restaurant-menu-card"><small>POPULAR MENU</small><b>Chicken Pizza</b><span>Freshly prepared · multiple sizes</span><strong>ADD TO CART&nbsp; +</strong></div>
      <div className="restaurant-cart-card"><small>YOUR ORDER</small><b>2 items</b><span>Takeaway · Chiniot</span><strong>VIEW CART ↗</strong></div>
      <div className="restaurant-hours-card"><small>VISIT US</small><b>Chiniot, Punjab</b><span>Opening hours & location</span></div>
      <span className="restaurant-mark mark-one">◆</span><span className="restaurant-mark mark-two">+</span>
    </div>
  );
}

function FashionArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("fashion-art", compact && "is-compact")} aria-label="Original art-directed preview of the Dastan-e-Nysa fashion commerce experience" role="img">
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="fashion-fabric" />
      <div className="fashion-browser">
        <div className="fashion-browser-bar"><i /><i /><i /><span>dastan-story-shop.vercel.app</span></div>
        <header><b>DASTAN-E-NYSA</b><nav>SHOP&nbsp;&nbsp; COLLECTIONS&nbsp;&nbsp; SIZE GUIDE</nav></header>
        <div className="fashion-editorial"><small>STORIES WOVEN INTO EVERY DETAIL</small><strong>Ethnic wear,<br /><em>told beautifully.</em></strong><span>DISCOVER COLLECTIONS ↗</span></div>
        <div className="fashion-silhouette"><i /><i /><i /></div>
      </div>
      <div className="fashion-product-card one"><small>COLLECTION</small><b>Chikankari Anarkali</b><span>VIEW PRODUCT ↗</span></div>
      <div className="fashion-product-card two"><small>NEW STORY</small><b>Noor e Sehar Crimson Set</b><span>PKR · PRODUCT DETAIL</span></div>
      <div className="fashion-guide-card"><small>SHOP WITH CONFIDENCE</small><b>Size Guide</b><span>WhatsApp assistance available</span></div>
      <span className="fashion-mark">◇</span>
    </div>
  );
}

function HeritageArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("heritage-art", compact && "is-compact")} aria-label="Original art-directed preview of the Farooq Saharan heritage craft portfolio" role="img">
      <span className="art-preview-label">ORIGINAL ART-DIRECTED PREVIEW</span>
      <div className="heritage-carving" aria-hidden="true"><i /><i /><i /></div>
      <div className="heritage-browser">
        <div className="heritage-browser-bar"><i /><i /><i /><span>farooqsaharan.vercel.app</span></div>
        <header><b>FAROOQ SAHARAN</b><nav>LEGACY&nbsp;&nbsp; CRAFT&nbsp;&nbsp; PORTFOLIO</nav></header>
        <div className="heritage-editorial"><small>THIRD-GENERATION MASTER WOOD ARTISAN · CHINIOT</small><strong>A legacy shaped<br /><em>by hand.</em></strong><span>EXPLORE THE CRAFT ↗</span></div>
        <div className="heritage-door"><i /><i /><i /><b>◆</b></div>
      </div>
      <div className="heritage-detail-card"><small>AREAS OF MASTERY</small><b>Architectural Woodwork</b><span>Doors · Joinery · Staircases</span></div>
      <div className="heritage-legacy-card"><small>PORTFOLIO INDEX</small><b>Legacy / Sketches</b><span>Craft · Assignments · Contact</span></div>
      <span className="heritage-mark">+</span>
    </div>
  );
}
