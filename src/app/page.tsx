import Preloader from '@/components/layout/Preloader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/animations/CustomCursor';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import About from '@/components/sections/About';
import Technical from "@/components/sections/Technical";
import Expertise from '@/components/sections/Expertise';
import SelectedWork from '@/components/sections/SelectedWork';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
export default function Home(){return <><Preloader/><CustomCursor/><Navbar/><main><Hero/><Manifesto/><About/><Technical/><Expertise/><SelectedWork/><Experience/><Contact/></main><Footer/></>;}
