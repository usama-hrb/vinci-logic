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
      <section className="relative py-4 sm:py-6 overflow-hidden border-b">
        {/* Subtle dotted background */}
        <div
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
            [background-size:12px_12px] sm:[background-size:16px_16px]
            opacity-30
          "
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header with Back Button and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-foreground/80 transition-colors group w-fit"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>{page.data.author}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
      <article className="py-6 sm:py-8 md:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Table of Contents */}
          {page.data.toc && page.data.toc.length > 0 && (
            <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b">
              <InlineTOC items={page.data.toc} />
            </div>
          )}

          {/* Main Content */}
          <div
            className="prose prose-sm sm:prose-base md:prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:scroll-mt-20
            prose-h1:text-2xl prose-h1:sm:text-3xl prose-h1:md:text-4xl
            prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:md:text-3xl
            prose-h3:text-lg prose-h3:sm:text-xl prose-h3:md:text-2xl
            prose-p:text-sm prose-p:sm:text-base prose-p:md:text-lg
            prose-li:text-sm prose-li:sm:text-base
            prose-img:rounded-lg prose-img:sm:rounded-xl
            prose-pre:text-xs prose-pre:sm:text-sm prose-pre:overflow-x-auto
            prose-code:text-xs prose-code:sm:text-sm
          "
          >
            <Mdx components={defaultMdxComponents} />
          </div>
        </div>
      </article>

      {/* Footer Section */}
      <section className="py-6 sm:py-8 border-t">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground active:text-foreground/80 transition-colors py-2 px-4 rounded-lg hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
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
