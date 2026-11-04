import { ArrowUpRight, Mail } from 'lucide-react';
import { site } from '@/data/site';
export default function Contact() {
  return <section className="contact-section dark-section" id="contact"><div className="section-meta light-meta"><span>06 / THE NEXT CHAPTER</span><span>HAVE SOMETHING IN MIND?</span></div><p className="eyebrow">GOOD THINGS START WITH A CONVERSATION</p><a href={`mailto:${site.email}`} className="contact-title">LET&apos;S<br/><span className="serif-italic">talk.</span><ArrowUpRight className="contact-arrow"/></a><div className="contact-bottom"><a href={`mailto:${site.email}`}><Mail size={16}/> {site.email}</a><div>{site.socials.map(s=><a href={s.href} key={s.label} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div><span>BASED IN INDIA · OPEN TO THE WORLD</span></div></section>;
}
