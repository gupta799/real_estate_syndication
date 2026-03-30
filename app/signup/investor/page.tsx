import { signUpAction } from "@/app/actions";

export default function InvestorSignupPage() {
  return (
    <div className="page-stack narrow-page">
      <section className="content-card">
        <p className="section-kicker">Investor onboarding</p>
        <h1>Create an investor account</h1>
        <p className="section-summary">
          Keep signup lean. The objective is comparing sponsor track records and requesting introductions, not browsing offerings.
        </p>
        <form action={signUpAction} className="stacked-form">
          <input name="role" type="hidden" value="investor" />
          <label>
            Full name
            <input name="fullName" placeholder="Jordan Lee" required />
          </label>
          <label>
            Email
            <input name="email" placeholder="jordan@example.com" required type="email" />
          </label>
          <label>
            Accreditation
            <select name="accreditation">
              <option>Existing passive investor</option>
              <option>Exploring sponsor track records</option>
            </select>
          </label>
          <button className="primary-button" type="submit">
            Create investor account
          </button>
        </form>
      </section>
    </div>
  );
}
