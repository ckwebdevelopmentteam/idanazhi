export function OrnamentalArrow({
  className = 'w-[68px] h-4 text-ink',
  expanded = false,
}: {
  className?: string;
  expanded?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 76 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ease-out origin-center ${expanded ? 'rotate-90' : ''} ${className}`}
      aria-hidden="true"
    >
      {/* Horizontal stem line extending across */}
      <line x1="0" y1="10" x2="58" y2="10" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />

      {/* Ornate Raffles-style petal / trefoil finial */}
      {/* Upper loop */}
      <path
        d="M 58 10 C 58 5.5 61 2.5 64 2.5 C 67 2.5 68 5 66.5 7.5 C 65 9.2 62.5 9.8 60 10"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
      {/* Lower loop */}
      <path
        d="M 58 10 C 58 14.5 61 17.5 64 17.5 C 67 17.5 68 15 66.5 12.5 C 65 10.8 62.5 10.2 60 10"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tip extension */}
      <line x1="60" y1="10" x2="74" y2="10" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
      {/* Subtle core node */}
      <circle cx="61" cy="10" r="0.9" fill="currentColor" />
    </svg>
  );
}
