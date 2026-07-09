const PARTICLE_COUNT = 18;

function EmberParticles() {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const left = (i * 97) % 100;
    const delay = (i * 1.7) % 12;
    const duration = 10 + (i % 6) * 2;
    const size = i % 3 === 0 ? 3 : 2;
    return { id: i, left, delay, duration, size };
  });

  return (
    <div className="rs-embers" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="rs-ember"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export default EmberParticles;