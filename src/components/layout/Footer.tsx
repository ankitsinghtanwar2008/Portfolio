"use client";

import { site } from '@/data/site';

export default function Footer() { 
  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Left Side - Logo & Copyright */}
        <div className="footer-left">
          <span className="footer-logo">AS</span> {/* AS for Ankit Singh */}
          <span className="copyright">
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
        
        {/* Center - Tagline */}
        <div className="footer-center">
          <span>DESIGNED WITH INTENT. BUILT WITH CODE.</span>
        </div>
        
        {/* Right Side - Back to top */}
        <div className="footer-right">
          <a href="#top" className="back-to-top">
            BACK TO TOP <span className="arrow">↑</span>
          </a>
        </div>

      </div>
    </footer>
  ); 
}