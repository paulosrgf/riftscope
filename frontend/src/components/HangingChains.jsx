function ChainStrand({ side }) {
  const links = Array.from({ length: 10 });
  return (
    <div className={`rs-hanging-chain rs-hanging-chain--${side}`} aria-hidden="true">
      <svg viewBox="0 0 24 240" width="24" height="240">
        {links.map((_, i) => (
          <ellipse
            key={i}
            cx="12"
            cy={12 + i * 24}
            rx="7"
            ry="10"
            fill="none"
            stroke="var(--rs-iron)"
            strokeWidth="1.5"
            transform={i % 2 !== 0 ? `rotate(90 12 ${12 + i * 24})` : undefined}
          />
        ))}
      </svg>
    </div>
  );
}

function HangingChains() {
  return (
    <>
      <ChainStrand side="left" />
      <ChainStrand side="right" />
    </>
  );
}

export default HangingChains;