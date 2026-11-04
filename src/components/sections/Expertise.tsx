'use client';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const skills = [
  [
    '01',
    'Full-stack development',
    'Interfaces, APIs, databases and product architecture.',
    'NEXT.JS / REACT / NODE'
  ],
  [
    '02',
    'AI & machine learning',
    'Exploring intelligent systems that solve practical problems.',
    'PYTHON / ML / DATA'
  ],
  [
    '03',
    'Product thinking',
    'Turning early ideas into usable, thoughtful experiences.',
    'IDEATION / BUILD / SHIP'
  ],
  [
    '04',
    'Data Structures & Algorithms',
    'Optimizing complex logic and building efficient, scalable solutions.',
    'JAVA / LOGIC'
  ]
];

export default function Expertise() {
  useEffect(() => {
    const ctx = gsap.context(() =>
      gsap.from('.expertise-row', {
        y: 45,
        opacity: 0,
        stagger: .14,
        duration: .85,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.expertise-list', start: 'top 78%' }
      })
    );
    return () => ctx.revert();
  }, []);

  return (
    <section 
      className="expertise editorial-section" 
      id="expertise"
      style={{ paddingTop: '80px' }} /* Yahan se top space adjust kar sakte ho */
    >
      {/* section-meta div hata diya gaya hai jisse upar ki line gayab ho jayegi */}
      <div className="expertise-heading">
        <h2>
          Good ideas deserve<br />
          <span className="serif-italic">good execution.</span>
        </h2>
      </div>
      
      <div className="expertise-list">
        {skills.map(([n, title, desc, tags]) => (
          <article className="expertise-row" key={n}>
            <span className="expertise-number">{n}</span>
            <div className="expertise-main">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <span className="expertise-tags">{tags}</span>
            <ArrowUpRight className="expertise-arrow" size={22} />
          </article>
        ))}
      </div>
    </section>
  );
}