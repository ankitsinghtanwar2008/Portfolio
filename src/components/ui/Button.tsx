
'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = false,
  external = false,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const classes = [
    'ui-button',
    `ui-button-${variant}`,
    `ui-button-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="ui-button-label">{children}</span>
      {icon && <ArrowUpRight size={16} strokeWidth={1.7} />}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        onClick={onClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
