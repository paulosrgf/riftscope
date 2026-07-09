function Footer() {
  return (
    <footer className="rs-footer">
      <div className="rs-footer-inner">
        <span className="rs-footer-brand">RiftScope</span>
        <p className="rs-footer-text">
          Dados fornecidos pela Riot Games API. RiftScope não é endossado pela Riot Games e não reflete
          as opiniões ou pontos de vista da Riot Games ou de qualquer pessoa oficialmente envolvida na
          produção ou gerenciamento das propriedades da Riot Games.
        </p>
        <div className="rs-footer-links">
          <a href="https://developer.riotgames.com" target="_blank" rel="noreferrer">Riot Developer Portal</a>
          <span className="rs-footer-dot">·</span>
          <a href="https://github.com/paulosrgf" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;