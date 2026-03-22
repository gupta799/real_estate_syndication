import { mockParseDealPdf } from "@/lib/listings";

interface SponsorSubmissionPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SponsorSignupPage({
  searchParams,
}: SponsorSubmissionPageProps) {
  const query = searchParams ? await searchParams : {};
  const success = query.success === "pdf-uploaded";
  const error = query.error === "missing-fields";
  const company =
    typeof query.company === "string" ? decodeURIComponent(query.company) : "";
  const email = typeof query.email === "string" ? decodeURIComponent(query.email) : "";
  const file = typeof query.file === "string" ? decodeURIComponent(query.file) : "";
  const parsedResult =
    success && company && email && file
      ? mockParseDealPdf({
          companyName: company,
          contactEmail: email,
          fileName: file,
        })
      : null;

  return (
    <div className="page-stack">
      <section className="content-card">
        <p className="section-kicker">Public deal intake</p>
        <h1>Upload a deal PDF.</h1>
        <p className="section-summary">
          No registration for now. Upload a teaser or OM as a PDF and we will mock the parsed deal output so the intake flow is testable.
        </p>
        {success ? (
          <p className="success-text">
            PDF received. Showing mocked parsed output below.
          </p>
        ) : null}
        {error ? <p className="error-text">Please include company, email, and a PDF file.</p> : null}
        <form
          action="/signup/sponsor/submit"
          className="stacked-form"
          encType="multipart/form-data"
          method="post"
        >
          <label>
            Company name
            <input name="companyName" placeholder="Ridge Capital Partners" required />
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
            PDF teaser or OM
            <input accept="application/pdf" name="dealPdf" required type="file" />
          </label>
          <button className="primary-button" type="submit">
            Upload PDF
          </button>
        </form>
      </section>

      {parsedResult ? (
        <section className="content-card">
          <p className="section-kicker">Mock parsed result</p>
          <h2>{parsedResult.parsedTitle}</h2>
          <p className="section-summary">{parsedResult.parsedSummary}</p>
          <p className="success-text">{parsedResult.parseStatus}</p>
          <div className="metric-row">
            <div>
              <dt>Company</dt>
              <dd>{parsedResult.companyName}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{parsedResult.parsedLocation}</dd>
            </div>
            <div>
              <dt>Property type</dt>
              <dd>{parsedResult.parsedPropertyType}</dd>
            </div>
          </div>
          <div className="metric-row">
            <div>
              <dt>Target IRR</dt>
              <dd>{parsedResult.parsedTargetIrr}</dd>
            </div>
            <div>
              <dt>Minimum</dt>
              <dd>{parsedResult.parsedMinimumInvestment}</dd>
            </div>
            <div>
              <dt>Source PDF</dt>
              <dd>{parsedResult.fileName}</dd>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
