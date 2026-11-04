'use client';
import { useEffect } from 'react';
export default function CustomCursor() {
  useEffect(() => {
    if (matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cursor = document.querySelector<HTMLElement>('.custom-cursor');
    if (!cursor) return;
    const move = (e: MouseEvent) => { cursor.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`; };
    const enter = () => cursor.classList.add('is-active');
    const leave = () => cursor.classList.remove('is-active');
    window.addEventListener('mousemove', move);
    document.querySelectorAll('a,button,.project-panel').forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
    return () => { window.removeEventListener('mousemove', move); document.querySelectorAll('a,button,.project-panel').forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); }); };
  }, []);
  return <div className="custom-cursor" aria-hidden="true"><span/></div>;
}
