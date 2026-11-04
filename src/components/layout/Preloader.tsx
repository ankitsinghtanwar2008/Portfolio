'use client';
import { useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => gsap.to('.preloader', { yPercent: -100, duration: 1.05, ease: 'power4.inOut', onComplete: () => setVisible(false) }), 650);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="preloader"><div className="preloader-inner"><span className="preloader-mark">AS<span>.</span></span><span className="preloader-caption">A LITTLE DIFFERENT, BY DESIGN</span><div className="preloader-line"><span /></div></div></div>;
}
