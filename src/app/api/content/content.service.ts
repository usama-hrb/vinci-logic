import { ContentType } from "./contentTypes";

export async function saveContent({
  type,
  slug,
  frontmatter,
  content,
}: {
  type: ContentType;
  slug: string;
  frontmatter: Record<string, string>;
  content: string;
}) {
  const fullContent = `---
${Object.entries(frontmatter)
  .map(([k, v]) => `${k}: "${v}"`)
  .join("\n")}
---

${content}`;

  const res = await fetch("/api/content/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, slug, content: fullContent }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to save");
  }
}
