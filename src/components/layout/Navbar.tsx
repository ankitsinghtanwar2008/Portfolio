"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Linkedin, Github, Mail, Phone, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { gsap } from "@/lib/gsap";

const navItems = [
  { label: "ABOUT", href: "/#about" },
  { label: "WORK", href: "/#work" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "TECH SKILLS", href: "/#technical" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  // Pop-up (Toast) show karne ke liye state
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems
        .map((item) => document.querySelector(item.href.replace('/', '')))
        .filter(Boolean);

      let current = "";

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 160) {
            current = `/#${section.id}`;
          }
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const ctx = gsap.context(() => {
      gsap.from(".site-nav > *", {
        y: -18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  // Copy to clipboard function
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${type} Copied!`);
    
    // 2.5 seconds baad pop-up gayab ho jayega
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .dropdown-container {
          position: relative;
          display: inline-block;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 8px;
          min-width: 240px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100;
        }
        .dropdown-container:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #a3a29b;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
          width: 100%;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }
        .dropdown-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .dropdown-header {
          padding: 8px 16px;
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 4px;
        }

        /* Pop-up Toast CSS */
        .toast-popup {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #ffffff;
          color: #000000;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />

      {/* Jab message set hoga tabhi ye Pop-up dikhega */}
      {toastMessage && (
        <div className="toast-popup">
          <CheckCircle2 size={16} color="#000" />
          {toastMessage}
        </div>
      )}

      <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          AS<span>.</span>
        </Link>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}

          {/* Social Hover Dropdown */}
          <div className="dropdown-container">
            <span style={{ cursor: "pointer", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#a3a29b", transition: "color 0.2s" }} className="hover:text-white">
              SOCIAL ▾
            </span>
            <div className="dropdown-menu" style={{ minWidth: "180px" }}>
              <div className="dropdown-header">Profiles</div>
              
              {/* LinkedIN link updated */}
              <a href="https://www.linkedin.com/in/ankit-singh-71a6a133a/" target="_blank" rel="noreferrer" className="dropdown-item">
                <div className="dropdown-icon"><Linkedin size={14} /></div>
                LinkedIn
              </a>
              
              <a href="https://github.com/ankitsinghtanwar2008" target="_blank" rel="noreferrer" className="dropdown-item">
                <div className="dropdown-icon"><Github size={14} /></div>
                GitHub
              </a>
            </div>
          </div>

          {/* Contact Hover Dropdown */}
          <div className="dropdown-container">
            <Link href="/contact" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "#a3a29b", transition: "color 0.2s", textDecoration: "none" }} className="hover:text-white">
              CONTACT ▾
            </Link>
            <div className="dropdown-menu">
              <div className="dropdown-header">Click to Copy</div>
              
              {/* Email Button (Copy on Click) */}
              <button 
                onClick={() => handleCopy("ankitsinghtanwar2008@gmail.com", "Mail")} 
                className="dropdown-item"
              >
                <div className="dropdown-icon"><Mail size={14} /></div>
                ankitsinghtanwar2008@gmail.com
              </button>

              {/* Phone Button (Copy on Click) */}
              <button 
                onClick={() => handleCopy("7851056138", "Contact No.")} 
                className="dropdown-item"
              >
                <div className="dropdown-icon"><Phone size={14} /></div>
                +91 7851056138
              </button>
            </div>
          </div>
        </nav>

        <div className="nav-contact-wrapper">
          <Link className="nav-contact" href="/contact">
            LET&apos;S TALK <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          className="nav-menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-inner">
          <span className="mobile-menu-label">NAVIGATION / 2026</span>
          <nav>
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={20} />
              </Link>
            ))}
            <Link href="/contact" onClick={closeMenu}>
              <span>05</span>
              CONTACT
              <ArrowUpRight size={20} />
            </Link>
          </nav>
          
          <Link href="/contact" className="mobile-menu-contact" onClick={closeMenu}>
            HAVE A PROJECT IN MIND? LET&apos;S TALK
            <ArrowUpRight size={16} />
          </Link>

          <span className="mobile-menu-footer">
            {site.name} © 2026
          </span>
        </div>
      </div>
    </>
  );
}