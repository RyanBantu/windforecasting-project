import { lazy, Suspense } from 'react'
import PowerCurveChart from './components/PowerCurveChart.jsx'

const PaperViewer = lazy(() => import('./components/PaperViewer.jsx'))

const REPO = 'https://github.com/RyanBantu/bjorko-wind-power-forecast'
const ZENODO = 'https://doi.org/10.5281/zenodo.8230330'
const ZENODO_RECORD = 'https://zenodo.org/records/8230330'
const CHALMERS = 'https://chalmers.se/en/departments/e2/resources-and-collaboration/chalmers-wind-turbine'
const SMHI = 'https://opendata.smhi.se/apidocs/metfcst/'
const OPEN_METEO = 'https://open-meteo.com/en/docs/historical-forecast-api'
const OSM = 'https://www.openstreetmap.org/?mlat=57.71818820625921&mlon=11.683382148764485#map=15/57.71818820625921/11.683382148764485'

function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

function GitHubIcon() {
  return (
    <svg className="icon-github" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.7 7.7 0 0 1 8 4.77c.68 0 1.36.09 2 .26 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
      />
    </svg>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#intro">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Sections">
        <a className="nav-brand" href="#intro">
          Björkö forecast
        </a>
        <div className="nav-links">
          <a href="#intro">Intro</a>
          <a href="#turbine">Turbine</a>
          <a href="#question">Question</a>
          <a href="#data">Data</a>
          <a href="#challenges">Challenges</a>
          <a href="#method">Method</a>
          <a href="#results">Results</a>
          <a href="#limits">Limits</a>
          <a href="#paper">Paper</a>
        </div>
      </nav>

      <header className="hero" id="intro">
        <div className="wrap">
          <p className="kicker">Research narrative</p>
          <h1>Day-ahead wind power forecasting for the Björkö research turbine</h1>
          <p className="lede">
            A physically-informed approach to 15-minute, 24-hour-ahead forecasting,
            built for a turbine with only 44 non-continuous days of history.
          </p>
          <div className="hero-actions">
            <ExtLink href={REPO}>
              <span className="btn btn-primary">
                <GitHubIcon />
                GitHub repository
              </span>
            </ExtLink>
            <a className="btn btn-ghost" href="#paper">
              Read the paper
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="turbine">
          <div className="wrap">
            <p className="kicker">The turbine and site</p>
            <h2>A 45 kW research turbine on Björkö</h2>
            <p>
              The Chalmers wind turbine is a 45 kW research and demonstration turbine
              on the island of Björkö, in Gothenburg’s northern archipelago
              (<span className="coords">57.71818820625921, 11.683382148764485</span>),
              in operation since 2021.{' '}
              <ExtLink href={OSM}>View the coordinates on OpenStreetMap</ExtLink>.
            </p>
            <p>
              It is designed end-to-end by Swedish engineers (generator sourced from
              the UK via an EU project), with a 30 m wooden tower (a modular prototype
              to cut CO<sub>2</sub> vs. steel), a concrete foundation with instrumented
              iron reinforcement, and fully carbon-fiber 7.5 m blades on a 15.9 m
              diameter rotor with individual electric pitch. Rated power 45 kW, rated
              speed 75 rpm. Instrumented with a National Instruments CompactRIO/LabVIEW
              system sampling at 5–10 ms — far denser than a commercial turbine.
            </p>
            <dl className="spec-grid">
              <div className="spec">
                <dt>Rated power</dt>
                <dd>45 kW</dd>
              </div>
              <div className="spec">
                <dt>Rated speed</dt>
                <dd>75 rpm</dd>
              </div>
              <div className="spec">
                <dt>Rotor / blades</dt>
                <dd>15.9 m / 7.5 m carbon fiber</dd>
              </div>
              <div className="spec">
                <dt>Tower</dt>
                <dd>30 m wood, modular prototype</dd>
              </div>
              <div className="spec">
                <dt>In operation since</dt>
                <dd>2021</dd>
              </div>
              <div className="spec">
                <dt>Sampling</dt>
                <dd>5–10 ms CompactRIO</dd>
              </div>
            </dl>
            <p className="muted">
              Source:{' '}
              <ExtLink href={CHALMERS}>
                chalmers.se — Chalmers wind turbine
              </ExtLink>
            </p>
          </div>
        </section>

        <section className="section" id="question">
          <div className="wrap">
            <p className="kicker">What we set out to prove</p>
            <h2>Can a day-ahead forecast be built without a continuous year of SCADA?</h2>
            <p>
              The core question: can a day-ahead, 15-minute-resolution power forecast
              be built for a turbine that has no continuous year of SCADA history —
              only scattered measurement campaigns? Two approaches were considered.
            </p>
            <div className="approach-grid">
              <article className="card">
                <span className="badge badge-out">Ruled out</span>
                <h3>Direct ML model</h3>
                <p>
                  Weather → power, end-to-end. Requires continuous historical data to
                  learn temporal dynamics; this turbine’s data is 311 fifteen-minute
                  points across only 44 non-contiguous days spanning 13 months, with
                  gaps of weeks. Not enough for a sequence model.
                </p>
              </article>
              <article className="card">
                <span className="badge badge-in">Adopted</span>
                <h3>Two-stage physically-informed approach</h3>
                <p>
                  Forecast wind speed independently via NWP, convert to power via an
                  empirically fitted power curve. This works because the power curve
                  only needs to characterize a <em>static</em> wind-to-power
                  relationship, which can be fit reliably even from non-continuous
                  data if the sample size is large enough (hundreds of thousands of
                  20 Hz samples).
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="data">
          <div className="wrap">
            <p className="kicker">Data source</p>
            <h2>The usable record is the 20 Hz file, not the 100 Hz file</h2>
            <p>
              The dataset used: “Björkö Wind Turbine Version 1 (45kW) high frequency
              Structural Health Monitoring (SHM) data” by Fogelström, Johansson,
              Carlson, Hofsäß, Bischoff, Marykovskiy, and Abdallah (2023), published
              on Zenodo under CC BY 4.0.{' '}
              <ExtLink href={ZENODO}>{ZENODO}</ExtLink>
              {' '}(also <ExtLink href={ZENODO_RECORD}>{ZENODO_RECORD}</ExtLink>).
            </p>
            <p>
              Two files were provided — a 100 Hz file (turned out to be only 9 short
              structural-health bursts on 4 days, not usable for continuous
              forecasting) and a 20 Hz file (2.8 GB, the real usable operational
              record, July 2022–August 2023, 44 distinct dates).
            </p>
            <p>Key columns:</p>
            <ul>
              <li>
                <code>WS30</code> — 30 m mast wind speed, used as the reference
              </li>
              <li>
                <code>WSN</code> — nacelle anemometer, unreliable while running due
                to wake shadow
              </li>
              <li>
                Power reconstructed as <code>DCC × DCV</code> (rectifier current ×
                voltage — DC-side power, not AC grid export)
              </li>
              <li>
                <code>SysMode</code> — controller state; normal production is code
                12, “Running”
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="challenges">
          <div className="wrap-wide">
            <div className="section-head">
              <p className="kicker">What didn’t work / had to be adapted</p>
              <h2>Challenges and pivots</h2>
            </div>
            <div className="challenge-list">
              <article className="challenge">
                <h3>The 100 Hz file was misleading at first glance</h3>
                <p>
                  Its size suggested a year of continuous fine-grained SCADA, but
                  inspection showed it was only 9 short bursts on 4 days. Pivoted to
                  using the 20 Hz file as the real operational record.
                </p>
              </article>
              <article className="challenge">
                <h3>The 15-minute aggregated dataset is not a continuous time series</h3>
                <p>
                  Only 311 points across 44 days with multi-week gaps, which ruled
                  out training any model that depends on learning temporal dynamics.
                </p>
              </article>
              <article className="challenge">
                <h3>SMHI retired its PMP3g forecast API on 31 March 2026</h3>
                <p>
                  The originally planned endpoint returned 404. The live forecast
                  fetcher was adapted to fail over to SMHI’s replacement, SNOW1gv1,
                  remapping parameter names accordingly.
                </p>
              </article>
              <article className="challenge">
                <h3>True archived day-ahead forecasts don’t exist for our historical dates</h3>
                <p>
                  Services that let you reproduce the exact forecast issued on a
                  specific past day (e.g., Open-Meteo’s Single Runs API) only go back
                  to 2024, and our campaign dates are 2022–2023. Used Open-Meteo’s
                  Historical Forecast API instead — a stitched short-lead-time proxy,
                  explicitly documented as not equivalent to a true single-run
                  day-ahead reproduction.
                </p>
              </article>
              <article className="challenge">
                <h3>In-sample bias correction looked better than it really was</h3>
                <p>
                  A linear correction fit and evaluated on the same 311 points showed
                  a strong improvement, but this is optimistic by construction. Solved
                  by implementing leave-one-day-out (LODO) cross-validation across all
                  44 days, which confirmed the correction genuinely generalizes
                  (out-of-sample results were only marginally worse than in-sample).
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="method">
          <div className="wrap">
            <p className="kicker">Methodology</p>
            <h2>The pipeline, with the real numbers</h2>

            <h3>Empirical power curve</h3>
            <p>
              Fit via monotonic PCHIP interpolation on 0.5 m/s wind-speed bins (only
              bins with ≥2000 samples kept), with cut-in detected programmatically
              (found: 3.0 m/s) and plateau at 19.99 kW above 13.75 m/s.
            </p>
            <PowerCurveChart />
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Wind bin (m/s)</th>
                    <th className="num">Mean power (kW)</th>
                    <th className="num">Samples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>3.25</td><td className="num">3.47</td><td className="num">166,000</td></tr>
                  <tr><td>4.25</td><td className="num">4.79</td><td className="num">302,000</td></tr>
                  <tr><td>5.25</td><td className="num">7.98</td><td className="num">297,000</td></tr>
                  <tr><td>6.25</td><td className="num">11.67</td><td className="num">375,000</td></tr>
                  <tr><td>7.25</td><td className="num">15.31</td><td className="num">304,000</td></tr>
                  <tr><td>8.25</td><td className="num">18.45</td><td className="num">231,000</td></tr>
                  <tr><td>9.25</td><td className="num">19.97</td><td className="num">197,000</td></tr>
                  <tr><td>10.25</td><td className="num">19.40</td><td className="num">115,000</td></tr>
                  <tr><td>12.25</td><td className="num">18.59</td><td className="num">22,000</td></tr>
                </tbody>
              </table>
            </div>
            <p className="caption">
              Well-populated 0.5 m/s bins used to fit the monotonic PCHIP curve.
            </p>

            <div className="method-blocks">
              <article className="card">
                <h3>NWP wind speed sources</h3>
                <p>
                  SMHI open forecast API for live day-ahead use (
                  <ExtLink href={SMHI}>{SMHI}</ExtLink>
                  ), Open-Meteo Historical Forecast API for backtesting (
                  <ExtLink href={OPEN_METEO}>{OPEN_METEO}</ExtLink>
                  ).
                </p>
              </article>
              <article className="card">
                <h3>Disaggregation</h3>
                <p>
                  Hourly NWP → 15-minute via linear interpolation, with an optional
                  variability layer calibrated from real intra-hour scatter (0.41 m/s
                  std).
                </p>
              </article>
            </div>

            <h3>Bias correction</h3>
            <p className="eq">
              observed WS30 = 0.930 × forecast + 1.356 (R² = 0.65)
            </p>
            <p>
              Fit as a standard model-output-statistics correction after finding the
              historical NWP under-forecasts wind by 0.957 m/s on average.
            </p>
          </div>
        </section>

        <section className="section" id="results">
          <div className="wrap">
            <p className="kicker">Results</p>
            <h2>Three-way comparison</h2>
            <div className="table-wrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th className="num">Uncorrected</th>
                    <th className="num">In-sample corrected</th>
                    <th className="num lodo">LODO out-of-sample</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Wind MAE (m/s)</td>
                    <td className="num">1.289</td>
                    <td className="num">0.949</td>
                    <td className="num lodo">1.003</td>
                  </tr>
                  <tr>
                    <td>Wind bias (m/s)</td>
                    <td className="num">−0.957</td>
                    <td className="num">0.000</td>
                    <td className="num lodo">+0.009</td>
                  </tr>
                  <tr>
                    <td>Power RMSE (kW)</td>
                    <td className="num">5.776</td>
                    <td className="num">5.454</td>
                    <td className="num lodo">5.479</td>
                  </tr>
                  <tr>
                    <td>Power nRMSE</td>
                    <td className="num">0.289</td>
                    <td className="num">0.273</td>
                    <td className="num lodo">0.274</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The corrected model’s out-of-sample performance barely degrades from
              its in-sample performance, meaning the correction is robust and not
              just fit to look good on its own training data.
            </p>
          </div>
        </section>

        <section className="section" id="limits">
          <div className="wrap">
            <p className="kicker">Limitations</p>
            <ul className="limit-list">
              <li>Only 44 non-continuous days of ground truth, not a full year</li>
              <li>
                Historical forecast validation uses a proxy product, not true archived
                day-ahead forecasts
              </li>
              <li>Measured power is DC rectifier power, not AC grid export</li>
              <li>
                Turbine plateaus around 20 kW, well below its 45 kW nameplate rating,
                likely due to yaw error, mast-height vs. hub-height mismatch, and
                FFR/curtailment tied to the turbine’s grid-services research use
              </li>
            </ul>
          </div>
        </section>

        <section className="section" id="paper">
          <div className="wrap">
            <p className="kicker">Read the paper</p>
            <h2>Embedded viewer — no download required</h2>
            <Suspense fallback={<p className="muted">Loading paper viewer…</p>}>
              <PaperViewer />
            </Suspense>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap">
          <p>
            Author: Ryan Bantu, Goperch Innovations Pvt Ltd. Project supervised by
            K. Victor Sam Moses Babu.
          </p>
          <p>
            Repository:{' '}
            <ExtLink href={REPO}>{REPO}</ExtLink>
          </p>
          <p>
            Data citation: Fogelström et al. (2023), Zenodo,{' '}
            <ExtLink href={ZENODO}>{ZENODO}</ExtLink>.
          </p>
        </div>
      </footer>
    </>
  )
}
