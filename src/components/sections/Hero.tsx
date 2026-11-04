'use client';
import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { site } from '@/data/site';
export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: .75 });
      tl.from('.hero-kicker',{y:18,opacity:0,duration:.7,ease:'power3.out'}).from('.hero-title-line',{yPercent:110,rotate:2,opacity:0,stagger:.12,duration:1.15,ease:'power4.out'},'-.35').from('.hero-bottom > *',{y:20,opacity:0,stagger:.1,duration:.7},'-.5').from('.hero-orbit',{scale:.65,opacity:0,duration:1.4,ease:'expo.out'},'-=1');
      gsap.to('.hero-orbit-core',{rotate:360,duration:28,repeat:-1,ease:'none'});
      gsap.to('.hero-orbit-ring',{rotate:-360,duration:42,repeat:-1,ease:'none'});
    });
    return () => ctx.revert();
  }, []);
  return <section className="hero dark-section" id="top"><div className="hero-grain"/><div className="hero-topline"><span>PORTFOLIO / 2026</span><span>{site.location}</span></div><div className="hero-content"><p className="eyebrow hero-kicker"><i className="status-dot"/> {site.role}</p><div className="hero-title-wrap"><h1><span className="title-mask"><span className="hero-title-line">I BUILD</span></span><span className="title-mask"><span className="hero-title-line title-outline">DIGITAL</span></span><span className="title-mask"><span className="hero-title-line">THINGS<span className="hero-period">.</span></span></span></h1><div className="hero-orbit"><div className="hero-orbit-ring"><i/><i/><i/></div><div className="hero-orbit-core"><span>AS</span></div><span className="orbit-label">IDEAS INTO IMPACT</span></div></div><div className="hero-bottom"><p className="hero-description">A developer and founder turning thoughtful ideas into useful, well-crafted digital experiences.</p><a className="round-link" href="#work" aria-label="Explore selected work"><ArrowDown size={19}/></a><a className="hero-scroll" href="#about">SCROLL TO EXPLORE <ArrowUpRight size={13}/></a></div></div><div className="hero-index"><span>01</span><span>—</span><span>04</span></div></section>;
}
