function RoseWindow({ size = 640 }) {
  const spokes = 12;
  const lines = Array.from({ length: spokes }, (_, i) => {
    const angle = (i * 360) / spokes;
    return (
      <line
        key={i}
        x1="320" y1="320"
        x2="320" y2="20"
        stroke="var(--rs-iron)"
        strokeWidth="1"
        transform={`rotate(${angle} 320 320)`}
      />
    );
  });

  const rings = [300, 230, 160, 90].map((r) => (
    <circle key={r} cx="320" cy="320" r={r} fill="none" stroke="var(--rs-iron)" strokeWidth="1" />
  ));

  return (
    <svg
      viewBox="0 0 640 640"
      width={size}
      height={size}
      className="rs-rose-window"
      aria-hidden="true"
    >
      {rings}
      {lines}
      <circle cx="320" cy="320" r="8" fill="var(--rs-oxide)" opacity="0.6" />
    </svg>
  );
}

export default RoseWindow;