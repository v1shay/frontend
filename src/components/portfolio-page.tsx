"use client"

import Image, { type StaticImageData } from "next/image"

// ── Hero ──────────────────────────────────────────────────────────────────────
import heroImage from "../../images/hero.jpeg"

// ── Research / ML projects ────────────────────────────────────────────────────
import neurosense from "../../images/neuro.png"                          // NeuroSense confusion-matrix paper figure
import phytovisionImage from "../../images/tomato.png"                   // Phyto-Vision tomato leaf CNN
import sentinelImage from "../../images/image copy 33.png"   // Sentinel-LLM hallucination leaderboard chart
import softwareintern from "../../images/substack.png"                   // Substack graph crawler / Chapman internship
// ── Basketball ────────────────────────────────────────────────────────────────
import vishayDribbling from "../../images/athletes.jpeg"                 // Vishay dribbling in Lynbrook jersey mid-game
import lynbrookTeamPhoto from "../../images/basketballteam.jpeg"         // Lynbrook freshman basketball team group photo
import athletes from "../../images/image copy 15.png"
import cs from "../../images/image copy 14.png"
import nova from "../../images/image copy 16.png"
import githubLogo from "../../images/image copy 30.png"
import gmailLogo from "../../images/image copy 31.png"
import resumeLogo from "../../images/image copy 24.png"
import basketballLogo from "../../images/image copy 22.png"
import hackathonLogo from "../../images/image copy 28.png"
import projectLogo from "../../images/image copy 20.png"
import contactImage from "../../images/contact.jpeg"

// ── TaeKwonDo ─────────────────────────────────────────────────────────────────
import tkdBlockBreaking from "../../images/tkd.png"                      // Vishay breaking concrete blocks at belt test
import tkdDojanGroupPhoto from "../../images/tkd2.jpeg"                  // Full TKD dojang black-belt ceremony group photo
import tkdKickIcon from "../../images/image copy 10.png"                 // Taekwondo kick silhouette icon
import worldTaekwondoLogo from "../../images/image copy 11.png"          // World Taekwondo federation logo

// ── NovaSTEM ──────────────────────────────────────────────────────────────────
import novaStemOutdoorDemo from "../../images/novastem1.jpeg"            // Vishay doing STEM experiment demo for kids outdoors
import novaStemBalloonScience from "../../images/novastem2.jpeg"         // Vishay teaching balloon science at Good Samaritan

// ── Uplift Art Foundation ─────────────────────────────────────────────────────
import upliftCardsSpread from "../../images/art.jpeg"                    // Spread of get-well cards made for pediatric patients
import upliftCardsDisplay from "../../images/art2.jpeg"                  // Cards displayed upright on a table before delivery

// ── School / partner logos (CS4All outreach schools) ─────────────────────────
import sundayFriendsLogo from "../../images/image copy.png"              // Sunday Friends nonprofit logo
import harkerLogo from "../../images/image copy 2.png"                   // The Harker School eagle logo
import monteVistaLogo from "../../images/image copy 3.png"               // Monte Vista bear mascot logo
import vikingMascotLogo from "../../images/image copy 4.png"             // Viking mascot logo (school outreach)
import dilworthDragonsLogo from "../../images/image copy 5.png"          // Dilworth Dragons elementary logo
import millerMustangsLogo from "../../images/image copy 6.png"           // Miller Middle School Mustangs logo
import upliftHawkLogo from "../../images/image copy 7.png"               // Uplift Art Foundation hawk logo
import deVargasStemLogo from "../../images/image copy 8.png"             // De Vargas STEM school logo
import goodSamaritanPenguinLogo from "../../images/image copy 9.png"     // Good Samaritan Preschool penguin logo
import goodSamaritanLogo from "../../images/image.png"                   // Good Samaritan Preschool text logo

// ── Other Projects visuals ───────────────────────────────────────────────────
import mlLabsIcon from "../../images/other_projects/ml-labs-icon.png"
import archLlmScreenshot from "../../images/other_projects/image.png"
import sentinelLlmChart from "../../images/other_projects/image copy.png"
import voxAgentScreenshot from "../../images/other_projects/PNG image.png"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Menu,
  Sparkles,
  X,
} from "lucide-react"


import { cn } from "@/lib/utils"
import { GitHubTerminal } from "./github-terminal"
import { useShaderPalette } from "./shader-background"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "research", label: "Research & Projects" },
  { id: "experience", label: "Clubs & Non-profit Work" },
  { id: "projects-grid", label: "Other Projects" },
  { id: "contact", label: "Contact" },
] as const

type ProjectAction = {
  label: string
  href?: string
  kind?: "github" | "publication" | "website"
  disabled?: boolean
}

type ResearchProject = {
  id: string
  title: string
  subtitle: string
  hook: string
  metrics: { stat: string; label: string }[]
  image: StaticImageData
  logoLabel: string
  accent: string
  actions: ProjectAction[]
}

type PillarSlide = {
  title: string
  copy: string
  images: StaticImageData[]
  logos?: { src: StaticImageData; alt: string }[]
  titleMedia?: { src: StaticImageData; alt: string }
  imageClassName?: string
  actions?: ProjectAction[]
}

const researchProjects: readonly ResearchProject[] = [
  {
    id: "chamtern",
    title: "Software & Research Intern",
    subtitle: "CHAMPMAN UNIVERSITY",
    hook: "Built a linear-algebra–driven ingestion system for large-scale Substack networks at Chapman University",
    metrics: [
      { stat: "+30%", label: "SPEED" },
      { stat: "+20%", label: "PERF" },
      { stat: "PGSQL", label: "BACKEND" },
    ],
    image: softwareintern,
    logoLabel: "C.U",
    accent: "from-[#f0f4ff]/40 via-[#dcb58f]/18 to-transparent",
    actions: [{ label: "GitHub", href: "https://github.com/v1shay/substack", kind: "github" }],
  },
  {
    id: "neuro-sense",
    title: "Neuro-Sense",
    subtitle: "Machine Learning",
    hook: "Published and built a voice-based Parkinson’s detection pipeline, indexed by the International Journal for Research, Google Scholar, OIPub and ResearchGate",
    metrics: [
      { stat: "91%", label: "ACCURACY" },
      { stat: "195", label: "TRIALS" },
    ],
    image: neurosense,
    logoLabel: "BIO",
    accent: "from-[#fff4ea]/34 via-[#c88f6a]/18 to-transparent",
    actions: [
      { label: "GitHub", href: "https://github.com/v1shay/neuro-sense", kind: "github" },
      { label: "Publication", href: "https://www.aijfr.com/research-paper.php?id=3711/", kind: "github" },
    ],
  },
  {
    id: "phytovision",
    title: "Phyto-Vision",
    subtitle: "Neural Networks / Computer Vision",
    hook: "Built a neural network for plant disease detection, presented to UCSC professors for greenhouse deployment",
    metrics: [
      { stat: "95%+", label: "ACCURACY" },
      { stat: "395K+", label: "IMAGES TRAINED ON" },
      { stat: "5", label: "DISEASE CLASSES TESTED" },
    ],
    image: phytovisionImage,
    logoLabel: "CV",
    accent: "from-[#d0fff2]/30 via-[#5cae9f]/16 to-transparent",
    actions: [{ label: "GitHub", href: "https://github.com/v1shay/phyto-vision", kind: "github" }],
  },
  {
    id: "echo-os",
    title: "Echo-OS",
    subtitle: "ElevenLabs 2026 Hackathon Winner | March 2026",
    hook: "Built an autonomous voice agent, winning an ElevenLabs-backed hackathon.",
    metrics: [
      { stat: "1ST", label: "PLACE" },
      { stat: "120+", label: "TEAMS" },
      { stat: "VECTOR-DB RAG", label: "MEMORY" },
    ],
    image: sentinelImage,
    logoLabel: "AI Agent",
    accent: "from-[#eff3ff]/30 via-[#94a3ff]/16 to-transparent",
    actions: [{ label: "GitHub", href: "https://github.com/v1shay/jarvis", kind: "github" }],
  },
] as const

const researchMLGridProjects = [
  {
    title: "ML-Labs",
    hook: "An autonomous research lab at the tip of your fingers.",
    metrics: [
      { stat: "19 AGENTS", label: "SYSTEM" },
      { stat: "8 RESEARCH PHASES", label: "TRAINING" },
    ],
    href: "https://github.com/v1shay/ml-labs",
    linkLabel: "GitHub",
    image: mlLabsIcon,
  },
  {
    title: "archLLM-sim",
    hook: "Token optimization for long-context AI model systems, designed around real GPU limits, beats RAG baselines",
    metrics: [
      { stat: "+95%", label: "ADHERENCE" },
      { stat: "Apache 2.0", label: "LICENSE" },
      { stat: "-30%", label: "HBM" },
    ],
    href: "https://github.com/v1shay/archLLM-sim",
    linkLabel: "GitHub",
    image: archLlmScreenshot,
  },
  {
    title: "Sentinel-LLM",
    hook: "Production-level LLM hallucination detection, tested against top AI models",
    metrics: [
      { stat: "NLP", label: "PIPELINE" },
      { stat: "Apache 2.0", label: "LICENSE" },
      { stat: "Linear Binary", label: "CLASSIFICATION" },
    ],
    href: "https://github.com/v1shay/sentinel-LLM",
    linkLabel: "GitHub",
    image: sentinelLlmChart,
  },
] as const

const agentGridProjects = [
  {
    title: "Vox-Agent",
    hook: "Turn your AirPods into an AI-powered note-taking system",
    metrics: [
      { stat: "CoreAudio", label: "STREAM ISOLATION" },
      { stat: "<100ms", label: "LATENCY" },
      { stat: "CPU Optimization", label: "ALGORITHMS" },
    ],
    href: "https://github.com/v1shay/vox-agent",
    linkLabel: "GitHub",
    image: voxAgentScreenshot,
    gif: null as string | null,
  },
  {
    title: "Sift",
    hook: "Turns GitHub into a live, explorable universe via linear algebra",
    metrics: [
      { stat: "MIT", label: "LICENSE" },
      { stat: "Vector Embeddings", label: "RECALL" },
    ],
    href: "https://github.com/v1shay/sift",
    linkLabel: "GitHub",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/Convert to GIF project (1).gif",
  },
  {
    title: "Neural-Lens",
    hook: "Low-latency data analysis, right in your browser.",
    metrics: [
      { stat: "<500ms", label: "LATENCY" },
      { stat: "Edge", label: "EXECUTION" },
      { stat: "MV3", label: "COMPLIANT" },
    ],
    href: "https://github.com/v1shay/neural-lens",
    linkLabel: "GitHub",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/Adobe Express - neurallens (1).gif",
  },
  {
    title: "Freelance Frontend Dev",
    hook: "Shipped production-level storefronts for local businesses",
    metrics: [
      { stat: "+100%", label: "INCREASED TRAFFIC" },
    ],
    href: "https://taquizas-chapala.vercel.app",
    linkLabel: "Website",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/Convert to GIF project.gif",
  },
] as const

const contactButtons = [
  {
    label: "NOVASTEM",
    image: nova,
    href: "https://novastem.vercel.app",
  },
  {
    label: "UPLIFT ART FOUNDATION",
    image: projectLogo,
    href: "https://uplift-art.vercel.app",
  },
  {
    label: "BASKETBALL",
    image: basketballLogo,
    href: "https://www.lynbrookvikings.com/player/vishay-agarwal/",
  },
  {
    label: "RESUME",
    image: resumeLogo,
    href: "https://docs.google.com/document/d/17_go6arOIviQ2X_M8XTwY88k7OC9EA-g/edit",
  },
  {
    label: "GITHUB",
    image: githubLogo,
    href: "https://github.com/v1shay",
  },
  {
    label: "HACKATHON PORTFOLIO",
    image: hackathonLogo,
    href: "https://devpost.com/v1shay/challenges",
  },
  {
    label: "EMAIL",
    image: gmailLogo,
    href: "mailto:v.agrwl17@gmail.com",
  },
] as const

function toExternalHref(href: string) {
  return /^https?:\/\//i.test(href) ? href : `https://${href.replace(/^\/+/, "")}`
}

const heroPortraitShellMobileStyle: CSSProperties = {
  width: "min(68vw, 20rem)",
  minWidth: "unset",
  maxWidth: "20rem",
  marginInline: "auto",
}

const heroPortraitMaskMobileStyle: CSSProperties = {
  height: "min(40vh, 22rem)",
  maxHeight: "22rem",
}

const heroTitleLines = ["Vishay", "Agarwal"] as const

function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionShell({
  id,
  eyebrow,
  title,
  copy,
  children,
}: {
  id: string
  eyebrow?: string
  title?: string
  copy?: string
  children: React.ReactNode
}) {
  const hasHeading = Boolean(eyebrow || title || copy)

  return (
    <section id={id} className={cn("section-anchor snap-section w-full", id === "projects-grid" ? "px-0" : "px-6 sm:px-10 lg:px-16")}>
      <Reveal className={cn("section-shell", id === "projects-grid" && "w-full")}>
        {hasHeading ? (
          <div className={cn("section-heading", id === "projects-grid" ? "max-w-none w-full" : "max-w-3xl")}>
            {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="font-display-serif section-title">{title}</h2> : null}
            {copy ? <p className="section-copy">{copy}</p> : null}
          </div>
        ) : null}
        {children}
      </Reveal>
    </section>
  )
}

function StickyNavbar() {
  const activeSection = useActiveSection(navItems.map((item) => item.id))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24)
  })

  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -28, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="nav-root"
    >
      <div className={cn("nav-shell", scrolled && "nav-shell-scrolled")}>
        <a href="#hero" className="nav-brand">
          <span className="nav-brand-dot" />
          Vishay Agarwal
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, marginTop: 12 },
          closed: { height: 0, opacity: 0, marginTop: 0 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="nav-mobile-wrap"
      >
        <div className="liquid-panel nav-mobile-panel">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}

function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const portraitY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 62]), {
    stiffness: 120,
    damping: 24,
    mass: 0.55,
  })
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -18]), {
    stiffness: 140,
    damping: 28,
    mass: 0.5,
  })
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.96, 0.84])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section snap-section"
    >
      <div className="hero-ambient-stage" aria-hidden="true">
        <motion.div
          className="hero-ambient-ribbon hero-ambient-ribbon-one"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 26, -20, 0], y: [0, -22, 12, 0], rotate: [0, 4, -3, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-ambient-ribbon hero-ambient-ribbon-two"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -20, 18, 0], y: [0, 16, -12, 0], rotate: [0, -5, 3, 0] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="hero-inner">
        <div className="hero-grid">
          <motion.div
            className="hero-copy-column"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.62, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="hero-kicker hero-kicker-animated"
            >
              <span className="hero-kicker-sheen" aria-hidden="true" />
              <Sparkles className="h-3.5 w-3.5" />
              DIGITAL RESUME
            </motion.div>
            <h1 className="hero-title mt-6" aria-label="Vishay Agarwal">
              {heroTitleLines.map((line, index) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 54, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.82, delay: 0.12 + index * 0.11, ease: [0.18, 1, 0.3, 1] }}
                  className={cn("hero-title-line", index === 1 && "hero-title-line-accent")}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.76, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hero-subtext"
            >


              Hi, I&apos;m Vishay, freshman at Lynbrook High whos obsessed with all things systems. Whether it&apos;s ML pipelines, LEGOs, basketball, or just NBA2K, I see a system in everything. I&apos;m passionate about turning research ideas into real-world solutions!
            </motion.p>
            <div className="hero-actions">
              <motion.a
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.62, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                href="#research"
                className="hero-cta-primary"
              >
                Explore research
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.62, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                href="#research"
                className="hero-cta-secondary"
              >
                View projects
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -90, scale: 0.93, rotateX: 14 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.92, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={reduceMotion ? undefined : { y: portraitY, rotateZ: portraitRotate }}
            className="hero-portrait-wrap"
          >
            <motion.div
              className="hero-portrait-orb hero-portrait-orb-one"
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.08, 0.98, 1], x: [0, 10, -6, 0], y: [0, -12, 8, 0] }
              }
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-portrait-orb hero-portrait-orb-two"
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 0.94, 1.05, 1], x: [0, -8, 4, 0], y: [0, 10, -8, 0] }
              }
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="hero-portrait-shell">
              <motion.div
                className="hero-portrait-mask"
                animate={reduceMotion ? undefined : { y: [0, -8, 0, 6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={heroImage}
                  alt="Portrait placeholder for Vishay Agarwal"
                  priority
                  className="hero-image"
                />
                <div className="hero-image-wash" aria-hidden="true" />
                <div className="hero-image-sheen" aria-hidden="true" />
              </motion.div>
            </div>
            <style jsx>{`
              @media (max-width: 767px) {
                .hero-portrait-shell {
                  width: ${heroPortraitShellMobileStyle.width};
                  min-width: ${heroPortraitShellMobileStyle.minWidth};
                  max-width: ${heroPortraitShellMobileStyle.maxWidth};
                  margin-inline: ${heroPortraitShellMobileStyle.marginInline};
                }

                .hero-portrait-mask {
                  height: ${heroPortraitMaskMobileStyle.height};
                  max-height: ${heroPortraitMaskMobileStyle.maxHeight};
                }
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ResearchProjectDetailBody({ project }: { project: ResearchProject }) {
  if (project.id === "chamtern") {
    return (
      <div className="research-detail-grid research-detail-grid--chamtern">
        <div className="research-detail-visual research-detail-visual--chamtern">
          <div className={cn("research-card-sheen bg-gradient-to-br", project.accent)} aria-hidden="true" />
          <Image
            src={project.image}
            alt={`${project.title} expanded artwork`}
            className="research-modal-image research-modal-image--contain"
          />
          <div className="research-modal-image-wash" aria-hidden="true" />
        </div>

        <div className="research-detail-copy research-detail-copy--chamtern">
          <div className="research-modal-topline">
            <span className="research-logo-slot research-logo-slot-large">{project.logoLabel}</span>
            <span className="research-card-tag">Network systems internship</span>
          </div>
          <p className="research-mini-kicker">{project.subtitle}</p>
          <h3 className="research-modal-title">{project.title}</h3>
          <p className="research-modal-description">
            Built a Substack-scale analysis engine that fused API ingestion, graph crawling, and
            influence scoring into one research pipeline. The system mapped publication and comment
            relationships into a queryable social graph, then surfaced patterns across tens of
            thousands of nodes.
          </p>
          <div className="research-modal-stack">
            <span className="research-stack-pill">Python</span>
            <span className="research-stack-pill">Graph traversal</span>
            <span className="research-stack-pill">170K+ nodes mapped</span>
          </div>
          <div className="research-detail-note">
            I implemented endpoint ingestion, BFS traversal, and ranking logic so the crawler could
            expand faster, attribute comment edges correctly, and produce cleaner influence metrics for
            trend discovery.
          </div>
        </div>
      </div>
    )
  }

  if (project.id === "neuro-sense") {
    return (
      <div className="research-detail-grid research-detail-grid--neuro">
        <div className="research-detail-copy research-detail-copy--neuro">
          <div className="research-modal-topline">
            <span className="research-logo-slot research-logo-slot-large">{project.logoLabel}</span>
            <span className="research-card-tag">Published ML work</span>
          </div>
          <p className="research-mini-kicker">{project.subtitle}</p>
          <h3 className="research-modal-title">{project.title}</h3>
          <p className="research-modal-description">
            Neuro-Sense used speech features and structured biomarkers to estimate early neurological
            risk. The pipeline centered on signal cleaning, classical model selection, and interpretable
            validation so the results were understandable rather than just high-scoring.
          </p>
          <div className="research-modal-stack">
            <span className="research-stack-pill">Audio features</span>
            <span className="research-stack-pill">Classical ML</span>
            <span className="research-stack-pill">91% validation accuracy</span>
          </div>
          <div className="research-detail-note">
            The final system combined preprocessing, feature extraction, and evaluation into a single
            reproducible workflow that later supported a peer-reviewed publication.
          </div>
        </div>

        <div className="research-detail-rail">
          <div className="research-detail-visual research-detail-visual--neuro">
            <div className={cn("research-card-sheen bg-gradient-to-br", project.accent)} aria-hidden="true" />
            <Image
              src={project.image}
              alt={`${project.title} expanded artwork`}
              className="research-modal-image research-modal-image--contain"
            />
            <div className="research-modal-image-wash" aria-hidden="true" />
          </div>
          <div className="research-detail-stat-card">
            <span className="research-detail-stat-label">System focus</span>
            <span className="research-detail-stat-value">
              Reliable screening logic with interpretable outputs and reproducible validation.
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (project.id === "phytovision") {
    return (
      <div className="research-detail-grid research-detail-grid--phytovision">
        <div className="research-detail-visual research-detail-visual--phytovision">
          <div className={cn("research-card-sheen bg-gradient-to-br", project.accent)} aria-hidden="true" />
          <Image
            src={project.image}
            alt={`${project.title} expanded artwork`}
            className="research-modal-image research-modal-image--contain"
          />
          <div className="research-modal-image-wash" aria-hidden="true" />
        </div>

        <div className="research-detail-copy research-detail-copy--phytovision">
          <div className="research-modal-topline">
            <span className="research-logo-slot research-logo-slot-large">{project.logoLabel}</span>
            <span className="research-card-tag">Computer vision research</span>
          </div>
          <p className="research-mini-kicker">{project.subtitle}</p>
          <h3 className="research-modal-title">{project.title}</h3>
          <p className="research-modal-description">
            Phyto-Vision focused on plant disease recognition through image-based learning. I trained
            and tuned the detection workflow around large image datasets, then shaped the results into a
            system that could support real greenhouse usage rather than just a classroom demo.
          </p>
          <div className="research-modal-stack">
            <span className="research-stack-pill">CNNs</span>
            <span className="research-stack-pill">Transfer learning</span>
            <span className="research-stack-pill">95% validation accuracy</span>
          </div>
          <div className="research-detail-note">
            The project was later presented to UCSC researchers, with the strongest emphasis on image
            quality, dataset structure, and deployment-oriented model confidence.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="research-detail-grid research-detail-grid--sentinel">
      <div className="research-detail-copy research-detail-copy--sentinel">
        <div className="research-modal-topline">
          <span className="research-logo-slot research-logo-slot-large">{project.logoLabel}</span>
          <span className="research-card-tag">Voice-powered AI</span>
        </div>
        <p className="research-mini-kicker">{project.subtitle}</p>
        <h3 className="research-modal-title">{project.title}</h3>
        <p className="research-modal-description">
          Echo-OS is an autonomous voice-operating system that executes computer workflows visually and intelligently. By utilizing large language models and ChromaDB memory retrieval, the system completes complex multi-step application interactions entirely through conversational audio.
        </p>
        <div className="research-modal-stack">
          <span className="research-stack-pill">Vector Database</span>
          <span className="research-stack-pill">Speech-to-Text</span>
          <span className="research-stack-pill">LLM Interaction</span>
        </div>
        <div className="research-detail-note">
          Our team won 1st Place out of 120 competitors at the ElevenLabs Raven Hacks Hackathon by engineering robust real-time interaction logic that bridges auditory commands with visual execution.
        </div>
      </div>

      <div className="research-detail-visual research-detail-visual--sentinel">
        <div className={cn("research-card-sheen bg-gradient-to-br", project.accent)} aria-hidden="true" />
        <Image
          src={project.image}
          alt={`${project.title} expanded artwork`}
          className="research-modal-image research-modal-image--contain"
        />
        <div className="research-modal-image-wash" aria-hidden="true" />
      </div>
    </div>
  )
}

function ResearchShowcase() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null)
  const activeProject =
    researchProjects.find((project) => project.id === activeProjectId) ?? null

  useEffect(() => {
    if (!activeProjectId) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProjectId(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [activeProjectId])

  return (
    <>
      <SectionShell
        id="research"
      >
        <div className="research-editorial-shell">
          <div className="research-grid-frame">
            <div className="research-card-grid">
              {researchProjects.map((project, index) => (
                <Reveal key={project.id} delay={0.1 + index * 0.08} className="research-card-slot">
                  <motion.div
                    role="button"
                    tabIndex={0}
                    whileHover={{ y: -10, scale: 1.01, rotateX: -2, rotateY: index % 2 === 0 ? -2 : 2 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="research-card liquid-panel"
                    onClick={() => setActiveProjectId(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        setActiveProjectId(project.id)
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "research-card-sheen bg-gradient-to-br",
                        project.accent
                      )}
                      aria-hidden="true"
                    />

                    <div className="research-card-image-wrap">
                      <Image
                        src={project.image}
                        alt={`${project.title} placeholder artwork`}
                        className="research-card-image"
                      />
                      <div className="research-card-image-wash" aria-hidden="true" />
                    </div>
                    <div className="research-card-body">
                      <p className="research-mini-kicker">{project.subtitle}</p>
                      <h3 className="research-card-title">{project.title}</h3>
                      <p className="research-card-hook">{project.hook}</p>
                      <div className="projects-stats-grid projects-stats-grid--research">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="projects-stat-item">
                            <span className="projects-stat-value">{m.stat}</span>
                            <span className="projects-stat-label">{m.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="research-card-footer">
                        <button
                          type="button"
                          className="research-card-link research-card-detail-button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setActiveProjectId(project.id)
                          }}
                        >
                          Open detail
                          <ChevronRight className="h-4 w-4" />
                        </button>
                        <div className="research-card-actions">
                          {project.actions.map((action) =>
                            action.disabled || !action.href ? (
                              <span
                                key={`${project.id}-${action.label}`}
                                className="research-card-action research-card-action-disabled"
                              >
                                {action.label}
                              </span>
                            ) : (
                              <a
                                key={`${project.id}-${action.label}`}
                                href={toExternalHref(action.href)}
                                target="_blank"
                                rel="noreferrer"
                                className="research-card-action"
                                onClick={(event) => event.stopPropagation()}
                              >
                                {action.label}
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      {activeProject ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="research-modal-backdrop"
          onClick={() => setActiveProjectId(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="research-modal liquid-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="research-modal-close"
              aria-label="Close project detail"
              onClick={() => setActiveProjectId(null)}
            >
              <X className="h-4 w-4" />
            </button>

            <ResearchProjectDetailBody project={activeProject} />
          </motion.div>
        </motion.div>
      ) : null}
    </>
  )
}

function InteractivePillar({
  slides,
  className,
  isLarge = false,
}: {
  slides: PillarSlide[]
  className?: string
  isLarge?: boolean
}) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const currentSlide = slides[activeSlide]

  return (
    <div className={cn("pillar liquid-panel", className)}>
      <div className="pillar-slides-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pillar-slide"
          >
            {currentSlide.logos?.length ? (
              <div className="pillar-logo-row">
                {currentSlide.logos.map((logo) => (
                  <div key={`${currentSlide.title}-${logo.alt}`} className="pillar-logo-chip" aria-hidden="true">
                    <Image src={logo.src} alt={logo.alt} className="pillar-logo-img" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="pillar-text-wrap">
              <div className="pillar-title-row">
                <h3 className={isLarge ? "pillar-title-large" : "pillar-title"}>
                  {currentSlide.title}
                </h3>
                {currentSlide.titleMedia ? (
                  <Image
                    src={currentSlide.titleMedia.src}
                    alt={currentSlide.titleMedia.alt}
                    className="pillar-title-media"
                  />
                ) : null}
              </div>
              <p className={isLarge ? "pillar-copy-large" : "pillar-copy"}>
                {currentSlide.copy}
              </p>
              {currentSlide.actions?.length ? (
                <div className="pillar-actions">
                  {currentSlide.actions.map((action) =>
                    action.disabled || !action.href ? (
                      <span
                        key={`${currentSlide.title}-${action.label}`}
                        className="pillar-action pillar-action-disabled"
                      >
                        {action.label}
                      </span>
                    ) : (
                      <a
                        key={`${currentSlide.title}-${action.label}`}
                        href={toExternalHref(action.href)}
                        target="_blank"
                        rel="noreferrer"
                        className="pillar-action"
                      >
                        {action.label}
                      </a>
                    )
                  )}
                </div>
              ) : null}
            </div>
            <div className="pillar-gallery-wrap">
              <div
                className="pillar-image-wrap cursor-pointer"
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % currentSlide.images.length)}
              >
                <Image
                  src={currentSlide.images[activeImageIndex]}
                  alt={`${currentSlide.title} visual ${activeImageIndex + 1}`}
                  className={cn("pillar-image transition-opacity duration-300", currentSlide.imageClassName)}
                />
                <div className="pillar-image-wash" aria-hidden="true" />
                {/* Image counter dots */}
                {currentSlide.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 z-10 flex gap-1">
                    {currentSlide.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn("w-1.5 h-1.5 rounded-full transition-all", activeImageIndex === idx ? "bg-white" : "bg-white/30")}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Topic switcher tabs — each tab is a fully different gallery view */}
      {slides.length > 1 && (
        <div className="pillar-tabs">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              className={cn("pillar-tab", activeSlide === i && "pillar-tab-active")}
              onClick={() => {
                setActiveSlide(i)
                setActiveImageIndex(0)
              }}
              aria-label={`Switch to ${slide.title}`}
            >
              {slide.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PillarsSection() {
  return (
    <SectionShell id="experience">
      <div className="pillars-container">
        {/* Pillar 1 – Athletics */}
        <Reveal delay={0.1} className="pillar-wrap pillar-wrap-left">
          <InteractivePillar
            isLarge={true}
            slides={[
              {
                title: "Uplift Art Foundation",
                copy: "Led art outreach across 10 Bay Area schools; created and delivered 5,000+ cards for pediatric patients with national partner CFHK.",
                images: [upliftCardsSpread],
                actions: [
                  { label: "Website", href: "uplift-art.vercel.app", kind: "website" },
                ],
                logos: [
                  { src: monteVistaLogo, alt: "Uplift Art Foundation" },
                  { src: dilworthDragonsLogo, alt: "Dilworth Dragons" },
                  { src: vikingMascotLogo, alt: "Viking School" },
                  { src: millerMustangsLogo, alt: "Miller Middle School" },
                  { src: harkerLogo, alt: "De Vargas STEM" },
                ],
              },
              {
                title: "Basketball",
                copy: "Member of the Lynbrook High School freshman basketball team.",
                images: [lynbrookTeamPhoto],
                logos: [
                  { src: vikingMascotLogo, alt: "Basketball" },
                ],
              },
            ]}
          />
        </Reveal>

        {/* Pillar 2 – Nonprofits */}
        <Reveal delay={0.2} className="pillar-wrap pillar-wrap-center">
          <InteractivePillar
            className="pillar-main"
            isLarge={true}
            slides={[
              {
                title: "NovaSTEM",
                copy: "Founded STEM outreach; partner of Good Samaritan Preschool and Sunday Friends, delivering hands-on workshops to 350+ students.",
                images: [novaStemBalloonScience],
                titleMedia: { src: nova, alt: "NovaSTEM mark" },
                actions: [
                  { label: "Website", href: "novastem.vercel.app", kind: "website" },
                ],
                logos: [

                  { src: sundayFriendsLogo, alt: "Sunday Friends" },
                  { src: goodSamaritanLogo, alt: "Good Samaritan" },

                ],
              },
              {
                title: "TaeKwonDo",
                copy: "Earned 1st-degree black belt; mentored junior students in technique, sparring fundamentals, and discipline.",
                images: [tkdDojanGroupPhoto],
                logos: [
                  { src: tkdKickIcon, alt: "Taekwondo" },
                  { src: worldTaekwondoLogo, alt: "World Taekwondo" },
                ],
              },
            ]}
          />
        </Reveal>

        {/* Pillar 3 – CS & Community */}
        <Reveal delay={0.3} className="pillar-wrap pillar-wrap-right">
          <InteractivePillar
            isLarge={true}
            slides={[
              {
                title: "CS4All",
                copy: "Mentored students in foundational CS concepts, guiding hands-on coding and problem-solving sessions.",
                images: [athletes],
                imageClassName: "pillar-image--cs4all",
                logos: [
                  { src: upliftHawkLogo, alt: "Harker School" },
                  { src: dilworthDragonsLogo, alt: "Miller Middle School" },
                  { src: deVargasStemLogo, alt: "Monte Vista" },
                ],
              },
              {
                title: "Athletes4Others",
                copy: "Guided students in community service initiatives, coordinating outreach and volunteer activities.",
                images: [cs],
                logos: [
                  { src: goodSamaritanPenguinLogo, alt: "Sunday Friends" },

                ],
              },
            ]}
          />
        </Reveal>
      </div>
    </SectionShell>
  )
}

function ProjectGridSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })
  const { setPaused } = useShaderPalette()
  const [activeTab, setActiveTab] = useState<"agents" | "research">("agents")

  useEffect(() => {
    setPaused(isInView)
  }, [isInView, setPaused])

  const activeProjects = activeTab === "research" ? researchMLGridProjects : agentGridProjects

  return (
    <SectionShell id="projects-grid">
      <div ref={ref} className="projects-page-shell">
        <div className="projects-page-container">
          <div className="projects-page-content">
            {/* Toggle bar */}
            <div className="projects-toggle-bar">
              <button
                type="button"
                className={cn("projects-toggle-btn", activeTab === "agents" && "projects-toggle-btn-active")}
                onClick={() => setActiveTab("agents")}
              >
                Agents
              </button>
              <button
                type="button"
                className={cn("projects-toggle-btn", activeTab === "research" && "projects-toggle-btn-active")}
                onClick={() => setActiveTab("research")}
              >
                Research / ML
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={cn(
                  "projects-page-grid-v2",
                  activeTab === "research" ? "projects-page-grid-v2--three" : "projects-page-grid-v2--four"
                )}
                role="list"
                aria-label="Portfolio projects"
              >
                {activeProjects.map((project) => (
                  <div key={project.title} className="projects-v2-card-slot">
                    <article
                      role="listitem"
                      className="projects-v2-card projects-page-card-optimized"
                    >
                      <div className="projects-v2-card-text">
                        <div className="projects-v2-card-header-row">
                          <h3 className="projects-page-card-title">{project.title}</h3>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noreferrer"
                            className="projects-v2-card-link-mini"
                            aria-label={`View ${project.title}`}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        <p className="projects-page-card-subtitle">{project.hook}</p>

                        <div className="projects-stats-row-inline">
                          {project.metrics.map((m, i) => (
                            <div key={i} className="projects-stat-item-mini">
                              <span className="projects-stat-value-mini">{m.stat}</span>
                              <span className="projects-stat-label-mini">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="projects-v2-card-visual">
                        <div className="projects-v2-card-visual-inner">
                          {"gif" in project && project.gif ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                              src={project.gif}
                              alt={`${project.title} demo`}
                              className="projects-v2-card-img"
                            />
                          ) : "image" in project && project.image ? (
                            <Image
                              src={project.image}
                              alt={`${project.title} screenshot`}
                              className="projects-v2-card-img"
                            />
                          ) : null}
                          <div className="projects-v2-card-img-wash" aria-hidden="true" />
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <aside className="projects-page-aside">
            <div className="w-full h-full">
              <GitHubTerminal />
            </div>
          </aside>
        </div>
      </div>
    </SectionShell>
  )
}

function ContactSection() {
  return (
    <SectionShell id="contact">
      <div className="contact-page-shell">
        <div className="contact-page-visual-column">
          <div className="contact-photo-shell">
            <div className="contact-photo-frame">
              <Image
                src={contactImage}
                alt="Portrait of Vishay Agarwal"
                className="contact-photo"
              />
              <div className="contact-photo-wash" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="contact-page-panel-column">
          <div className="contact-panel liquid-panel">
            <div className="contact-panel-header">
              <span className="contact-panel-kicker">Connect</span>
              <h3 className="contact-panel-title">Feel free to reach out!</h3>
              <p className="contact-panel-copy">
                If you have an idea, research opportunity, collaboration, or even just a question, I&apos;m always happy to connect
              </p>
            </div>

            <div className="contact-button-grid">
              {contactButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href.startsWith("#") ? button.href : toExternalHref(button.href)}
                  target={button.href.startsWith("#") ? undefined : "_blank"}
                  rel={button.href.startsWith("#") ? undefined : "noreferrer"}
                  className="contact-button-tile"
                >
                  <div className="contact-button-image-shell">
                    <Image src={button.image} alt={button.label} className="contact-button-image" />
                  </div>
                  <span className="contact-button-label">{button.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function PortfolioPage() {
  return (
    <>
      <main className="portfolio-page">
        <StickyNavbar />

        <HeroSection />

        <ResearchShowcase />

        <PillarsSection />

        <ProjectGridSection />

        <ContactSection />
      </main>

      <style jsx global>{`
        .nav-root {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 30;
        }

        .nav-shell {
          display: grid;
          grid-template-columns: minmax(12rem, auto) minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgb(255 255 255 / 0.08);
          backdrop-filter: blur(26px) saturate(140%);
          background: linear-gradient(180deg, rgb(7 10 19 / 0.34), rgb(7 10 19 / 0.12));
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .nav-palette-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          backdrop-filter: blur(18px) saturate(140%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
        }

        .nav-palette-button,
        .nav-mobile-palette-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .nav-palette-button {
          width: 2.25rem;
          height: 2.25rem;
          padding: 0.24rem;
        }

        .nav-palette-button:hover,
        .nav-mobile-palette-button:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.18);
        }

        .nav-palette-button-active,
        .nav-mobile-palette-button-active {
          border-color: rgb(255 255 255 / 0.28);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 22px rgb(0 0 0 / 0.1);
        }

        .nav-palette-swatch {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.35),
            0 8px 18px rgb(0 0 0 / 0.12);
        }

        .nav-link {
          padding: 0.72rem 1rem;
          border-radius: 999px;
          color: rgb(255 255 255 / 0.76);
        }

        .nav-mobile-palettes {
          display: none;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.55rem;
          margin-bottom: 0.35rem;
        }

        .nav-mobile-palette-button {
          gap: 0.55rem;
          justify-content: flex-start;
          padding: 0.8rem 0.9rem;
          border-radius: 1rem;
          border-color: rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          color: rgb(255 255 255 / 0.82);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
        }

        .nav-mobile-palette-button .nav-palette-swatch {
          width: 1.4rem;
          height: 1.4rem;
          flex-shrink: 0;
        }

        html {
          scroll-snap-type: y mandatory;
          scroll-padding-top: 92px;
          overscroll-behavior-y: none;
        }

        body {
          scroll-snap-type: none;
          margin: 0;
          padding: 0;
        }

        .portfolio-page {
          padding-top: 0;
        }

        .snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          contain: layout style paint;
        }

        .hero-section {
          width: 100%;
          min-height: 100vh;
          height: 100vh;
          max-height: 100vh;
          padding: calc(92px + 1.5rem) 2rem 3rem;
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }

        .hero-ambient-stage {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .hero-ambient-ribbon {
          position: absolute;
          border-radius: 999px;
          filter: blur(46px);
          mix-blend-mode: screen;
          opacity: 0.68;
        }

        .hero-ambient-ribbon-one {
          top: 10%;
          left: 6%;
          width: 18rem;
          height: 18rem;
          background:
            radial-gradient(circle at center, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.02) 70%, transparent 100%);
        }

        .hero-ambient-ribbon-two {
          right: 8%;
          bottom: 9%;
          width: 22rem;
          height: 22rem;
          background:
            radial-gradient(circle at center, rgb(219 186 149 / 0.22), rgb(219 186 149 / 0.02) 70%, transparent 100%);
        }

        .section-anchor {
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
          overflow: hidden !important;
          padding-top: 92px !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          padding-bottom: 1.5rem !important;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        #experience.section-anchor {
          padding-left: 0.75rem !important;
          padding-right: 0.75rem !important;
          padding-bottom: 0.75rem !important;
        }

        #research.section-anchor {
          padding-top: 92px !important;
        }

        #projects-grid.section-anchor {
          padding-top: 92px !important;
          padding-bottom: 0.75rem !important;
          padding-left: 2rem !important;
          padding-right: 2rem !important;
          width: 100vw !important;
          max-width: 100vw !important;
        }

        #contact.section-anchor {
          padding-top: 92px !important;
          padding-bottom: 1.5rem !important;
        }

        .hero-inner {
          display: flex;
          align-items: center;
          min-height: 100%;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(34rem, 1.14fr);
          align-items: center;
          gap: clamp(1.25rem, 3vw, 3.5rem);
          width: 100%;
        }

        .hero-copy-column {
          width: 100%;
          max-width: 64rem;
          padding-left: clamp(3rem, 8vw, 9rem);
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.72rem 1rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.16);
          background: rgb(255 255 255 / 0.1);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgb(255 255 255 / 0.8);
          position: relative;
          overflow: hidden;
        }

        .hero-kicker-animated {
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 12px 28px rgb(0 0 0 / 0.12);
        }

        .hero-kicker-sheen {
          position: absolute;
          inset: -20% auto -20% -40%;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.36), transparent);
          transform: skewX(-20deg);
          animation: hero-kicker-sheen 6.8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-weight: 500;
          font-optical-sizing: auto;
          margin-top: 1.5rem;
          max-width: 100%;
          font-size: clamp(4.2rem, 9.5vw, 8.5rem);
          line-height: 0.88;
          letter-spacing: -0.05em;
          color: white;
        }

        .hero-title-line {
          display: block;
          position: relative;
          text-shadow: 0 10px 38px rgb(0 0 0 / 0.16);
        }

        .hero-title-line-accent {
          color: white;
        }

        .hero-subtext {
          margin-top: 1.5rem;
          max-width: 46rem;
          font-size: clamp(1.28rem, 1.7vw, 1.65rem);
          line-height: 1.72;
          color: rgb(255 255 255 / 0.76);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        .hero-portrait-wrap {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          min-height: 100%;
          padding-right: clamp(1rem, 4vw, 4rem);
        }

        .hero-portrait-shell {
          width: min(54vw, 50rem);
          max-width: 50rem;
          min-width: 34rem;
        }

        .hero-portrait-mask {
          height: min(82vh, 58rem);
          max-height: 58rem;
        }

        .hero-image {
          object-position: center 14%;
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgb(0 0 0 / 0.92) 12%,
            black 24%,
            black 76%,
            rgb(0 0 0 / 0.92) 88%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgb(0 0 0 / 0.92) 12%,
            black 24%,
            black 76%,
            rgb(0 0 0 / 0.92) 88%,
            transparent 100%
          );
        }

        .hero-image-wash {
          background:
            linear-gradient(
              to bottom,
              rgb(240 244 255 / 0.16) 0%,
              rgb(240 244 255 / 0.04) 12%,
              transparent 26%,
              transparent 74%,
              rgb(9 11 20 / 0.12) 88%,
              rgb(9 11 20 / 0.42) 100%
            ),
            radial-gradient(circle at center, transparent 42%, rgb(9 11 20 / 0.12) 68%, rgb(9 11 20 / 0.34) 100%);
          filter: blur(14px);
        }

        .hero-image-sheen {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, transparent 24%, rgb(255 255 255 / 0.18) 40%, transparent 56%),
            linear-gradient(180deg, rgb(255 255 255 / 0.06), transparent 18%);
          mix-blend-mode: screen;
          opacity: 0.72;
          animation: hero-image-sheen 8.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes hero-kicker-sheen {
          0%, 14% {
            transform: translateX(0) skewX(-20deg);
            opacity: 0;
          }
          22% {
            opacity: 1;
          }
          36%, 100% {
            transform: translateX(380%) skewX(-20deg);
            opacity: 0;
          }
        }

        @keyframes hero-image-sheen {
          0%, 16% {
            transform: translateX(-24%);
            opacity: 0;
          }
          28% {
            opacity: 0.72;
          }
          44%, 100% {
            transform: translateX(24%);
            opacity: 0;
          }
        }

        .research-editorial-shell {
          display: grid;
          grid-template-rows: minmax(0, 1fr);
          flex: 1;
          margin-top: 0;
          height: 100%;
          min-height: 0;
        }

        .research-grid-frame {
          display: grid;
          align-items: stretch;
          overflow: hidden;
          height: 100%;
          min-height: 0;
          padding-top: 0.75rem;
          padding-bottom: 0;
        }

        .research-editorial-panel {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
          padding: 1.8rem;
          border-color: rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.14), transparent 42%);
        }

        .research-editorial-copy,
        .research-editorial-meta {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .research-editorial-meta {
          gap: 0.8rem;
          align-self: stretch;
        }

        .research-editorial-title {
          margin-top: 0.85rem;
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 3.2vw, 3.4rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: white;
        }

        .research-editorial-text {
          margin-top: 1rem;
          max-width: 44rem;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgb(255 255 255 / 0.76);
        }

        .research-mini-kicker {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgb(255 255 255 / 0.56);
        }

        .research-meta-pill,
        .research-stack-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          width: fit-content;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.1);
          background: rgb(255 255 255 / 0.06);
          padding: 0.7rem 0.95rem;
          font-size: 0.82rem;
          color: rgb(255 255 255 / 0.8);
          backdrop-filter: blur(18px);
        }

        .research-card-grid {
          display: grid;
          gap: clamp(1rem, 1vw, 1.25rem);
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          align-self: stretch;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .research-card-slot {
          min-height: 0;
          height: 100%;
        }

        .research-card {
          position: relative;
          display: grid;
          grid-template-columns: clamp(12rem, 31%, 15rem) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr);
          column-gap: 1.25rem;
          row-gap: 0.9rem;
          min-height: 0;
          height: 100%;
          padding: 1.2rem;
          text-align: left;
          border-color: rgb(255 255 255 / 0.18);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.16), transparent 44%);
        }

        .research-card-sheen {
          position: absolute;
          inset: 0;
          opacity: 0.9;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .research-card-topline,
        .research-modal-topline {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.9rem;
        }

        .research-card-topline {
          grid-column: 1 / -1;
        }

        .research-logo-slot {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.9rem;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          backdrop-filter: blur(18px);
        }

        .research-logo-slot-large {
          width: 3.4rem;
          height: 3.4rem;
          font-size: 1rem;
        }

        .research-card-tag {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgb(255 255 255 / 0.58);
        }

        .research-card-image-wrap,
        .research-modal-visual {
          position: relative;
          overflow: hidden;
          margin-top: 1rem;
          border: 1px solid rgb(255 255 255 / 0.08);
        }

        .research-modal-visual {
          border-radius: 1.5rem;
          background: rgb(255 255 255 / 0.04);
        }

        .research-card-image-wrap {
          border-radius: 1rem;
          grid-column: 1;
          grid-row: 1;
          margin-top: 0;
          min-height: 0;
          height: auto;
          align-self: center;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.15),
            0 18px 40px rgb(0 0 0 / 0.08);
        }

        .research-card-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .research-modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .research-card-image-wash,
        .research-modal-image-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgb(240 244 255 / 0.08), transparent 28%, transparent 72%, rgb(9 11 20 / 0.3)),
            radial-gradient(circle at center, transparent 46%, rgb(9 11 20 / 0.18) 74%, rgb(9 11 20 / 0.4) 100%);
          pointer-events: none;
        }

        .research-card-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          grid-column: 2;
          grid-row: 1;
          height: 100%;
          min-height: 0;
        }

        .research-card-title,
        .research-modal-title {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.45rem, 1.5vw, 1.8rem);
          font-optical-sizing: auto;
          line-height: 1.04;
          letter-spacing: -0.04em;
          color: white;
        }

        .research-card-title {
          display: block;
          width: 100%;
        }

        .research-modal-description {
          margin-top: 0.42rem;
          font-size: clamp(0.98rem, 0.95vw, 1.08rem);
          line-height: 1.55;
          color: rgb(255 255 255 / 0.74);
        }

        .research-card-copy {
          margin-top: 0.8rem;
          font-size: clamp(1.05rem, 1.25vw + 0.4rem, 1.25rem);
          line-height: 1.6;
          color: rgb(255 255 255 / 0.85);
          white-space: pre-line;
          display: block;
        }

        .research-card-hook {
          font-size: clamp(0.98rem, 1.05vw, 1.15rem);
          line-height: 1.55;
          color: rgb(255 255 255 / 0.82);
          margin-top: 0;
          margin-bottom: 1rem;
          max-width: 45ch;
        }

        .research-card-footer {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          padding-top: 1.5rem;
        }

        .research-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.98rem;
          font-weight: 500;
          color: rgb(255 255 255 / 0.84);
        }

        .research-card-detail-button {
          border: 1px solid rgb(255 255 255 / 0.12);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 55%);
          padding: 0.62rem 0.95rem;
          backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .research-card-detail-button:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.2);
        }

        .research-card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          justify-content: flex-end;
        }

        .research-card-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 55%);
          padding: 0.58rem 0.88rem;
          font-size: 0.83rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: rgb(255 255 255 / 0.86);
          backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .research-card-action:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.2);
          color: white;
        }

        .research-card-action-disabled {
          opacity: 0.62;
          cursor: default;
        }

        .research-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgb(5 8 16 / 0.48);
          backdrop-filter: blur(24px) saturate(135%);
        }

        .research-modal {
          position: relative;
          width: min(72rem, 100%);
          padding: 1.4rem;
          border-color: rgb(255 255 255 / 0.14);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.15), transparent 38%);
        }

        .research-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          color: rgb(255 255 255 / 0.86);
        }

        .research-modal-grid {
          display: grid;
          gap: 1.4rem;
          grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.92fr);
        }

        .research-detail-grid {
          display: grid;
          gap: 1.4rem;
          align-items: stretch;
          min-height: 0;
        }

        .research-detail-grid--chamtern,
        .research-detail-grid--phytovision {
          grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.96fr);
        }

        .research-detail-grid--neuro {
          grid-template-columns: minmax(22rem, 0.94fr) minmax(18rem, 0.72fr);
        }

        .research-detail-grid--sentinel {
          grid-template-columns: minmax(20rem, 0.9fr) minmax(0, 1fr);
        }

        .research-detail-visual,
        .research-detail-stat-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.55rem;
          border: 1px solid rgb(255 255 255 / 0.1);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.11), transparent 42%);
        }

        .research-detail-visual {
          min-height: 28rem;
          padding: 1.1rem;
        }

        .research-detail-visual--sentinel,
        .research-detail-visual--neuro {
          min-height: 24rem;
        }

        .research-detail-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
          padding: 0.6rem 0.5rem 0.6rem 0.2rem;
        }

        .research-detail-copy .research-mini-kicker {
          margin-top: 2rem;
        }

        .research-detail-copy .research-modal-title {
          margin-top: 0.8rem;
        }

        .research-detail-copy .research-modal-description {
          margin-top: 1.2rem;
        }

        .research-detail-copy--sentinel {
          padding-right: 1rem;
        }

        .research-detail-rail {
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          gap: 1rem;
        }

        .research-detail-stat-card {
          display: grid;
          gap: 0.5rem;
          padding: 1rem 1.1rem;
          backdrop-filter: blur(18px);
        }

        .research-detail-stat-label {
          font-size: 0.66rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.54);
        }

        .research-detail-stat-value {
          font-size: 0.98rem;
          line-height: 1.65;
          color: rgb(255 255 255 / 0.78);
        }

        .research-modal-image--contain {
          object-fit: contain;
          object-position: center center;
        }

        .research-detail-note {
          margin-top: 1.3rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          border-radius: 1.35rem;
          background: rgb(255 255 255 / 0.05);
          padding: 1rem 1.1rem;
          font-size: 0.98rem;
          line-height: 1.72;
          color: rgb(255 255 255 / 0.74);
        }

        .research-modal-visual {
          min-height: 30rem;
        }

        .research-modal-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1rem 1rem 1rem 0.4rem;
        }

        .research-modal-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .research-modal-note {
          margin-top: 1.4rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          border-radius: 1.35rem;
          background: rgb(255 255 255 / 0.05);
          padding: 1rem 1.1rem;
          font-size: 0.96rem;
          line-height: 1.75;
          color: rgb(255 255 255 / 0.74);
        }

        .pillars-container {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
          margin-top: 0;
          margin-bottom: 0;
          padding: 0.25rem 0 0.25rem;
          width: 100%;
          flex: 1;
          min-height: 0;
          max-height: calc(100vh - 92px - 8.25rem);
        }

        .pillar-wrap {
          flex: 1;
          display: flex;
          align-items: stretch;
          min-width: 0;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pillar-wrap:hover {
          transform: translateY(-8px);
        }

        .pillar {
          width: 100%;
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: clamp(0.9rem, 1.45vw, 1.25rem);
          border-radius: 2rem;
          border: 1px solid rgb(255 255 255 / 0.16);
          background:
            linear-gradient(135deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.02)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.15), transparent 45%);
          backdrop-filter: blur(28px) saturate(140%);
          box-shadow: 
            0 24px 48px rgb(0 0 0 / 0.25),
            inset 0 1px 0 rgb(255 255 255 / 0.25),
            inset 0 0 20px rgb(255 255 255 / 0.05);
          overflow: hidden;
        }

        .pillar-wrap-center .pillar {
          border-color: rgb(255 255 255 / 0.25);
          background:
            linear-gradient(135deg, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.22), transparent 50%);
          box-shadow: 
            0 32px 64px rgb(0 0 0 / 0.3),
            inset 0 1px 0 rgb(255 255 255 / 0.35),
            inset 0 0 24px rgb(255 255 255 / 0.1);
        }

        .pillar-slides-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          min-height: 0;
        }

        .pillar-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
          min-height: 0;
          gap: 0.45rem;
        }

        .pillar-text-wrap {
          flex: 0 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 0;
        }

        .pillar-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 0.95rem;
        }

        .pillar-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 6.6rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.16);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 60%);
          padding: 0.58rem 0.9rem;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: rgb(255 255 255 / 0.86);
          backdrop-filter: blur(18px) saturate(135%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 12px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .pillar-action:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.22);
          color: white;
        }

        .pillar-action-disabled {
          opacity: 0.68;
          cursor: default;
        }

        .pillar-logo-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 0.1rem;
          margin-bottom: 0.55rem;
          justify-content: center;
          max-width: 100%;
        }

        .pillar-logo-chip {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1.08rem;
          border: 1px solid rgb(255 255 255 / 0.18);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.2), rgb(255 255 255 / 0.06)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.16), transparent 60%);
          backdrop-filter: blur(14px) saturate(135%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.26),
            0 10px 22px rgb(0 0 0 / 0.08);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.28rem;
        }

        .pillar-gallery-wrap {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          width: 100%;
          margin-bottom: 0;
          min-height: 0;
        }

        .pillar-image-wrap {
          width: 100%;
          height: min(100%, clamp(14.75rem, 31vh, 21rem));
          max-height: 100%;
          border-radius: 2.8rem;
          overflow: visible;
          position: relative;
          border: none;
          background: transparent;
          flex-shrink: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .pillar-image {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center center;
          border-radius: 2.8rem;
          background: transparent;
          box-shadow: 0 12px 28px rgb(0 0 0 / 0.12);
          filter: saturate(1.02) contrast(1.03);
          mask-image: radial-gradient(ellipse 94% 92% at center, black 58%, rgb(0 0 0 / 0.92) 76%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 94% 92% at center, black 58%, rgb(0 0 0 / 0.92) 76%, transparent 100%);
        }

        .pillar-image--cs4all {
          max-width: 88%;
        }


        .pillar-image-wash {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at center, transparent 42%, rgb(255 255 255 / 0.05) 70%, transparent 100%),
            linear-gradient(
              to bottom,
              rgb(255 255 255 / 0.08) 0%,
              rgb(255 255 255 / 0.03) 10%,
              transparent 26%,
              transparent 74%,
              rgb(9 11 20 / 0.12) 88%,
              rgb(9 11 20 / 0.34) 100%
            ),
            linear-gradient(
              to right,
              rgb(255 255 255 / 0.06) 0%,
              rgb(255 255 255 / 0.02) 10%,
              transparent 24%,
              transparent 76%,
              rgb(9 11 20 / 0.1) 90%,
              rgb(9 11 20 / 0.28) 100%
            );
          filter: blur(24px);
          mix-blend-mode: screen;
          opacity: 0.98;
          pointer-events: none;
        }

        .pillar-tabs {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.95rem;
          padding-bottom: 0.1rem;
          flex-shrink: 0;
          width: 100%;
          justify-content: center;
        }

        .pillar-tab {
          flex: 1;
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.06);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgb(255 255 255 / 0.6);
          transition: all 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pillar-tab:hover {
          background: rgb(255 255 255 / 0.12);
          border-color: rgb(255 255 255 / 0.25);
          color: rgb(255 255 255 / 0.9);
        }

        .pillar-tab-active {
          background: rgb(255 255 255 / 0.18);
          border-color: rgb(255 255 255 / 0.36);
          color: white;
          font-weight: 600;
        }

        .pillar-title-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          max-width: 100%;
          flex-wrap: nowrap;
        }

        .pillar-title-media {
          width: auto;
          height: clamp(2.7rem, 3vw, 3.35rem);
          flex-shrink: 0;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgb(0 0 0 / 0.12));
        }

        .pillar-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.6rem, 2vw, 2.2rem);
          color: white;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .pillar-title-large {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 2.65vw, 2.9rem);
          color: white;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .pillar-title-row .pillar-title,
        .pillar-title-row .pillar-title-large {
          margin-bottom: 0;
          white-space: nowrap;
        }

        .pillar-title-row + .pillar-copy,
        .pillar-title-row + .pillar-copy-large {
          margin-top: 0.8rem;
        }

        .pillar-copy {
          font-size: clamp(0.9rem, 0.95vw, 1rem);
          color: rgb(255 255 255 / 0.76);
          line-height: 1.5;
        }

        .pillar-copy-large {
          font-size: clamp(0.96rem, 1vw, 1.08rem);
          color: rgb(255 255 255 / 0.82);
          line-height: 1.5;
        }

        .projects-page-shell {
          flex: 1;
          min-height: 0;
          height: 100%;
          width: 100%;
          max-width: none;
          margin-inline: auto;
          display: grid;
          align-items: stretch;
        }

        .projects-page-container {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        @media (min-width: 1024px) {
          .projects-page-container {
            flex-direction: row;
            gap: 2rem;
            align-items: stretch;
          }

          .projects-page-content {
            flex: 0 0 61%;
            min-width: 0;
          }

          .projects-page-aside {
            flex: 1;
            min-width: 0;
            display: flex;
          }
        }

        .projects-page-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(3, minmax(0, 1fr));
          gap: clamp(0.6rem, 0.8vw, 1rem);
          width: 100%;
          height: 100%;
          min-height: 0;
          contain: layout style;
        }

        .projects-page-card-slot {
          min-height: 0;
          height: 100%;
        }

        .projects-page-card {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          gap: 0.6rem;
          height: 100%;
          min-height: 0;
          padding: clamp(0.8rem, 1vw, 1.1rem);
          border-radius: 1.5rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.12), transparent 40%);
          text-align: center;
          contain: layout style paint;
        }

        .projects-page-card-optimized {
          border: 1px solid rgb(255 255 255 / 0.1);
          transition: transform 0.2s ease-out, border-color 0.2s ease-out;
          transform: translateZ(0);
        }

        .projects-page-card-optimized:hover {
          transform: translateY(-6px) translateZ(0);
          border-color: rgb(255 255 255 / 0.2);
        }

        .projects-page-card-topline,
        .projects-page-card-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .projects-page-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background: rgb(255 255 255 / 0.08);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.74);
        }

        .projects-page-index {
          font-size: 0.76rem;
          letter-spacing: 0.16em;
          color: rgb(255 255 255 / 0.5);
        }

        .projects-page-card-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.3rem, 1.6vw, 1.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: white;
          text-wrap: balance;
          margin-top: 0;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .projects-page-card-body {
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 0.7rem;
          min-height: 0;
        }

        .projects-page-card-hook {
          font-size: clamp(0.75rem, 0.9vw, 0.85rem);
          line-height: 1.4;
          color: rgb(255 255 255 / 0.7);
          max-width: 28ch;
          margin-top: 0;
          margin-bottom: 0.6rem;
        }

        .projects-stats-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          width: 100%;
          margin-top: 0.5rem;
        }

        .projects-stats-grid--research {
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
        }

        .projects-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }

        .projects-stat-value {
          font-family: "Clash Display", sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.3rem);
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .projects-stat-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgb(255 255 255 / 0.45);
          text-transform: uppercase;
          line-height: 1.2;
        }

        .projects-page-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 2.1rem;
          padding: 0.5rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.1);
          color: rgb(255 255 255 / 0.88);
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .projects-page-card-link:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.22);
          color: white;
        }

        /* ── Toggle bar ─────────────────────────────────── */
        .projects-toggle-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
          padding: 0.25rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.08), rgb(255 255 255 / 0.03)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          backdrop-filter: blur(18px) saturate(135%);
          width: fit-content;
          margin-inline: auto;
        }

        .projects-toggle-btn {
          padding: 0.38rem 1rem;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.5);
          transition: all 0.22s ease;
          cursor: pointer;
        }

        .projects-toggle-btn:hover {
          color: rgb(255 255 255 / 0.8);
          background: rgb(255 255 255 / 0.06);
        }

        .projects-toggle-btn-active {
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.08));
          border-color: rgb(255 255 255 / 0.2);
          color: white;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 4px 12px rgb(0 0 0 / 0.1);
        }

        /* ── V2 card grid ───────────────────────────────── */
        .projects-page-grid-v2 {
          display: grid;
          gap: clamp(0.75rem, 1.2vw, 1.25rem);
          width: 100%;
          min-height: 0;
          contain: layout style;
        }

        .projects-page-grid-v2--four {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: auto;
        }

        .projects-page-grid-v2--three {
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: auto;
        }

        .projects-page-grid-v2--three > .projects-v2-card-slot:last-child {
          grid-column: span 2;
          width: calc(50% - 0.625rem); /* Matches column width minus half the gap */
          margin-inline: auto;
        }

        .projects-v2-card-slot {
          min-height: 0;
          height: auto;
        }

        .projects-v2-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: auto;
          min-height: 0;
          padding: 0.85rem 1rem;
          border-radius: 1.5rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.12), transparent 40%);
          contain: layout style paint;
          gap: 0.6rem;
        }

        .projects-v2-card-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 0.25rem;
          flex: 0 0 auto;
        }

        .projects-v2-card-header-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
        }

        .projects-v2-card-header-row .projects-page-card-title {
          margin-bottom: 0;
          font-size: 1.15rem;
        }

        .projects-v2-card-link-mini {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          color: rgb(255 255 255 / 0.8);
          transition: all 0.2s ease;
        }

        .projects-v2-card-link-mini:hover {
          background: rgb(255 255 255 / 0.16);
          border-color: rgb(255 255 255 / 0.25);
          color: white;
          transform: translateY(-1px);
        }

        .projects-page-card-subtitle {
          font-size: 0.72rem;
          font-weight: 400;
          color: rgb(255 255 255 / 0.5);
          line-height: 1.4;
          max-width: 44ch;
          margin: 0;
        }

        .projects-stats-row-inline {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 0.15rem;
        }

        .projects-stat-item-mini {
          display: flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .projects-stat-value-mini {
          font-size: 0.68rem;
          font-weight: 700;
          color: rgb(255 255 255 / 0.9);
        }

        .projects-stat-label-mini {
          font-size: 0.55rem;
          font-weight: 600;
          color: rgb(255 255 255 / 0.4);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .projects-v2-card-visual {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          flex: 0 0 auto;
        }

        .projects-v2-card-visual-inner {
          position: relative;
          border-radius: 0.85rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          background: rgb(0 0 0 / 0.2);
          overflow: hidden;
          box-shadow: 
            0 8px 24px rgb(0 0 0 / 0.15),
            inset 0 1px 0 rgb(255 255 255 / 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .projects-v2-card-img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 12rem;
          object-fit: contain;
          display: block;
        }

        .projects-v2-card-img-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 70%, rgb(9 11 20 / 0.2) 100%);
          pointer-events: none;
        }

        .contact-page-shell {
          flex: 1;
          min-height: 0;
          height: 100%;
          width: min(100%, 98rem);
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
          gap: clamp(1.2rem, 2vw, 2rem);
          align-items: stretch;
        }

        .contact-page-visual-column,
        .contact-page-panel-column {
          min-height: 0;
          display: grid;
          align-items: center;
        }

        .contact-photo-shell {
          display: grid;
          place-items: center;
          min-height: 0;
          height: 100%;
          padding: clamp(1rem, 2vw, 1.5rem);
        }

        .contact-photo-frame {
          position: relative;
          display: grid;
          place-items: center;
          width: min(100%, 30rem);
          height: min(100%, 36rem);
          border-radius: 3rem;
          overflow: hidden;
          isolation: isolate;
        }

        .contact-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 3rem;
          filter: saturate(1.03) contrast(1.02);
          mask-image: radial-gradient(circle at center, black 45%, rgb(0 0 0 / 0.94) 68%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 45%, rgb(0 0 0 / 0.94) 68%, transparent 100%);
        }

        .contact-photo-wash {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at center, transparent 42%, rgb(255 255 255 / 0.06) 68%, transparent 100%),
            linear-gradient(
              to bottom,
              rgb(255 255 255 / 0.05) 0%,
              transparent 18%,
              transparent 82%,
              rgb(9 11 20 / 0.16) 100%
            ),
            linear-gradient(
              to right,
              rgb(255 255 255 / 0.04) 0%,
              transparent 16%,
              transparent 84%,
              rgb(9 11 20 / 0.14) 100%
            );
          filter: blur(20px);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .contact-panel {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          gap: 1.4rem;
          min-height: 0;
          height: 100%;
          padding: clamp(1.25rem, 1.7vw, 1.65rem);
          border-radius: 2.2rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.16), transparent 38%);
        }

        .contact-panel-header {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.75rem;
        }

        .contact-panel-kicker {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          min-height: 2rem;
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 58%);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.74);
          backdrop-filter: blur(16px);
        }

        .contact-panel-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 2.6vw, 3rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: white;
          text-wrap: balance;
        }

        .contact-panel-copy {
          max-width: 58ch;
          font-size: clamp(0.98rem, 1vw, 1.08rem);
          line-height: 1.7;
          color: rgb(255 255 255 / 0.74);
        }

        .contact-button-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: clamp(0.85rem, 1vw, 1.25rem);
          align-content: center;
          min-height: 0;
        }

        .contact-button-tile:nth-child(-n+3) {
          grid-column: span 4;
        }
        .contact-button-tile:nth-child(n+4) {
          grid-column: span 3;
        }

        .contact-button-tile {
          position: relative;
          z-index: 1;
          display: grid;
          justify-items: center;
          align-content: center;
          gap: 0.8rem;
          min-height: 0;
          padding: clamp(0.85rem, 1.2vw, 1.05rem);
          border-radius: 1.5rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.1), transparent 58%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 14px 28px rgb(0 0 0 / 0.08);
          backdrop-filter: blur(18px);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .contact-button-tile:hover {
          transform: translateY(-2px) scale(1.01);
          border-color: rgb(255 255 255 / 0.22);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 20px 32px rgb(0 0 0 / 0.1);
        }

        .contact-button-image-shell {
          display: grid;
          place-items: center;
          width: clamp(3.7rem, 5vw, 4.8rem);
          aspect-ratio: 1;
          border-radius: 1.2rem;
          background: transparent;
          border: none;
          overflow: hidden;
        }

        .contact-button-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.2rem;
          background: transparent;
          filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.12));
        }

        .contact-button-label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.8);
          text-align: center;
        }

        @media (max-width: 767px) {
          .nav-links {
            display: none;
          }

          .nav-palette-controls {
            display: none;
          }

          .nav-mobile-palettes {
            display: grid;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-copy-column {
            padding-left: 0;
          }

          .hero-title {
            font-size: clamp(4.4rem, 15vw, 6.5rem);
          }

          .hero-subtext {
            font-size: clamp(1.05rem, 4.2vw, 1.25rem);
          }

          .hero-portrait-shell {
            width: min(78vw, 24rem);
            min-width: auto;
          }

          .hero-portrait-mask {
            height: min(48vh, 28rem);
          }

          .research-editorial-panel,
          .research-modal-grid,
          .research-detail-grid,
          .research-detail-grid--chamtern,
          .research-detail-grid--neuro,
          .research-detail-grid--phytovision,
          .research-detail-grid--sentinel {
            grid-template-columns: 1fr;
          }

          .research-card-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            height: auto;
          }


          .research-card {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }

          .research-card-image-wrap,
          .research-card-body {
            grid-column: 1;
          }

          .research-card-image-wrap {
            grid-row: 1;
          }

          .research-card-body {
            grid-row: 2;
          }

          .research-modal {
            padding: 1rem;
          }

          .research-detail-visual {
            min-height: 16rem;
          }

          .research-modal-backdrop {
            padding: 1rem;
          }

          .pillars-container {
            flex-direction: column;
            gap: 1.25rem;
            margin-top: 1rem;
            padding: 0.5rem 0;
            max-height: none;
          }

          .pillar-wrap {
            width: 100%;
            max-width: 100%;
            align-items: center;
          }

          .pillar-wrap:hover {
            transform: translateY(-6px);
          }

          .pillar-wrap-left .pillar,
          .pillar-wrap-right .pillar,
          .pillar-wrap-center .pillar {
            height: auto;
            min-height: 14rem;
            margin-top: 0;
            padding: 1.5rem;
          }

          .pillar-image-wrap {
            height: min(100%, clamp(10.75rem, 40vw, 16rem));
          }

          .projects-page-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, minmax(0, 1fr));
          }

          .projects-page-grid-v2--four,
          .projects-page-grid-v2--three {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            height: auto;
          }

          .projects-v2-card-visual {
            max-height: 12rem;
          }

          .contact-page-shell {
            grid-template-columns: 1fr;
            grid-template-rows: auto minmax(0, 1fr);
            gap: 1rem;
          }

          .contact-photo-shell {
            padding: 0.25rem 0 0;
            height: auto;
          }

          .contact-photo-frame {
            width: min(78vw, 19rem);
            height: min(36vh, 19rem);
          }

          .contact-panel {
            padding: 1rem;
          }

          .contact-button-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }

        }

        @media (min-width: 768px) and (max-width: 1180px) {
          .projects-page-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(3, minmax(0, 1fr));
          }

          .contact-page-shell {
            grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          }

          .contact-button-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  )
}
