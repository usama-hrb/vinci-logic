import { getPageImage, source } from "@/lib/source";
import { DocsBody, DocsPage } from "@/components/layout/docs/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      tableOfContent={{
        style: "clerk",
      }}
      toc={page.data.toc}
      full={page.data.full}
    >
      <DocsBody className="[&>h1]:border-b-2 [&>h1]:border-primary [&>h1]:pb-4 [&>h1]:mb-8 [&>h2]:relative [&>h2]:pb-4 [&>h2]:mb-6 [&>h2]:after:content-[''] [&>h2]:after:absolute [&>h2]:after:bottom-0 [&>h2]:after:left-0 [&>h2]:after:w-1/2 [&>h2]:after:h-0.5 [&>h2]:after:bg-primary/60 [&>h3]:relative [&>h3]:pb-3 [&>h3]:mb-4 [&>h3]:after:content-[''] [&>h3]:after:absolute [&>h3]:after:bottom-0 [&>h3]:after:left-0 [&>h3]:after:w-1/2 [&>h3]:after:h-0.5 [&>h3]:after:bg-primary/40">
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
