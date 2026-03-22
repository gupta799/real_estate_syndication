import { signUpAction } from "@/app/actions";

export default function SponsorSignupPage() {
  return (
    <div className="page-stack narrow-page">
      <section className="content-card">
        <p className="section-kicker">Sponsor onboarding</p>
        <h1>Apply as a sponsor</h1>
        <p className="section-summary">
          The sponsor flow is self-serve for submission, but nothing goes live until an admin approves it.
        </p>
        <form action={signUpAction} className="stacked-form">
          <input name="role" type="hidden" value="sponsor" />
          <label>
            Company name
            <input name="companyName" placeholder="Ridge Capital Partners" required />
          </label>
          <label>
            Contact email
            <input name="email" placeholder="team@ridgecapital.com" required type="email" />
          </label>
          <label>
            Track record summary
            <textarea
              name="trackRecordSummary"
              placeholder="12 exits, 2,480 units, Sun Belt multifamily focus."
              rows={4}
            />
          </label>
          <button className="primary-button" type="submit">
            Submit sponsor application
          </button>
        </form>
      </section>
    </div>
  );
}

