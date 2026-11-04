'use client';
import { useEffect } from 'react';
import { gsap } from '@/lib/gsap';
export default function Manifesto() {
  useEffect(() => { const ctx = gsap.context(() => { gsap.from('.manifesto-line',{yPercent:105,opacity:0,stagger:.13,duration:1,ease:'power4.out',scrollTrigger:{trigger:'.manifesto',start:'top 72%'}}); gsap.from('.manifesto-note',{opacity:0,y:25,duration:.8,scrollTrigger:{trigger:'.manifesto-note',start:'top 88%'}}); }); return () => ctx.revert(); }, []);
  return <section className="manifesto editorial-section"><div className="section-meta"><span>APPROACH</span><span>LESS NOISE. MORE MEANING.</span></div><div className="manifesto-content"><p className="manifesto-label"></p><h2><span className="title-mask"><span className="manifesto-line">I DON&apos;T JUST</span></span><span className="title-mask"><span className="manifesto-line">WRITE CODE.</span></span><span className="title-mask"><span className="manifesto-line muted-line">I BUILD WHAT</span></span><span className="title-mask"><span className="manifesto-line">MATTERS<span className="accent-dot">.</span></span></span></h2><p className="manifesto-note">Curiosity starts it. Craft shapes it. Technology takes it further. I care about the details people feel, even when they can&apos;t see them.</p></div><div className="manifesto-bottom"><span>THOUGHTFUL BY NATURE</span></div></section>;
}
