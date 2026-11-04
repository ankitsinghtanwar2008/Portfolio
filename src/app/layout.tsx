import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/layout/SmoothScroll';
export const metadata: Metadata = { title: 'Ankit Singh — Developer & Founder', description: 'Full-stack developer, AI/ML enthusiast and founder building thoughtful digital products.' };
export const viewport: Viewport = { themeColor: '#090909', width: 'device-width', initialScale: 1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><SmoothScroll/>{children}</body></html>; }
