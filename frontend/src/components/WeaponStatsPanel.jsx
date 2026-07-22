function WeaponStatsPanel({ weaponStats }) {
  if (!weaponStats?.length) return null;
  const maxKills = Math.max(...weaponStats.map((w) => w.kills));

  return (
    <div className="rs-weapon-panel">
      <h3 className="rs-panel-title">Armas mais usadas</h3>
      <div className="rs-weapon-list">
        {weaponStats.map((w) => (
          <div key={w.weaponName} className="rs-weapon-row">
            {w.iconUrl && (
              <img
                src={w.iconUrl}
                alt={w.weaponName}
                className="rs-weapon-icon"
              />
            )}
            <div className="rs-weapon-info">
              <div className="rs-weapon-name-row">
                <span className="rs-weapon-name">{w.weaponName}</span>
                <span className="rs-weapon-hs">{w.headshotPercent}% HS</span>
              </div>
              <div className="rs-weapon-bar-track">
                <div
                  className="rs-weapon-bar-fill"
                  style={{ width: `${(w.kills / maxKills) * 100}%` }}
                />
              </div>
            </div>
            <span className="rs-weapon-kills">{w.kills} abates</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeaponStatsPanel;
