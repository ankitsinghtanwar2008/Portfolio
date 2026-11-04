"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { site } from "@/data/site";
import Link from "next/link";

const InteractiveMap = () => {
  return (
    <div className="contact-map-container">
       <div className="map-image-wrapper">
          {/* Radial mask se map background me blend hoga */}
          <div className="map-fade-overlay"></div>
          <img src="/images/world-map.png" alt="World Map" className="world-map-image" />
          
          {/* Location Marker with beam and glowing dot */}
          <div className="map-marker" style={{ top: '55%', left: '68%' }}>
             <div className="marker-label">We are here</div>
             <div className="marker-beam"></div>
             <div className="marker-dot">
                <div className="marker-pulse"></div>
             </div>
          </div>
       </div>
    </div>
  );
};

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // YAHAN APNI WEB3FORMS KI ACCESS KEY DAALNA
    formData.append("access_key", "13a362e5-db95-48d2-9770-64acf9b02521"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        form.reset();
        setLocation("");
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-section pt-32">
        <div className="contact-container">
          
          {/* Left Side: Info & Map */}
          <div className="contact-info-panel">
            <div className="contact-icon-wrapper">
              <Mail size={20} color="#3b82f6" strokeWidth={2.5} />
              <div className="icon-glow"></div>
            </div>
            
            <h2 className="contact-title">Contact us</h2>
            
            <p className="contact-description">
              Send a direct inquiry through this form. Every message sent from here is delivered straight to my personal inbox. Whether you have a project in mind, a collaboration proposal, or just want to say hello, I'd love to hear from you.
            </p>
            
            <div className="contact-details">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span className="dot-separator">•</span>
              <span>+91 7851056138</span>
            </div>

            <InteractiveMap />
          </div>

          {/* Right Side: Form */}
          <div className="contact-form-panel">
            <div className="form-grid-background"></div>
            <form onSubmit={handleSubmit} className="contact-form">
              
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input type="text" id="name" name="name" placeholder="Manu Arora" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="support@aceternity.com" required />
              </div>

              {/* NAYA FIELD: Mobile Number */}
              <div className="form-group">
                <label htmlFor="mobile">Mobile Number <span className="optional-text">(Optional)</span></label>
                <input type="tel" id="mobile" name="mobile" placeholder="+91 00000 00000" />
              </div>

              {/* COMPANY FIELD (Optional likha hua) */}
              <div className="form-group">
                <label htmlFor="company">Company <span className="optional-text">(Optional)</span></label>
                <input type="text" id="company" name="company" placeholder="Aceternity Labs LLC" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Type your message here" rows={5} required ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Sending..." : "Submit"}
              </button>

              {status && (
                <p className={`form-status ${status.includes("success") ? "success" : "error"}`}>
                  {status}
                </p>
              )}
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}