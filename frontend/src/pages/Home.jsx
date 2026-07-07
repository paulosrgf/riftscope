import RoseWindow from '../components/RoseWindow';
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="rs-home">
      <div className="rs-home-rose">
        <RoseWindow />
      </div>
      <div className="rs-home-content">
        <h1 className="rs-wordmark">RiftScope</h1>
        <p className="rs-tagline">desça à cripta do seu histórico</p>
        <SearchBar variant="hero" />
      </div>
    </div>
  );
}

export default Home;