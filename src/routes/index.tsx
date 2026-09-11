import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Asterisk,
  Check,
  ChevronRight,
  ExternalLink,
  Menu,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

import avatarAsset from "@/assets/samar-avatar.png.asset.json";
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
          "Samar Dev is a creative developer crafting expressive digital products, AI experiences, and immersive 3D websites.",
      },
      { property: "og:title", content: "Samar Dev — Creative Developer" },
      {
        property: "og:description",
        content: "Expressive digital products, AI experiences, and immersive 3D websites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = ["About", "Projects", "Services", "Process", "Contact"];
const roles = ["creative developer", "digital storyteller", "interaction designer"];

const projects = [
  {
    id: "orbit",
    number: "01",
    title: "Orbit AI",
    type: "AI PRODUCT EXPERIENCE",
    year: "2026",
    summary:
      "A calm, high-velocity workspace that turns scattered research into clear, actionable intelligence.",
    tags: ["Product design", "React", "AI systems"],
    result: "42% faster time-to-insight",
    palette: "project-orbit",
    detail:
      "Orbit AI reframes a complex research workflow as an approachable visual system. I led the experience from product language and interaction models through a performant front-end system.",
    contributions: ["Experience strategy", "Interaction design", "Front-end architecture", "Motion direction"],
  },
  {
    id: "beyond",
    number: "02",
    title: "Beyond Limits",
    type: "IMMERSIVE 3D EXPERIENCE",
    year: "2025",
    summary:
      "A playful spatial portfolio where visitors navigate ideas through motion, light, and responsive sound.",
    tags: ["Creative direction", "WebGL", "Spatial design"],
    result: "Awwwards Honorable Mention",
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
  ["Listen", "We uncover the real ambition, audience, and tension behind the brief."],
  ["Frame", "We define the idea, experience architecture, and measures of success."],
  ["Make", "Design and code evolve together through quick, tangible prototypes."],
  ["Refine", "We tune motion, performance, accessibility, and every final detail."],
];

type Project = (typeof projects)[number];
type Errors = Partial<Record<"name" | "email" | "project" | "message", string>>;

function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success">("idle");
  const processRef = useRef<HTMLElement>(null);
  const [processProgress, setProcessProgress] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const sectionId = visible.target.id;
          setActiveSection(sectionId.charAt(0).toUpperCase() + sectionId.slice(1));
        }
      },
      { rootMargin: "-35% 0px -55%" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
      event.currentTarget?.reset();
      setProjectType("");
      setBudget("");
    }, 850);
  };

  return (
    <main className="overflow-clip bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 sm:pt-6">
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
          <Button size="icon" variant="ghost" className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
          <span className="hidden items-center gap-2 text-[11px] font-bold uppercase sm:flex"><i className="status-dot" /> Available</span>
        </div>
        {menuOpen && (
          <nav className="nav-mobile mx-auto mt-2 max-w-sm p-3 sm:hidden" aria-label="Mobile navigation">
            {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}<ChevronRight /></button>)}
          </nav>
        )}
      </header>

      <section className="hero relative flex min-h-[760px] items-end px-4 pb-10 pt-28 sm:min-h-[820px] sm:px-8 lg:min-h-screen lg:px-12">
        <div className="peach-glow" />
        <div className="wire-room" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="orbit orbit-one" aria-hidden="true"><i /><b /></div>
        <div className="orbit orbit-two" aria-hidden="true"><i /></div>
        <div className="crosshair crosshair-one" aria-hidden="true" />
        <div className="hero-grid relative z-10 mx-auto w-full max-w-[1500px]">
          <div className="hero-copy self-center pb-4 lg:pb-14">
            <p className="eyebrow mb-5"><span>✦</span> INDEPENDENT CREATIVE STUDIO · 2026</p>
            <h1 className="hero-title">SAMAR<br /><em>DEV</em><span>.</span></h1>
            <div className="role-line mt-5"><span>I shape</span><strong key={roleIndex}>{roles[roleIndex]}</strong></div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">Building expressive digital experiences where clear thinking, playful motion, and thoughtful code converge.</p>
          </div>
          <div className="avatar-stage relative flex min-h-[390px] items-end justify-center sm:min-h-[520px] lg:min-h-[650px]">
            <span className="avatar-label avatar-label-left">BASED IN<br /><b>THE INTERNET</b></span>
            <img src={avatarAsset.url} alt="3D portrait of Samar Dev wearing a bright orange hoodie" className="avatar-image" />
            <span className="avatar-label avatar-label-right">OPEN TO<br /><b>SELECT PROJECTS</b></span>
            <div className="signal-card"><i className="status-dot" /><span>ONLINE</span><b>12:48 UTC</b></div>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo("About")}><span>SCROLL TO EXPLORE</span><ArrowDown /></button>
        </div>
      </section>

      <div className="ticker" aria-label="Creative development services"><div>{Array.from({ length: 6 }).map((_, i) => <span key={i}>CREATIVE DEVELOPMENT <Asterisk /> DIGITAL EXPERIENCES <Asterisk /> MOTION & 3D <Asterisk /></span>)}</div></div>

      <section id="about" className="section-shell grid-section">
        <SectionIndex number="01" label="About" />
        <div className="about-copy">
          <p className="display-copy">I turn ambitious ideas into <em>digital experiences</em> people remember.</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <p className="body-copy">I’m Samar, a creative developer with an eye for systems, stories, and the small moments that make interfaces feel alive.</p>
            <p className="body-copy">My practice moves fluidly between strategy, design, code, and motion—keeping the original idea intact from sketch to screen.</p>
          </div>
          <div className="stats-row mt-16">
            <div><b>06+</b><span>Years shaping pixels</span></div><div><b>28</b><span>Products launched</span></div><div><b>11</b><span>Countries reached</span></div>
          </div>
        </div>
      </section>

      <section id="projects" className="section-shell border-t border-border">
        <SectionIndex number="02" label="Selected projects" aside="A small collection of digital work made with sharp minds and brave teams." />
        <div className="mt-12 space-y-6 sm:mt-16">
          {projects.map((project) => (
            <article key={project.id} className="project-row group">
              <button onClick={() => setSelectedProject(project)} className="project-button text-left" aria-label={`View ${project.title} case study`}>
                <div className={cn("project-visual", project.palette)}>
                  <div className="project-grid-lines" />
                  {project.id === "orbit" ? <OrbitArtwork /> : <BeyondArtwork />}
                  <span className="project-number">{project.number}</span>
                </div>
                <div className="project-info">
                  <div className="flex items-center justify-between gap-4"><span className="eyebrow">{project.type}</span><span className="text-xs font-bold">{project.year}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
                    <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                    <span className="view-project">VIEW CASE <ArrowRight /></span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="section-shell border-t border-border">
        <SectionIndex number="03" label="Services" aside="Available independently or as one connected engagement." />
        <div className="services-list mt-12 sm:mt-16">
          {services.map(([number, title, description]) => (
            <div className="service-row" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p><Sparkles /></div>
          ))}
        </div>
      </section>

      <section className="experience-band">
        <div className="section-shell py-0">
          <SectionIndex number="04" label="Experience" />
          <div className="experience-list mt-12">
            <div><time>2024 — NOW</time><h3>Independent Creative Developer</h3><p>Partnering with studios and product teams worldwide.</p></div>
            <div><time>2021 — 2024</time><h3>Senior Interactive Developer · Northstar</h3><p>Led creative technology across award-winning launches.</p></div>
            <div><time>2019 — 2021</time><h3>Front-end Developer · Form/Function</h3><p>Built digital identities for culture-forward brands.</p></div>
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

      <section className="availability-band">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-12 sm:grid-cols-[1fr_auto] sm:items-center sm:px-10 lg:px-16">
          <div><p className="eyebrow text-primary-foreground"><i className="status-dot light" /> AVAILABLE FOR SELECT COLLABORATIONS</p><h2>Have a bold idea?</h2></div>
          <Button size="lg" variant="secondary" onClick={() => scrollTo("Contact")} className="h-14 px-7">START A CONVERSATION <ArrowRight /></Button>
        </div>
      </section>

      <section id="contact" className="section-shell contact-grid">
        <div>
          <SectionIndex number="06" label="Contact" />
          <h2 className="contact-title mt-12">Let’s make<br /><em>something</em><br />remarkable.</h2>
          <a className="email-link mt-10" href="mailto:hello@samardev.design">hello@samardev.design <ArrowRight /></a>
        </div>
        <form className="contact-form" onSubmit={submitContact} noValidate>
          {submitState === "success" ? (
            <div className="success-state"><span><Check /></span><h3>Message received.</h3><p>Thanks for the thoughtful note. I’ll get back to you within two working days.</p><Button type="button" variant="outline" onClick={() => setSubmitState("idle")}>Send another note</Button></div>
          ) : (
            <>
              <Field label="Your name" error={errors.name}><Input name="name" placeholder="Ada Lovelace" maxLength={100} aria-invalid={Boolean(errors.name)} /></Field>
              <Field label="Email address" error={errors.email}><Input name="email" type="email" placeholder="ada@studio.com" maxLength={255} aria-invalid={Boolean(errors.email)} /></Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Project type" error={errors.project}><Select value={projectType} onValueChange={setProjectType}><SelectTrigger aria-invalid={Boolean(errors.project)}><SelectValue placeholder="Choose one" /></SelectTrigger><SelectContent><SelectItem value="website">Creative website</SelectItem><SelectItem value="product">Digital product</SelectItem><SelectItem value="3d">3D experience</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent></Select></Field>
                <Field label="Budget range"><Select value={budget} onValueChange={setBudget}><SelectTrigger><SelectValue placeholder="Select range" /></SelectTrigger><SelectContent><SelectItem value="10-20">$10k — $20k</SelectItem><SelectItem value="20-40">$20k — $40k</SelectItem><SelectItem value="40+">$40k+</SelectItem></SelectContent></Select></Field>
              </div>
              <Field label="The brief" error={errors.message}><Textarea name="message" placeholder="Tell me about the idea, the challenge, and where you’d like to take it..." maxLength={1200} rows={5} aria-invalid={Boolean(errors.message)} /></Field>
              <Button type="submit" size="lg" className="h-14 w-full sm:w-auto" disabled={submitState === "loading"}>{submitState === "loading" ? "SENDING…" : "SEND INQUIRY"}<Send /></Button>
              <p className="text-xs text-muted-foreground">This demo validates your note locally and does not send or store personal data.</p>
            </>
          )}
        </form>
      </section>

      <footer><div className="section-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"><b>SD<span>.</span></b><p>© 2026 Samar Dev. Built with curiosity.</p><div><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn <ExternalLink /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <ExternalLink /></a></div></div></footer>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && <DialogContent className="project-dialog max-h-[88vh] max-w-3xl overflow-y-auto"><DialogHeader><p className="eyebrow text-primary">CASE STUDY · {selectedProject.number}</p><DialogTitle>{selectedProject.title}</DialogTitle><DialogDescription>{selectedProject.type} · {selectedProject.year}</DialogDescription></DialogHeader><div className={cn("dialog-art", selectedProject.palette)}>{selectedProject.id === "orbit" ? <OrbitArtwork /> : <BeyondArtwork />}</div><p className="dialog-lede">{selectedProject.detail}</p><div className="dialog-meta"><div><span>SELECTED OUTCOME</span><b>{selectedProject.result}</b></div><div><span>CONTRIBUTIONS</span>{selectedProject.contributions.map((item) => <p key={item}>{item}</p>)}</div></div></DialogContent>}
      </Dialog>
    </main>
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
  return <div className="beyond-art" aria-hidden="true"><div className="portal"><span /><span /><span /><i>∞</i></div><b className="star s1">✦</b><b className="star s2">✦</b><b className="star s3">✦</b></div>;
}