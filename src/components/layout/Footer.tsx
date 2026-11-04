import { site } from '@/data/site';
export default function Footer() { return <footer className="footer"><span>© {new Date().getFullYear()} {site.name}</span><span>DESIGNED WITH INTENT. BUILT WITH CODE.</span><a href="#top">BACK TO TOP ↑</a></footer>; }
