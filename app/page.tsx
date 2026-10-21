"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    title: "Real-Time Social Styling Platform",
    tag: "HACKMIT",
    description:
      "Real-time outfit styling app built with Next.js, TypeScript, and Supabase. Friends co-edit outfit boards live, with product images, prices, and categories scraped automatically from pasted links.",
    tools: "Next.js · TypeScript · Supabase"
  },
  {
    title: "Habit and Progress Analytics App",
    tag: "FIDELITY HACKATHON · 2ND OF 10",
    description:
      "Daily progress logs in your own words. Groq detects the skills you are building, and a dashboard shows growth over time with setbacks included.",
    tools: "AI · Analytics · Product"
  },
  {
    title: "Astronomical Data Visualization Tool",
    tag: "DATA VISUALIZATION",
    description:
      "Interactive map of the 20 nearest stars to Earth, built with React and D3.js, with a data pipeline scraped using Python and BeautifulSoup.",
    tools: "React · D3.js · Python · BeautifulSoup"
  }
];

const experience = [
  ["SEP 2026 — PRESENT", "Full Stack Software Developer", "SGA, Northeastern", "Next.js · TypeScript · Prisma", "Building a drag-and-drop editor so non-technical webmasters can update the SGA site without code."],
  ["SEP 2026 — PRESENT", "Radio Astronomy Software Developer", "ORCAS Northeastern", "Python · Skyfield · Astropy", "Python software on Linux that calculates where to aim a radio telescope in real time."],
  ["APR 2026 — PRESENT", "AI Data Lineage Researcher", "AI Provenance Index · CAMD and BarabasiLab", "Research · AI ethics · Web", "Research on how AI training data gets cited and credited, plus the project’s public webpage."]
];

const courses = [
  "Machine Learning",
  "Principles of Artificial Intelligence",
  "Program Design and Implementation",
  "Algorithms and Data",
  "Theory of Computation",
  "Foundations of Data Science",
  "Foundations of Cybersecurity"
];

function Line({ children, number, className = "" }: { children?: React.ReactNode; number: string; className?: string }) {
  return <div className={`terminal-line ${className}`}><span className="line-number">{number}</span><div className="line-content">{children}</div></div>;
}

function Command({ children, number }: { children: React.ReactNode; number: string }) {
  return <Line number={number} className="command-line"><span className="prompt">&gt;</span>{children}</Line>;
}

function Tab({ href, number, label, active = false }: { href: string; number: string; label: string; active?: boolean }) {
  return <a className={`tab ${active ? "active" : ""}`} href={href}><span>{number}</span>{label}</a>;
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(true);
  const [activeSection, setActiveSection] = useState("about");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(window.localStorage.getItem("portfolio-theme") === "dark");
    const closeHelp = () => setShowHelp(false);
    let gTimer: number | undefined;
    let gPending = false;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "?" || event.key === "Escape" || event.key == "Enter") {
        setShowHelp((visible) => !visible);
        return;
      }

      if (event.key === "j" || event.key === "ArrowDown") {
        event.preventDefault();
        window.scrollBy({ top: 260, behavior: "smooth" });
      }
      if (event.key === "k" || event.key === "ArrowUp") {
        event.preventDefault();
        window.scrollBy({ top: -260, behavior: "smooth" });
      }
      if (event.key === "g") {
        if (gPending) {
          if (gTimer) window.clearTimeout(gTimer);
          gTimer = undefined;
          gPending = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          gPending = true;
          gTimer = window.setTimeout(() => {
            gPending = false;
            gTimer = undefined;
          }, 300);
        }
      }
      if (event.key === "G") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }
      const tabs: Record<string, string> = {
        "1": "about",
        "2": "experience",
        "3": "projects",
        "4": "contact",
        "5": "coursework"
      };
      if (tabs[event.key]) {
        setActiveSection(tabs[event.key]);
        document.getElementById(tabs[event.key])?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("click", closeHelp);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      if (gTimer) window.clearTimeout(gTimer);
      window.removeEventListener("click", closeHelp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const navigateTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className={`terminal-shell ${darkMode ? "dark-mode" : ""}`}>
      {showHelp && (
        <div className="help-backdrop" onClick={() => setShowHelp(false)}>
          <section className="help-popup" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="help-title">
            <button className="help-close" onClick={() => setShowHelp(false)} aria-label="Close navigation guide">×</button>
            <p className="help-kicker">WELCOME TO ZIANA&apos;S PORTFOLIO</p>
            <h2 id="help-title">navigate like vim<span className="cursor">_</span></h2>
            <div className="key-list">
              <p><kbd>j</kbd><kbd>k</kbd><span>scroll down / up</span></p>
              <p><kbd>g g</kbd><kbd>G</kbd><span>go to top / bottom</span></p>
              <p><kbd>1–5</kbd><span>switch sections</span></p>
              <p><kbd>?</kbd><span>open this guide again</span></p>
            </div>
            <p className="help-mouse"><span>&gt;</span> or use the mouse</p>
            <button className="help-start" onClick={() => setShowHelp(false)}>start exploring ↵</button>
          </section>
        </div>
      )}
      <header className="topbar">
        <div className="tab-index">[ZM]</div>
        <nav>
          <a className={`tab ${activeSection === "about" ? "active" : ""}`} href="#about" onClick={() => navigateTo("about")}><span>1:</span>STAT</a>
          <a className={`tab ${activeSection === "experience" ? "active" : ""}`} href="#experience" onClick={() => navigateTo("experience")}><span>2:</span>PERKS</a>
          <a className={`tab ${activeSection === "projects" ? "active" : ""}`} href="#projects" onClick={() => navigateTo("projects")}><span>3:</span>INV</a>
          <a className={`tab ${activeSection === "contact" ? "active" : ""}`} href="#contact" onClick={() => navigateTo("contact")}><span>4:</span>COMMS</a>
          <a className={`tab ${activeSection === "coursework" ? "active" : ""}`} href="#coursework" onClick={() => navigateTo("coursework")}><span>5:</span>DATA</a>
        </nav>
        <div className="top-actions">
          <a href="https://github.com/zianam" target="_blank" rel="noreferrer">GH</a>
          <a href="https://www.linkedin.com/in/zianamerchant" target="_blank" rel="noreferrer">in</a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => {
              const nextMode = !darkMode;
              setDarkMode(nextMode);
              window.localStorage.setItem("portfolio-theme", nextMode ? "dark" : "light");
            }}
          >
            <span aria-hidden="true">{darkMode ? "☼" : "☾"}</span>
          </button>
        </div>
      </header>

      <div className="terminal-body">
        <div className="terminal-title"><span className="cursor-block" /> ziana_merchant<span className="blink">_</span></div>
        <Line number="1" />
        <Line number="2" className="subtitle">Computer Science · Data · AI · Product</Line>
        <Line number="3" />
        <Command number="4"><button className="command-button" onClick={() => navigateTo("about")}>whoami</button></Command>
        <Line number="5" />
        <section id="about" className="readout intro-readout">
          <Line number="6"><h1>Hello! I&apos;m Ziana, a Computer Science student at Northeastern University.</h1></Line>
          <Line number="7"><p>I&apos;m interested in software engineering, data, AI, and biotech.</p></Line>
          <Line number="8"><p>Currently looking for a co-op from <mark>January to June 2027</mark>.</p></Line>
        </section>

        <Line number="9" />
        <Command number="10"><button className="command-button" onClick={() => navigateTo("coursework")}>cat education.txt</button></Command>
        <Line number="11" />
        <section className="readout education-readout">
          <Line number="12"><span className="label">DEGREE</span> BS Computer Science, concentration AI</Line>
          <Line number="13"><span className="label">SCHOOL</span> Northeastern University</Line>
          <Line number="15"><span className="label">GRADUATION</span> Expected April 2029</Line>
        </section>

        <Line number="16" />
        <Command number="17"><button className="command-button" onClick={() => navigateTo("projects")}>ls ./projects</button></Command>
        <Line number="18" />
        <section id="projects" className="project-readout">
          {projects.map((project, index) => (
            <article className="project-terminal-card" key={project.title}>
              <div className="project-number">0{index + 1}</div>
              <div>
                <p className="card-tag">{project.tag}</p>
                <h2>{project.title}</h2>
                <p className="card-description">{project.description}</p>
                <p className="card-tools">{project.tools}</p>
              </div>
            </article>
          ))}
        </section>

        <Line number="19" />
        <Command number="20"><button className="command-button" onClick={() => navigateTo("experience")}>cat experience.log</button></Command>
        <Line number="21" />
        <section id="experience" className="experience-readout">
          {experience.map(([date, role, org, tools, description]) => (
            <article className="experience-entry" key={role}>
              <p className="entry-date">{date}</p>
              <div><h2>{role}</h2><p className="entry-org">{org}</p><p>{description}</p></div>
              <span className="entry-tools">{tools}</span>
            </article>
          ))}
        </section>

        <Line number="22" />
        <Command number="23"><button className="command-button" onClick={() => navigateTo("coursework")}>grep -r &quot;coursework&quot; ./data</button></Command>
        <Line number="24" />
        <section id="coursework" className="coursework-readout">
          {courses.map((course, index) => <p key={course}><span>{String(index + 1).padStart(2, "0")}</span>{course}</p>)}
        </section>

        <Line number="25" />
        <Command number="26"><button className="command-button" onClick={() => navigateTo("contact")}>cat goals.md</button></Command>
        <Line number="27" />
        <section className="goals-readout">
          <p><span>01</span> Land a six-month co-op in software engineering, data, AI, product, or biotech/healthcare.</p>
          <p><span>02</span> Keep building at the edges: CS plus astronomy, CS plus AI ethics, CS plus healthcare.</p>
          <p><span>03</span> Long term: build products with the audience from the start, not after the fact.</p>
        </section>

        <Line number="28" />
        <Command number="29"><button className="command-button" onClick={() => navigateTo("contact")}>echo $CONTACT</button></Command>
        <Line number="30" />
        <footer id="contact" className="contact-readout">
          <h2>Let&apos;s make something meaningful.</h2>
          <a href="mailto:merchantziana@gmail.com">merchantziana@gmail.com <span>↗</span></a>
          <a href="https://github.com/zianam" target="_blank" rel="noreferrer">github.com/zianam <span>↗</span></a>
          <a href="https://www.linkedin.com/in/zianamerchant" target="_blank" rel="noreferrer">linkedin.com/in/zianamerchant <span>↗</span></a>
        </footer>
        <Line number="31" />
        <div className="terminal-footer"><span>ziana@portfolio:~$</span> made with curiosity ✦</div>
      </div>
    </main>
  );
}
