interface SponsorSubmissionPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

function readQueryValue(
  query: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = query[key];
  return typeof value === "string" ? decodeURIComponent(value) : "";
}

export default async function SponsorSignupPage({
  searchParams,
}: SponsorSubmissionPageProps) {
  const query = searchParams ? await searchParams : {};
  const success = query.success === "profile-submitted";
  const error = query.error === "missing-fields";
  const company = readQueryValue(query, "company");
  const contactName = readQueryValue(query, "contactName");
  const email = readQueryValue(query, "email");
  const strategy = readQueryValue(query, "strategy");
  const market = readQueryValue(query, "market");
  const units = readQueryValue(query, "units");
  const exits = readQueryValue(query, "exits");
  const irr = readQueryValue(query, "irr");
  const multiple = readQueryValue(query, "multiple");
  const checkSize = readQueryValue(query, "checkSize");
  const holdYears = readQueryValue(query, "holdYears");
  const reportingCadence = readQueryValue(query, "reportingCadence");
  const dataRoomUrl = readQueryValue(query, "dataRoomUrl");
  const notes = readQueryValue(query, "notes");

  return (
    <div className="page-stack">
      <section className="content-card">
        <p className="section-kicker">Sponsor onboarding</p>
        <h1>Submit your sponsor profile for review.</h1>
        <p className="section-summary">
          Credex evaluates syndicators using structured operating, track record, and risk inputs. Supporting documents help, but the core review is based on standardized profile data.
        </p>
        {success ? (
          <p className="success-text">
            Profile submission received. Showing your review preview below.
          </p>
        ) : null}
        {error ? (
          <p className="error-text">
            Please complete all required fields so we can evaluate your profile.
          </p>
        ) : null}
        <form
          action="/signup/sponsor/submit"
          className="stacked-form"
          encType="multipart/form-data"
          method="post"
        >
          <h3>Firm information</h3>
          <div className="form-grid">
            <label>
              Company name
              <input name="companyName" placeholder="Ridge Capital Partners" required />
            </label>
            <label>
              Primary contact
              <input name="contactName" placeholder="Nina Alvarez" required />
            </label>
            <label>
              Contact email
              <input
                name="contactEmail"
                placeholder="team@ridgecapital.com"
                required
                type="email"
              />
            </label>
            <label>
              Primary market
              <input name="primaryMarket" placeholder="Phoenix, AZ" required />
            </label>
            <label>
              Core strategy
              <select defaultValue="" name="strategy" required>
                <option disabled value="">
                  Select strategy
                </option>
                <option value="Core">Core</option>
                <option value="Core-plus">Core-plus</option>
                <option value="Value-add">Value-add</option>
                <option value="Opportunistic">Opportunistic</option>
                <option value="Workforce housing">Workforce housing</option>
                <option value="Build-to-rent">Build-to-rent</option>
                <option value="Distressed turnaround">Distressed turnaround</option>
                <option value="Debt strategy">Debt strategy</option>
                <option value="Development">Development</option>
                <option value="Income-focused">Income-focused</option>
              </select>
            </label>
            <label>
              Reporting cadence
              <select defaultValue="" name="reportingCadence" required>
                <option disabled value="">
                  Select cadence
                </option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Semi-annual">Semi-annual</option>
              </select>
            </label>
          </div>

          <h3>Track record metrics</h3>
          <div className="form-grid">
            <label>
              Units operated
              <input min="0" name="unitsOperated" placeholder="2480" required type="number" />
            </label>
            <label>
              Full-cycle exits
              <input min="0" name="fullCycleExits" placeholder="12" required type="number" />
            </label>
            <label>
              Realized IRR (%)
              <input min="0" name="realizedIrr" placeholder="18.7" required step="0.1" type="number" />
            </label>
            <label>
              Average equity multiple (x)
              <input
                min="0"
                name="equityMultiple"
                placeholder="2.1"
                required
                step="0.1"
                type="number"
              />
            </label>
            <label>
              Typical minimum check ($)
              <input
                min="0"
                name="minimumCheckSize"
                placeholder="50000"
                required
                step="1000"
                type="number"
              />
            </label>
            <label>
              Typical hold period (years)
              <input min="1" name="holdPeriodYears" placeholder="5" required type="number" />
            </label>
          </div>

          <h3>Supporting context</h3>
          <div className="form-grid">
            <label>
              Data room URL (optional)
              <input name="dataRoomUrl" placeholder="https://..." type="url" />
            </label>
            <label>
              Supporting PDF (optional)
              <input accept="application/pdf" name="supportingPdf" type="file" />
            </label>
          </div>
          <label>
            Additional notes for review
            <textarea
              name="reviewNotes"
              placeholder="Share anything investors should understand about your underwriting process, risk controls, or reporting standards."
              rows={4}
            />
          </label>
          <button className="primary-button" type="submit">
            Submit sponsor profile
          </button>
        </form>
      </section>

      {success && company && email ? (
        <section className="content-card">
          <p className="section-kicker">Review preview</p>
          <h2>{company}</h2>
          <p className="section-summary">
            This is the structured profile payload your Credex review will start from.
          </p>
          <div className="metric-row">
            <div>
              <dt>Company</dt>
              <dd>{company}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{contactName}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{email}</dd>
            </div>
          </div>
          <div className="metric-row">
            <div>
              <dt>Strategy</dt>
              <dd>{strategy}</dd>
            </div>
            <div>
              <dt>Primary market</dt>
              <dd>{market}</dd>
            </div>
            <div>
              <dt>Reporting</dt>
              <dd>{reportingCadence}</dd>
            </div>
          </div>
          <div className="metric-row">
            <div>
              <dt>Units operated</dt>
              <dd>{units}</dd>
            </div>
            <div>
              <dt>Full-cycle exits</dt>
              <dd>{exits}</dd>
            </div>
            <div>
              <dt>Realized IRR</dt>
              <dd>{irr}%</dd>
            </div>
          </div>
          <div className="metric-row">
            <div>
              <dt>Avg. multiple</dt>
              <dd>{multiple}x</dd>
            </div>
            <div>
              <dt>Typical check</dt>
              <dd>${checkSize}</dd>
            </div>
            <div>
              <dt>Hold period</dt>
              <dd>{holdYears} years</dd>
            </div>
          </div>
          {dataRoomUrl ? <p className="mode-note">Data room: {dataRoomUrl}</p> : null}
          {notes ? <p className="mode-note">Notes: {notes}</p> : null}
        </section>
      ) : null}
    </div>
  );
}
