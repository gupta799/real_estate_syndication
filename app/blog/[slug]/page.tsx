import Link from "next/link";
import { notFound } from "next/navigation";

import { getBlogPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-stack">
      <section className="content-section narrow-page">
        <Link className="text-link" href="/blog">
          Back to blog
        </Link>
        <article className="content-card blog-post">
          <p className="section-kicker">{formatDate(post.publishedAt)}</p>
          <h1>{post.title}</h1>
          <p className="section-summary">{post.summary}</p>
          {post.sections.map((section, sectionIndex) => (
            <section className="blog-section" key={`${section.heading}-${sectionIndex}`}>
              <h2>{section.heading}</h2>
              {section.body.map((paragraph, paragraphIndex) => (
                <p key={`${sectionIndex}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.metrics?.length ? (
                <div className="blog-metrics">
                  <h3>Metrics tracked</h3>
                  <ul>
                    {section.metrics.map((metric, metricIndex) => (
                      <li key={`${sectionIndex}-m-${metricIndex}`}>{metric}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ))}
        </article>
      </section>
    </div>
  );
}
