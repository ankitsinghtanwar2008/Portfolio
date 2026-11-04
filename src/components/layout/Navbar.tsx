import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';
export default function Navbar() {
  return <header className="site-nav"><Link href="#top" className="nav-brand">AS<span>.</span></Link><nav className="nav-links"><Link href="#about">ABOUT</Link><Link href="#work">WORK</Link><Link href="#experience">EXPERIENCE</Link></nav><a className="nav-contact" href={`mailto:${site.email}`}>LET&apos;S TALK <ArrowUpRight size={14}/></a></header>;
}
