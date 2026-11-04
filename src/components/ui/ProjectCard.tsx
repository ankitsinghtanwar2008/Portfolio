
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface ProjectCardProps {
  number: string;
  name: string;
  category: string;
  year: string;
  description: string;
  image: string;
  stack: string[];
  href: string;
  theme?: string;
}

export default function ProjectCard({
  number,
  name,
  category,
  year,
  description,
  image,
  stack,
  href,
  theme = 'light',
}: ProjectCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -5;
    const rotateY = (x / rect.width - 0.5) * 5;

    gsap.to(imageRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  return (
    <article className={`project-card project-card-${theme}`}>
      <Link
        href={href}
        className="project-card-link"
        aria-label={`View ${name} project`}
      >
        <div
          className="project-card-visual"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={imageRef} className="project-card-image-wrap">
            <Image
              src={image}
              alt={`${name} project preview`}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="project-card-image"
            />
          </div>

          <span className="project-card-number">{number}</span>

          <span className="project-card-arrow">
            <ArrowUpRight size={22} />
          </span>
        </div>

        <div className="project-card-info">
          <div className="project-card-heading">
            <div>
              <span className="project-card-category">
                {category} / {year}
              </span>

              <h3 className="project-card-title">{name}</h3>
            </div>

            <ArrowUpRight
              className="project-card-mobile-arrow"
              size={20}
            />
          </div>

          <p className="project-card-description">{description}</p>

          <div className="project-card-stack">
            {stack.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
