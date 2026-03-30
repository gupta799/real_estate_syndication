import { mockParseSponsorPdf } from "@/lib/listings";

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
      ? mockParseSponsorPdf({
          companyName: company,
          contactEmail: email,
          fileName: file,
        })
      : null;

  return (
    <div className="page-stack">
      <section className="content-card">
        <p className="section-kicker">Public profile intake</p>
        <h1>Upload a sponsor track record PDF.</h1>
        <p className="section-summary">
          No registration for now. Upload a sponsor overview, track record summary, or investor report sample and the app will mock a historical profile extraction flow without exposing any live deal terms.
        </p>
        {success ? (
          <p className="success-text">
            PDF received. Showing mocked profile extraction below.
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
            Sponsor track record PDF
            <input accept="application/pdf" name="profilePdf" required type="file" />
          </label>
          <button className="primary-button" type="submit">
            Upload PDF
          </button>
        </form>
      </section>

      {parsedResult ? (
        <section className="content-card">
          <p className="section-kicker">Mock parsed profile</p>
          <h2>{parsedResult.parsedTitle}</h2>
          <p className="section-summary">{parsedResult.parsedSummary}</p>
          <p className="success-text">{parsedResult.parseStatus}</p>
          <div className="metric-row">
            <div>
              <dt>Company</dt>
              <dd>{parsedResult.companyName}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{parsedResult.parsedFocus}</dd>
            </div>
            <div>
              <dt>Historical deals</dt>
              <dd>{parsedResult.parsedTrackRecordCount}</dd>
            </div>
          </div>
          <div className="metric-row">
            <div>
              <dt>Documents found</dt>
              <dd>{parsedResult.parsedDocumentation}</dd>
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
