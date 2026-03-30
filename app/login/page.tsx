import Link from "next/link";

import { signInAction } from "@/app/actions";

export default function LoginPage() {
  return (
    <div className="page-stack narrow-page">
      <section className="content-card">
        <p className="section-kicker">Authentication</p>
        <h1>Log in</h1>
        <p className="section-summary">
          The MVP uses role-specific dashboards around sponsor track records, investor introductions, and manual moderation.
        </p>
        <form action={signInAction} className="stacked-form">
          <label>
            Email
            <input name="email" placeholder="you@example.com" type="email" />
          </label>
          <label>
            Password
            <input name="password" placeholder="••••••••" type="password" />
          </label>
          <label>
            Role
            <select defaultValue="investor" name="role">
              <option value="investor">Investor</option>
              <option value="sponsor">Sponsor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button className="primary-button" type="submit">
            Continue
          </button>
        </form>
        <p className="inline-note">
          Need an account? <Link href="/signup/investor">Investor signup</Link> or{" "}
          <Link href="/signup/sponsor">sponsor track record signup</Link>.
        </p>
      </section>
    </div>
  );
}
