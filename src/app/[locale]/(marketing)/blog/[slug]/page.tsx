import { notFound } from "next/navigation";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  const Mdx = page.data.body;
  const publishDate = new Date(page.data.date);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-6 overflow-hidden border-b">
        {/* Subtle dotted background */}
        <div
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
            [background-size:16px_16px]
            opacity-30
          "
        />

        <div className="mx-auto max-w-4xl px-6">
          {/* Header with Back Button and Meta Info */}
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>{page.data.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>
                  {publishDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          {/* Table of Contents */}
          {page.data.toc && page.data.toc.length > 0 && (
            <div className="mb-8 pb-6 border-b">
              <InlineTOC items={page.data.toc} />
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Mdx components={defaultMdxComponents} />
          </div>
        </div>
      </article>

      {/* Footer Section */}
      <section className="py-8 border-t">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center justify-center">
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
