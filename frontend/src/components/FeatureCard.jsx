import { useScrollReveal } from '../hooks/useScrollReveal';

function FeatureCard({ icon, title, description, delay = 0 }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`rs-feature-card ${visible ? 'rs-feature-card--visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="rs-feature-icon">{icon}</div>
      <h3 className="rs-feature-title">{title}</h3>
      <p className="rs-feature-desc">{description}</p>
    </div>
  );
}

export default FeatureCard;