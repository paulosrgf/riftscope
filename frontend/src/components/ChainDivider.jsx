function ChainDivider({ className = '' }) {
  return (
    <svg
      className={`rs-chain-divider ${className}`}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="rs-chain-link" width="20" height="12" patternUnits="userSpaceOnUse">
          <ellipse cx="5" cy="6" rx="4" ry="5" fill="none" stroke="var(--rs-iron)" strokeWidth="1.2" />
          <ellipse cx="15" cy="6" rx="4" ry="5" fill="none" stroke="var(--rs-iron)" strokeWidth="1.2" transform="rotate(90 15 6)" />
        </pattern>
      </defs>
      <rect width="200" height="12" fill="url(#rs-chain-link)" />
    </svg>
  );
}

export default ChainDivider;