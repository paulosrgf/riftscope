import RoseWindow from "../components/RoseWindow";
import SearchBar from "../components/SearchBar";
import EmberParticles from "../components/EmberParticles";
import HangingChains from "../components/HangingChains";

function ValorantHome() {
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
          <p className="rs-tagline">rastreie cada troca de tiro</p>
          <SearchBar variant="hero" game="valorant" />
        </div>
      </section>
    </div>
  );
}

export default ValorantHome;
