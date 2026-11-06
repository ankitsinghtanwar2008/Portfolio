"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import HCaptcha from "@hcaptcha/react-hcaptcha"; // hCaptcha import kiya

const InteractiveMap = () => {
  return (
    <div className="contact-map-container">
       <div className="map-image-wrapper">
         <div className="map-fade-overlay"></div>
         <img src="/images/world-map.png" alt="World Map" className="world-map-image" />
         
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
  const [toastMessage, setToastMessage] = useState("");
  
  // Captcha token state
  const [captchaToken, setCaptchaToken] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Captcha validation check
    if (!captchaToken) {
      setStatus("Error: Please solve the Captcha first!");
      return;
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // YAHAN APNI WEB3FORMS KI ACCESS KEY DAALNA
    formData.append("access_key", "13a362e5-db95-48d2-9770-64acf9b02521"); 
    
    // Backend ko Captcha response bhejna
    formData.append("h-captcha-response", captchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        form.reset();
        setCaptchaToken(""); // Captcha clear karna
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

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage(`${type} Copied!`);
    
    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };

  const onHCaptchaChange = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div className="contact-page-wrapper">
      
      <style dangerouslySetInnerHTML={{__html: `
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
        .copy-link {
          background: none;
          border: none;
          color: inherit;
          font: inherit;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }
        .copy-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }
        .social-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          color: #a3a29b;
          transition: all 0.3s ease;
          background: transparent;
        }
        .social-circle:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.3);
          color: #ffffff;
          transform: translateY(-2px);
        }
      `}} />

      {toastMessage && (
        <div className="toast-popup">
          <CheckCircle2 size={16} color="#000" />
          {toastMessage}
        </div>
      )}

      <section className="contact-section pt-32">
        <div className="contact-container">
          
          <div className="contact-info-panel">
            <div className="contact-icon-wrapper">
              <Mail size={20} color="#3b82f6" strokeWidth={2.5} />
              <div className="icon-glow"></div>
            </div>
            
            <h2 className="contact-title">Contact us</h2>
            
            <p className="contact-description">
              Send a direct inquiry through this form. Every message sent from here is delivered straight to my personal inbox. Whether you have a project in mind, a collaboration proposal, or just want to say hello, I'd love to hear from you.
            </p>
            
            {/* EMAIL, PHONE, AND SOCIAL ICONS ALL IN ONE ROW */}
            <div className="contact-details" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <button 
                onClick={() => handleCopy("ankitsinghtanwar2008@gmail.com", "Mail")}
                className="copy-link"
                title="Click to copy email"
              >
                ankitsinghtanwar2008@gmail.com
              </button>
              
              <span className="dot-separator">•</span>
              
              <button 
                onClick={() => handleCopy("7851056138", "Contact No.")}
                className="copy-link"
                title="Click to copy phone number"
              >
                +91 7851056138
              </button>

              <span className="dot-separator" style={{ margin: '0 4px', opacity: 0.5 }}>|</span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a 
                  href="https://www.linkedin.com/in/ankit-singh-71a6a133a/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-circle"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                </a>
                <a 
                  href="https://github.com/ankitsinghtanwar2008" 
                  target="_blank" 
                  rel="noreferrer"
                  className="social-circle"
                  title="GitHub Profile"
                >
                  <Github size={14} />
                </a>
              </div>
            </div>

            <InteractiveMap />
          </div>

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

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number <span className="optional-text">(Optional)</span></label>
                <input type="tel" id="mobile" name="mobile" placeholder="+91 00000 00000" />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company <span className="optional-text">(Optional)</span></label>
                <input type="text" id="company" name="company" placeholder="Aceternity Labs LLC" />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" placeholder="Type your message here" rows={5} required ></textarea>
              </div>

              {/* hCaptcha Integration - Submit Button ke upar */}
              <div className="form-group" style={{ marginBottom: "20px" }}>
                <HCaptcha
                  sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                  reCaptchaCompat={false}
                  onVerify={onHCaptchaChange}
                  theme="dark"
                />
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