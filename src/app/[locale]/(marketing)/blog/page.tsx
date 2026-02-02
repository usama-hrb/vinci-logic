import Link from "next/link";
import { blog } from "@/lib/source";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main className="min-h-screen">
      {/* Hero Section with Dotted Background */}
      <section className="relative py-24 overflow-hidden">
        {/* Dotted background */}
        <div
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
            [background-size:16px_16px]
            [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
          "
        />

        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border/50 bg-muted/20 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="mr-2 h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            Insights & Updates
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
            Vinci Logic Blogs
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover insights, updates, and stories from our team
          </p>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover:border-gray-400 transition-colors duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold text-muted-foreground/20">
                      {post.data.title.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-purple-500 transition-colors line-clamp-2">
                    {post.data.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {post.data.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      <span>{post.data.author}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.data.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
