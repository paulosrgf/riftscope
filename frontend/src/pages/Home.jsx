import HangingChains from '../components/HangingChains';
import RoseWindow from '../components/RoseWindow';
import SearchBar from '../components/SearchBar';
import EmberParticles from '../components/EmberParticles';
import FeatureCard from '../components/FeatureCard';
import { IconGrimoire, IconGrid, IconCompass, IconFlask } from '../components/icons';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FEATURES = [
  {
    icon: <IconGrimoire />,
    title: 'Histórico detalhado',
    description: 'Cada partida abre em ficha completa: KDA, build de itens, runas e feitiços de todos os 10 jogadores.',
  },
  {
    icon: <IconGrid />,
    title: 'Scoreboard tático',
    description: 'Placar no estilo scouting profissional — compare dano, ouro e participação de time inteiro, não só o seu invocador.',
  },
  {
    icon: <IconCompass />,
    title: 'Multi-região',
    description: 'Resolve sozinho a plataforma certa do jogador — BR, NA, EUW e outras — sem você precisar informar o servidor.',
  },
  {
    icon: <IconFlask />,
    title: 'Cache alquímico',
    description: 'Partidas já consultadas ficam guardadas em cache, então revisitar um perfil é instantâneo.',
  },
];

const STEPS = [
  { n: '01', title: 'Busque', text: 'Digite o Riot ID de qualquer invocador — o seu ou o de um rival.' },
  { n: '02', title: 'Explore', text: 'Veja o histórico recente com elo, KDA médio e taxa de vitória.' },
  { n: '03', title: 'Investigue', text: 'Abra qualquer partida e clique em qualquer jogador pra seguir a trilha.' },
];

function Home() {
  const [featuresRef, featuresVisible] = useScrollReveal(0.1);

  return (
    <div className="rs-home-page">
      <section className="rs-home">
        <EmberParticles />
        <HangingChains />
        <div className="rs-home-rose">
          <RoseWindow />
        </div>
        <div className="rs-home-content">
          <h1 className="rs-wordmark">RiftScope</h1>
          <p className="rs-tagline">desça à cripta do seu histórico</p>
          <SearchBar variant="hero" />
        </div>
        <div className="rs-scroll-cue" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className={`rs-features ${featuresVisible ? 'rs-features--visible' : ''}`} ref={featuresRef}>
        <p className="rs-section-eyebrow">o que você encontra aqui</p>
        <div className="rs-features-grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 100} />
          ))}
        </div>
      </section>

      <section className="rs-steps">
        <p className="rs-section-eyebrow">como funciona</p>
        <div className="rs-steps-list">
          {STEPS.map((s) => (
            <div key={s.n} className="rs-step">
              <span className="rs-step-number">{s.n}</span>
              <h3 className="rs-step-title">{s.title}</h3>
              <p className="rs-step-text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;