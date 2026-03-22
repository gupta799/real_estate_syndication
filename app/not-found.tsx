import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-stack narrow-page">
      <section className="content-card">
        <p className="section-kicker">Missing page</p>
        <h1>That listing or route does not exist.</h1>
        <p className="section-summary">
          The marketplace should fail cleanly when a slug is invalid or a page has not been published.
        </p>
        <Link className="primary-button" href="/listings">
          Back to listings
        </Link>
      </section>
    </div>
  );
}

