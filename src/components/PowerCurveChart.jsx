const BINS = [
  { v: 3.25, p: 3.47 },
  { v: 4.25, p: 4.79 },
  { v: 5.25, p: 7.98 },
  { v: 6.25, p: 11.67 },
  { v: 7.25, p: 15.31 },
  { v: 8.25, p: 18.45 },
  { v: 9.25, p: 19.97 },
  { v: 10.25, p: 19.4 },
  { v: 12.25, p: 18.59 },
]

const CUT_IN = 3.0
const PLATEAU_V = 13.75
const PLATEAU_P = 19.99

export default function PowerCurveChart() {
  const W = 720
  const H = 320
  const pad = { l: 56, r: 18, t: 22, b: 40 }
  const xmin = 2.4
  const xmax = 15.2
  const ymin = 0
  const ymax = 23
  const x = (v) => pad.l + ((v - xmin) / (xmax - xmin)) * (W - pad.l - pad.r)
  const y = (p) => H - pad.b - ((p - ymin) / (ymax - ymin)) * (H - pad.t - pad.b)
  const ticksX = [3, 5, 7, 9, 11, 13, 15]
  const ticksY = [0, 5, 10, 15, 20]
  const points = BINS.map((b) => `${x(b.v).toFixed(1)},${y(b.p).toFixed(1)}`).join(' ')

  return (
    <div className="chart-panel">
      <h3>Empirical bin means</h3>
      <p className="muted" style={{ marginTop: 0 }}>
        Points are the 0.5 m/s bin means from the table below. Cut-in is 3.0 m/s;
        the fitted plateau is 19.99 kW above 13.75 m/s. The shipped curve is a
        monotonic PCHIP through these bins, not a manufacturer curve.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Empirical power-curve bin means">
        {ticksY.map((t) => (
          <g key={`y-${t}`}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#e4ddd1" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#5a6572" fontFamily="IBM Plex Mono, monospace">
              {t}
            </text>
          </g>
        ))}
        {ticksX.map((t) => (
          <text key={`x-${t}`} x={x(t)} y={H - 10} textAnchor="middle" fontSize="11" fill="#5a6572" fontFamily="IBM Plex Mono, monospace">
            {t}
          </text>
        ))}
        <line x1={x(CUT_IN)} x2={x(CUT_IN)} y1={y(0)} y2={y(22)} stroke="#b85c38" strokeDasharray="3 4" />
        <line x1={x(PLATEAU_V)} x2={x(15.1)} y1={y(PLATEAU_P)} y2={y(PLATEAU_P)} stroke="#1a5f6a" strokeDasharray="4 4" />
        <polyline fill="none" stroke="#1a5f6a" strokeWidth="2" points={` ${x(CUT_IN).toFixed(1)},${y(0).toFixed(1)} ${points}`} />
        {BINS.map((b) => (
          <circle key={b.v} cx={x(b.v)} cy={y(b.p)} r="4" fill="#1c2430" />
        ))}
        <text x={x(CUT_IN) + 6} y={y(21.4)} fontSize="11" fill="#b85c38" fontFamily="Source Sans 3, sans-serif">
          cut-in 3.0 m/s
        </text>
        <text x={x(13.85)} y={y(PLATEAU_P) - 8} fontSize="11" fill="#1a5f6a" fontFamily="Source Sans 3, sans-serif">
          plateau 19.99 kW
        </text>
        <text x={(pad.l + W - pad.r) / 2} y={H - 2} textAnchor="middle" fontSize="11" fill="#5a6572" fontFamily="Source Sans 3, sans-serif">
          Wind speed (m/s)
        </text>
        <text
          x="16"
          y={H / 2}
          textAnchor="middle"
          fontSize="11"
          fill="#5a6572"
          fontFamily="Source Sans 3, sans-serif"
          transform={`rotate(-90 16 ${H / 2})`}
        >
          Mean power (kW)
        </text>
      </svg>
    </div>
  )
}
