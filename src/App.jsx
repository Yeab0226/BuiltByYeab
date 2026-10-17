import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState("Full Stack Web Developer");
  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const animate = () => {
      clearTimeout(timer);
      const text = "Full Stack Web Developer";
      setTyped(text);
      if (preference.matches) return;
      let count = 0;
      setTyped("");
      const tick = () => {
        count += 1;
        setTyped(text.slice(0, count));
        if (count < text.length) timer = setTimeout(tick, 85);
      };
      timer = setTimeout(tick, 350);
    };
    animate();
    preference.addEventListener("change", animate);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", animate);
    };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <>
      <nav
        className={`site-nav${scrolled || menuOpen ? " is-scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <a
          className="brand"
          href="#header"
          aria-label="Yeabsira Alemayehu — home"
          onClick={() => setMenuOpen(false)}
        >
          <img src="images/logoM.png" alt="Built by Yeab" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="sidemenu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <ul
          id="sidemenu"
          className={menuOpen ? "is-open" : ""}
          onClick={() => setMenuOpen(false)}
        >
          {["Home", "About", "Services", "Portfolio", "Contact"].map(
            (label) => (
              <li key={label}>
                <a
                  href={`#${label === "Home" ? "header" : label.toLowerCase()}`}
                >
                  {label.toUpperCase()}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div id="header">
        <div className="container hero-content">
          <div className="header-text">
            <p className="hero-role" aria-label="Full Stack Web Developer">
              <span aria-hidden="true">
                {typed}
                <span className="typing-caret">|</span>
              </span>
            </p>
            <h1>
              Hello, I'm{" "}
              <span>
                Yeabsira
                <br />
                Alemayehu
              </span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

function About() {
  const [activeTab, setActiveTab] = useState("skills");
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="about-col-1">
            <img src="images/Developer.png" alt="Developer illustration" loading="lazy" decoding="async" />
          </div>
          <div className="about-col-2">
            <h2 className="sub-title">About Me</h2>
            <p>
              Hello! <br />
              I'm Yeabsira Alemayehu, a passionate Full-Stack Developer who
              enjoys building modern, responsive, and user-friendly web
              applications that solve real-world problems. With a strong
              foundation in frontend and backend development, I'm continuously
              improving my skills, exploring new technologies, and turning ideas
              into practical solutions. I'm committed to writing clean,
              maintainable code and building impactful software that makes a
              difference.
            </p>

            <div className="tab-titles">
              <p
                className={`tab-links${activeTab === "skills" ? " active-link" : ""}`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </p>
              <p
                className={`tab-links${activeTab === "experience" ? " active-link" : ""}`}
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </p>
              <p
                className={`tab-links${activeTab === "education" ? " active-link" : ""}`}
                onClick={() => setActiveTab("education")}
              >
                Education
              </p>
            </div>

            <div
              className={`tab-contents${activeTab === "skills" ? " active-tab" : ""}`}
              id="skills"
            >
              <ul>
                <li>
                  <span>Frontend Development</span>
                  <br />
                  Building interactive, responsive, and user-friendly interfaces
                  using HTML, CSS, JavaScript, and React.
                </li>
                <li>
                  <span>Backend Development</span>
                  <br /> Developing server-side applications, building RESTful
                  APIs, and implementing application logic using Node.js and
                  Express.js.
                </li>
                <li>
                  <span>Database Management</span>
                  <br />
                  Designing database structures and managing application data
                  using MySQL.
                </li>
                <li>
                  <span>Responsive Web Design</span>
                  <br />
                  Creating websites that provide a consistent, accessible
                  experience across mobile phones, tablets, and desktop devices.
                </li>
                <li>
                  <span>API Development & Integration</span>
                  <br />
                  Building and integrating APIs to connect frontend interfaces
                  with backend services and external applications.
                </li>
                <li>
                  <span>Version Control</span>
                  <br />
                  Using Git and GitHub to manage code, track changes, and
                  collaborate effectively on development projects.
                </li>
              </ul>
            </div>

            <div
              className={`tab-contents${activeTab === "experience" ? " active-tab" : ""}`}
              id="experience"
            >
              <ul>
                <li>
                  <span>Junior IS Officer</span>
                  <br />
                  At Commercial Bank of Ethiopia <br />
                  Addis Ababa, Ethiopia
                </li>
                <li>
                  <span>IT Support</span>
                  <br />
                  At Red Stars Holding PLC
                  <br />
                  Addis Ababa, Ethiopia
                </li>
                <li>
                  <span>Functional Consultant</span>
                  <br />
                  At CNET Software Technologies <br />
                  Addis Ababa, Ethiopia
                </li>
                <li>
                  <span>Web and Software developer (Intern)</span>
                  <br />
                  At Ministry of innovation and technology <br />
                  Addis Ababa, Ethiopia
                </li>
              </ul>
            </div>

            <div
              className={`tab-contents${activeTab === "education" ? " active-tab" : ""}`}
              id="education"
            >
              <ul>
                <li>
                  <span>BSc Degree</span>
                  <br />
                  In Electrical and computer engineering (Computer stream){" "}
                </li>
                <li>
                  <span>Full-Stack Web Development</span>
                  <br />
                  Evangadi Networks — AI Powered Full-Stack Development Course
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <div id="services">
      <div className="container">
        <h2 className="sub-title">My Services</h2>
        <div className="services-list">
          <div>
            <i className="fa-solid fa-display"></i>
            <h2>Responsive Web Design</h2>
            <p>
              Create modern, visually appealing, and user-friendly websites that
              adapt seamlessly to desktops, tablets, and mobile devices,
              delivering a consistent experience across all screen sizes.
            </p>
            <a href="/services.html">Learn More</a>
          </div>
          <div>
            <i className="fa-solid fa-crop"></i>
            <h2>
              <br />
              Frontend Development
            </h2>
            <p>
              Build interactive, fast, and engaging user interfaces using modern
              web technologies. Transform designs into functional web
              experiences with clean code, intuitive navigation, and smooth
              interactions.
            </p>
            <a href="/services.html">Learn More</a>
          </div>
          <div>
            <i className="fa-solid fa-code"></i>
            <h2>Full-Stack Web Development</h2>
            <p>
              Develop complete web applications by combining frontend interfaces
              with robust backend systems, database integration, and API
              development to deliver functional, scalable, and maintainable
              solutions.
            </p>
            <a href="/services.html">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolio() {
  const [revealedCard, setRevealedCard] = useState(null);
  const portfolioRef = useRef(null);
  useEffect(() => {
    const dismiss = (event) => {
      if (!portfolioRef.current?.contains(event.target)) setRevealedCard(null);
    };
    const dismissOnEscape = (event) => {
      if (event.key === "Escape") setRevealedCard(null);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismissOnEscape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismissOnEscape);
    };
  }, []);
  return (
    <div id="portfolio" ref={portfolioRef}>
      <div className="container">
        <h2 className="sub-title">My Works</h2>
        <div className="worklist">
          <div
            className={revealedCard === 0 ? "work is-revealed" : "work"}
            tabIndex={0}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") setRevealedCard(0);
            }}
          >
            <img src="images/evangadi-forum.png" alt="Evangadi Forum" loading="lazy" decoding="async" />
            <div className="layer">
              <h3>Evangadi Forum</h3>
              <p>
                A community forum built with React, Node.js, Express, and MySQL,
                featuring Q&A, AI-powered document search, group discussions,
                and private chat.
              </p>
              <a href="https://y-socials.netlify.app/">
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
              <a href="https://github.com/Yeab0226/Social-media-app">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
          <div
            className={revealedCard === 1 ? "work is-revealed" : "work"}
            tabIndex={0}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") setRevealedCard(1);
            }}
          >
            <img src="images/gpt-clone.png" alt="Chat GPT Clone" loading="lazy" decoding="async" />
            <div className="layer">
              <h3>Chat GPT Clone</h3>
              <p>
                An AI chat application with a responsive interface for asking
                questions and receiving conversational answers
              </p>
              <a href="https://guzo.netlify.app/">
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
              <a href="https://github.com/Yeab0226/Guzo--travel-site-">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
          <div
            className={revealedCard === 2 ? "work is-revealed" : "work"}
            tabIndex={0}
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse") setRevealedCard(2);
            }}
          >
            <img src="images/netflix-clone.png" alt="Netflix Clone" loading="lazy" decoding="async" />
            <div className="layer">
              <h3>Netflix Clone</h3>
              <p>
                A responsive Netflix-inspired website featuring movie
                categories, featured titles, and a streaming-style interface.
              </p>
              <a href="https://yeab0226.github.io/Netflix-landing-page-clone/">
                <i className="fa-solid fa-up-right-from-square"></i>
              </a>
              <a href="https://github.com/Yeab0226/Netflix-landing-page-clone">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <a href="/services.html" className="btn">
          See More
        </a>
      </div>
    </div>
  );
}

function Contact() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const submitting = useRef(false);
  async function submitContact(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    submitting.current = true;
    setSending(true);
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error("Send failed");
      setMessage("Thank you! Your message has been sent.");
      form.reset();
    } catch {
      setMessage("Your message could not be sent. Please try again or email Yabsiraalemayehu@gmail.com directly.");
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }
  return (
    <div id="contact">
      <div className="container">
        <div className="row">
          <div className="contact-left">
            <h2 className="sub-title">Contact Me</h2>
            <p>
              <i className="fa-solid fa-paper-plane"></i>
              Yabsiraalemayehu@gmail.com
            </p>
            <p>
              <i className="fa-solid fa-square-phone"></i>+251922455696
            </p>
            <p>
              <i className="fa-solid fa-square-phone"></i>Addis Ababa, Ethiopia
            </p>
            <div className="social-icons">
              <a href="https://github.com/Yeab0226">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="https://wa.me/251922455696">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="https://www.linkedin.com/in/yeab-a-340884309?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="https://t.me/Yeab0226">
                <i className="fa-brands fa-telegram"></i>
              </a>
            </div>
            <a href="images/My cv.pdf" download className="btn btn2">
              Download CV
            </a>
          </div>
          <div className="contact-right">
            <form name="contact" onSubmit={submitContact} aria-busy={sending}>
              <div hidden aria-hidden="true">
                <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <input type="text" name="name" placeholder="Your Name" aria-label="Your name" autoComplete="name" maxLength={100} required />
              <input
                type="email"
                name="email"
                aria-label="Your email"
                autoComplete="email"
                maxLength={254}
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                aria-label="Your message"
                maxLength={5000}
                required
                rows="6"
                placeholder="Your Message"
              ></textarea>
              <button type="submit" className="btn btn2" disabled={sending}>
                {sending ? "Sending…" : "Submit"}
              </button>
            </form>
            <span id="msg" role="status" aria-live="polite">{message}</span>
          </div>
        </div>
      </div>
      <footer className="site-footer">
        <div className="footer-main">
          <div>
            <a className="footer-brand" href="#header">
              Built by Yeab<span>.</span>
            </a>
            <p>Thoughtful design. Practical code. Meaningful experiences.</p>
            <p>Full-stack web developer · Addis Ababa, Ethiopia</p>
          </div>
          <div className="footer-connect">
            <h2>Have an idea? Let's build it.</h2>
            <a href="mailto:Yabsiraalemayehu@gmail.com">
              Start a conversation ↗
            </a>
            <div className="footer-links">
              <a href="https://github.com/Yeab0226">GitHub</a>
              <a href="https://www.linkedin.com/in/yeab-a-340884309">
                LinkedIn
              </a>
              <a href="#portfolio">My work</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Yeabsira Alemayehu. All rights
            reserved.
          </p>
          <a className="back-to-top" href="#header">
            Back to top{" "}
            <span className="back-to-top-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 12 6-6 6 6M12 6v14" />
              </svg>
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}

function Construction() {
  const navigate = useNavigate();
  return (
    <>
      <img src="/New folder/constr.png" className="construct" alt="" />
      <h1>Under construction!</h1>
      <h2>
        Sorry, This webpage is under construction <br /> contents will be
        available soon.
      </h2>
      <button
        onClick={() =>
          window.history.state?.idx > 0 ? navigate(-1) : navigate("/")
        }
      >
        <i className="fa-solid fa-rotate-left"></i> Go Back
      </button>
    </>
  );
}

function PageAppearance() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const construction = pathname === "/services.html";
    document.body.classList.toggle("construction-page", construction);
    document.title = construction ? "Services | BuiltByYeab" : "BuiltByYeab";
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.content = construction || import.meta.env.VITE_PREVIEW === "true" ? "noindex, follow" : "index, follow, max-image-preview:large";
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export function SiteRoutes() {
  return (
    <>
      <PageAppearance />
      <Routes>
        <Route path="/services.html" element={<Construction />} />
        <Route
          path="*"
          element={
            <>
              <Header />
              <main id="main-content">
              <About />
              <Services />
              <Portfolio />
              <Contact />
              </main>
            </>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return <BrowserRouter><SiteRoutes /></BrowserRouter>;
}
