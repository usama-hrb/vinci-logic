"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { FileText, BookOpen, Save } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type ContentType = "doc" | "blog";

interface Message {
  type: "success" | "error";
  text: string;
}

export default function AdminPage() {
  const [type, setType] = useState<ContentType | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [icon, setIcon] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Convert icon name to PascalCase (UpperCamelCase)
  const toPascalCase = (text: string) => {
    if (!text) return "";
    // Handle kebab-case, snake_case, or already camelCase
    return text
      .replace(/[-_]+/g, " ") // Replace - and _ with spaces
      .replace(/\s+(.)/g, (_, char) => char.toUpperCase()) // Capitalize after spaces
      .replace(/\s/g, "") // Remove spaces
      .replace(/^(.)/, (_, char) => char.toUpperCase()); // Capitalize first letter
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleNewContent = (contentType: ContentType) => {
    setType(contentType);
    setTitle("");
    setDescription("");
    setSlug("");
    setContent("");
    setIcon("");
    setMessage(null);

    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const handleSave = useCallback(async () => {
    if (!title || !content || !type) {
      setMessage({ type: "error", text: "Title and content are required" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const frontmatter: Record<string, string> = {
        title,
        description,
      };

      if (type === "doc" && icon) {
        frontmatter.icon = toPascalCase(icon); // Convert to PascalCase
      }

      if (type === "blog") {
        frontmatter.date = new Date().toISOString().split("T")[0];
      }

      const fullContent = `---
${Object.entries(frontmatter)
  .filter(([_, v]) => v)
  .map(([k, v]) => `${k}: "${v}"`)
  .join("\n")}
---

${content}`;

      const response = await fetch("/api/content/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          slug: slug || generateSlug(title),
          content: fullContent,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `${type === "doc" ? "Documentation" : "Blog post"} saved successfully!`,
        });

        // Reset form after successful save
        setTitle("");
        setDescription("");
        setSlug("");
        setContent("");
        setIcon("");
        setType(null);

        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to save content" });
      console.error(error);
    } finally {
      setSaving(false);
    }
  });

  // Keyboard shortcut: Cmd/Ctrl + S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [title, content, type, slug, icon, description, handleSave]);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar - matches /docs */}
      <div className="sticky top-0 z-50 w-full border-b-3 border-primary bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-8">
          <Logo />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 border-r-2 border-primary bg-background p-4 space-y-3">
          <div className="space-y-2">
            <Button
              variant="outline"
              className={`w-full justify-start gap-2 transition-colors ${
                type === "doc"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => handleNewContent("doc")}
            >
              <FileText className="h-4 w-4" />
              New Doc
            </Button>

            <Button
              variant="outline"
              className={`w-full justify-start gap-2 transition-colors ${
                type === "blog"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:text-primary"
              }`}
              onClick={() => handleNewContent("blog")}
            >
              <BookOpen className="h-4 w-4" />
              New Blog
            </Button>
          </div>

          {type === "doc" && (
            <div className="border-t border-border pt-3 mt-3">
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Icon (optional)
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-2 py-1.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="FileText"
              />
              <p className="text-xs text-muted-foreground mt-1">
                <a
                  href="https://lucide.dev/icons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Browse icons
                </a>
              </p>
            </div>
          )}
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto flex justify-center">
          {!type ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a content type to get started</p>
                <p className="text-sm mt-2">
                  Create a new doc or blog post from the sidebar
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl px-8 py-12">
              {/* Title Input - Notion-style */}
              <input
                ref={titleRef}
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full bg-transparent text-4xl font-bold placeholder:text-muted-foreground focus:outline-none mb-4"
                placeholder="Untitled"
              />

              {/* Description Input */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-transparent resize-none text-muted-foreground focus:outline-none mb-6"
                placeholder="Add a short description…"
              />

              {/* Divider */}
              <div className="my-6 border-b border-border" />

              {/* MDX Content Editor with Live Preview */}
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={24}
                  className="w-full font-mono text-sm leading-6 bg-transparent focus:outline-none resize-none absolute inset-0 z-10 selection:bg-primary/20"
                  placeholder="Start writing your MDX here..."
                  style={{
                    color: "transparent",
                    caretColor: "hsl(var(--foreground))",
                  }}
                />

                {/* Live Rendered Preview Overlay */}
                <div className="w-full min-h-[600px] pointer-events-none text-foreground">
                  {content ? (
                    <div
                      className="prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: content
                          .split("\n")
                          .map((line) => {
                            // Headers
                            if (line.startsWith("#### ")) {
                              return `<h4 class="text-lg font-semibold mt-6 mb-3">${line.slice(5)}</h4>`;
                            }
                            if (line.startsWith("### ")) {
                              return `<h3 class="text-xl font-semibold mt-6 mb-3">${line.slice(4)}</h3>`;
                            }
                            if (line.startsWith("## ")) {
                              return `<h2 class="text-2xl font-semibold mt-8 mb-4">${line.slice(3)}</h2>`;
                            }
                            if (line.startsWith("# ")) {
                              return `<h1 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`;
                            }
                            // Lists
                            if (
                              line.trim().startsWith("- ") ||
                              line.trim().startsWith("* ")
                            ) {
                              return `<li class="ml-6 list-disc">${line.trim().slice(2)}</li>`;
                            }
                            if (/^\d+\.\s/.test(line.trim())) {
                              return `<li class="ml-6 list-decimal">${line.trim().replace(/^\d+\.\s/, "")}</li>`;
                            }
                            // Code blocks
                            if (line.startsWith("```")) {
                              return line.includes("```") && line.length > 3
                                ? '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>'
                                : "</code></pre>";
                            }
                            // Inline code
                            let formatted = line
                              .replace(
                                /`([^`]+)`/g,
                                '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>',
                              )
                              .replace(
                                /\*\*([^*]+)\*\*/g,
                                '<strong class="font-bold">$1</strong>',
                              )
                              .replace(
                                /\*([^*]+)\*/g,
                                '<em class="italic">$1</em>',
                              )
                              .replace(
                                /\[([^\]]+)\]\(([^)]+)\)/g,
                                '<a href="$2" class="text-primary hover:underline">$1</a>',
                              );

                            // Empty lines
                            if (line.trim() === "") {
                              return "<br />";
                            }
                            // Regular paragraphs
                            return `<p class="my-4 font-sans">${formatted}</p>`;
                          })
                          .join(""),
                      }}
                    />
                  ) : (
                    <p className="text-muted-foreground italic font-sans">
                      Start writing your MDX here...
                    </p>
                  )}
                </div>
              </div>

              {/* Message Display */}
              {message && (
                <div
                  className={`mt-4 p-3 rounded-md text-sm ${
                    message.type === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {message.text}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Floating Save Button */}
      {type && (
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={handleSave}
            disabled={saving || !title || !content}
            size="lg"
            className="shadow-lg hover:shadow-xl transition-shadow"
          >
            <Save className="mr-2 h-5 w-5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
}
