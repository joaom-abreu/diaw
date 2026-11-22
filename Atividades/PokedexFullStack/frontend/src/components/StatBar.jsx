import "../css/StatBar.css";

const MAX_STAT = 255;

function StatBar({ label, value }) {
  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${(value / MAX_STAT) * 100}%` }} />
      </div>
    </div>
  );
}

export default StatBar;
