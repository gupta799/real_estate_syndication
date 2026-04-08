import Link from "next/link";

import { getAllBlogPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Credex methodology</p>
          <h1>Blog</h1>
          <p className="section-summary">
            Notes on how we review, verify, and publish syndicator profiles for investors.
          </p>
        </div>
        <div className="stack-list">
          {posts.map((post) => (
            <article className="content-card blog-card" key={post.slug}>
              <p className="section-kicker">{formatDate(post.publishedAt)}</p>
              <h2>{post.title}</h2>
              <p>{post.summary}</p>
              <Link className="primary-link" href={`/blog/${post.slug}`}>
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

