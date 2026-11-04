"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/data/site";
import { gsap } from "@/lib/gsap";

// Dhyan de: Sabme / add kiya hai taaki dusre page se bhi navigate ho sake
const navItems = [
  { label: "ABOUT", href: "/#about" },
  { label: "WORK", href: "/#work" },
  { label: "EXPERIENCE", href: "/#experience" },
  { label: "TECH SKILLS", href: "/#technical" },
  { label: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems
        .map((item) => document.querySelector(item.href.replace('/', '')))
        .filter(Boolean);

      let current = "";

      sections.forEach((section) => {
        const rect = section!.getBoundingClientRect();
        if (rect.top <= 160) {
          current = `/#${section!.id}`;
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

  return (
    <>
      <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          AS<span>.</span>
        </Link>

        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-contact-wrapper">
          {/* Direct naye page pe bhejega */}
          <Link className="nav-contact" href="/contact">
            LET&apos;S TALK <ArrowUpRight size={14} />
          </Link>
          <div className="nav-contact-tooltip">
            Click to navigate to the inquiry page and send a direct message.
          </div>
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