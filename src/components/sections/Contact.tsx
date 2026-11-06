"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // YAHAN APNI WEB3FORMS KI ACCESS KEY DAALNA
    formData.append("access_key", "3f3ebf59-b866-438d-96a6-559a24fec4b2"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <section className="inquiry-section" id="contact">
      {/* Top right CLOSE button */}
      <div className="inquiry-close">
        <button>CLOSE</button>
      </div>

      <div className="inquiry-grid">
        
        {/* LEFT COLUMN: INQUIRY NOW */}
        <div className="inquiry-left">
          <h2 className="inquiry-title">
            INQUIRY <br /> NOW <span className="title-dot"></span>
          </h2>

          <div className="inquiry-details">
            <div className="detail-block">
              <span className="detail-label">EMAIL</span>
              <a href={`mailto:${site.email}`} className="contact-link">
                {site.email}
              </a>
            </div>
            
            <div className="detail-block">
              <span className="detail-label">PHONE</span>
              <a href="tel:+917851056138" className="contact-link">
                +91 7851056138
              </a>
            </div>

            {/* SOCIAL block */}
            <div className="detail-block">
              <span className="detail-label">SOCIAL</span>
              <div className="social-links" style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                <a 
                  href="https://www.linkedin.com/in/ankit-singh-71a6a133a/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-link social-icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://github.com/ankitsinghtanwar2008" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="contact-link social-icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                >
                  <Github size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: FLAT FORM WITH GRID BACKGROUND */}
        <div className="inquiry-right">
          
          <div className="inquiry-grid-bg"></div>
          
          <div className="form-top-bar">
            <div className="register-interest">
              <span className="dot"></span>
              <span>REGISTER INTEREST</span>
            </div>
            <span>*REQUIRED FIELDS</span>
          </div>

          <form onSubmit={handleSubmit} className="inquiry-form">
            
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="first_name">FIRST NAME*</label>
                <input type="text" id="first_name" name="first_name" required />
              </div>
              <div className="input-group">
                <label htmlFor="last_name">LAST NAME*</label>
                <input type="text" id="last_name" name="last_name" required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="email">EMAIL*</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone">PHONE NUMBER</label>
                <input type="tel" id="phone" name="phone" />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="input-group">
                <label htmlFor="request">REQUEST*</label>
                <textarea id="request" name="request" rows={1} required></textarea>
              </div>
            </div>

            <div className="privacy-checkbox">
              <label>
                <input type="checkbox" name="privacy" className="hidden-checkbox" required />
                <span className="custom-radio"></span>
                <span>
                  I HAVE READ AND ACCEPT THE <a href="#">PRIVACY POLICY</a>.
                </span>
              </label>
            </div>

            {/* Status Message Display */}
            {status && (
              <div className={`status-message ${status}`}>
                {status === "sending" && "Sending message..."}
                {status === "success" && "Message sent successfully!"}
                {status === "error" && "Error sending message. Please try again."}
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              SUBMIT
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}