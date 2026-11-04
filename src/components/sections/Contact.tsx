"use client";

import { useState } from "react";
import { Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    
    // Web3Forms API Key (Apni key yahan daal)
    formData.append("access_key", "3f3ebf59-b866-438d-96a6-559a24fec4b2");
    
    // Taki mail tere paas aaye aur reply seedha user ko ho
    formData.append("subject", "New Inquiry from Portfolio");
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000); // 5 second baad message hide ho jayega
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section className="inquiry-section" id="contact">
      <div className="inquiry-close">
        <button>CLOSE</button>
      </div>

      <div className="inquiry-grid">
        {/* LEFT COLUMN */}
        <div className="inquiry-left">
          <h2 className="inquiry-title">
            INQUIRY<br />NOW
          </h2>

          <div className="inquiry-details">
            <div className="detail-block">
              <span className="detail-label">EMAIL</span>
              <p>
                <a href="mailto:ankitsinghtanwar2008@gmail.com" className="contact-link">
                  ankitsinghtanwar2008@gmail.com
                </a>
              </p>
            </div>

            <div className="detail-block">
              <span className="detail-label">CONTACTS</span>
              <p>
                <a href="tel:+917851056138" className="contact-link">+91 7851056138</a><br />
                <span className="detail-sub">AVAILABLE FOR DIRECT CALLS</span>
              </p>
            </div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/ankit-singh-71a6a133a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href="https://github.com/ankitsinghtanwar2008" target="_blank" rel="noreferrer" aria-label="GitHub">
                <Github size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Form */}
        <div className="inquiry-right">
          <div className="form-top-bar">
            <div className="register-interest">
              <span className="dot"></span> REGISTER INTEREST
            </div>
            <div className="required-fields">*REQUIRED FIELDS</div>
          </div>

          {/* Stylish Status Message */}
          {status !== "idle" && (
            <div className={`status-message ${status}`}>
              {status === "sending" && "SENDING TO ANKITSINGHTANWAR2008@GMAIL.COM..."}
              {status === "success" && "MESSAGE SENT SUCCESSFULLY. I WILL GET BACK TO YOU SOON."}
              {status === "error" && "SOMETHING WENT WRONG. PLEASE TRY AGAIN."}
            </div>
          )}

          <form className="inquiry-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">FIRST NAME*</label>
                <input type="text" id="firstName" name="First Name" required />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">LAST NAME*</label>
                <input type="text" id="lastName" name="Last Name" required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="email">EMAIL*</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone">PHONE NUMBER</label>
                <input type="tel" id="phone" name="Phone" />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="input-group">
                <label htmlFor="request">REQUEST*</label>
                <textarea id="request" name="Message" rows={1} required></textarea>
              </div>
            </div>

            <div className="privacy-checkbox">
              <label>
                <input type="checkbox" required className="hidden-checkbox" />
                <div className="custom-radio"></div>
                <span>
                  I HAVE READ AND ACCEPT THE <a href="#">PRIVACY POLICY</a>.
                </span>
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={status === "sending"}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}