import Link from "next/link";
import { blog } from "@/lib/source";
import { Calendar, User } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main className="min-h-screen">
      {/* Hero Section with Dotted Background */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Dotted background */}
        <div
          className="
            pointer-events-none absolute inset-0 -z-10
            bg-[radial-gradient(var(--color-border)_1px,transparent_1px)]
            [background-size:12px_12px] sm:[background-size:16px_16px]
            [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]
          "
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 sm:mb-6 inline-flex items-center rounded-full border border-border/50 bg-muted/20 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="mr-2 h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-500 animate-pulse" />
            Insights & Updates
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
            Vinci Logic Blogs
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Discover insights, updates, and stories from our team
          </p>
        </div>
      </section>

      {/* Blog Cards Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card hover:border-gray-400 active:scale-[0.98] transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-36 sm:h-40 md:h-48 w-full overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-muted-foreground/20">
                      {post.data.title.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-purple-500 transition-colors line-clamp-2">
                    {post.data.title}
                  </h2>

                  <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1">
                    {post.data.description}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-3 sm:pt-4 border-t border-border text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span className="truncate max-w-[100px] sm:max-w-none">
                        {post.data.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
            <div className="text-center py-12 sm:py-16">
              <p className="text-muted-foreground text-base sm:text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
