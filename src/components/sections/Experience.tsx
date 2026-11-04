'use client';
import { useEffect } from 'react';
import { highlights } from '@/data/experience';
import { gsap } from '@/lib/gsap';
export default function Experience() {
  useEffect(()=>{const ctx=gsap.context(()=>gsap.from('.timeline-item',{x:-28,opacity:0,stagger:.16,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.timeline',start:'top 78%'}}));return()=>ctx.revert();},[]);
  return <section className="experience editorial-section" id="experience"><div className="section-meta"><span>05 / THE JOURNEY</span><span>ALWAYS MOVING FORWARD</span></div><div className="experience-grid"><div><p className="eyebrow">MILESTONES</p><h2>Learning by<br/><span className="serif-italic">building.</span></h2><p className="experience-intro">Every project is a chance to learn something new, solve a real problem and get a little better at the craft.</p></div><div className="timeline">{highlights.map(item=><article className="timeline-item" key={item.title}><span className="timeline-date">{item.date}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><span className="timeline-dot"/></article>)}</div></div></section>;
}
