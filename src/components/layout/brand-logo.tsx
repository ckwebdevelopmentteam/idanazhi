'use client';

import React from 'react';

export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 230 52"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M13 9 L21 4 L29 9 L29 38 L21 43 L13 38 Z" />
        <path d="M21 9 V38" />
        <path d="M10 16 H32" />
        <path d="M10 31 H32" />
      </g>
      <text
        x="44"
        y="31"
        fill="currentColor"
        fontSize="16"
        fontWeight="700"
        letterSpacing="2.5"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        IDANAZHI
      </text>
    </svg>
  );
}
