"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Save, LogOut } from "lucide-react";

import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/Button";
import Editor from "@/components/Editor/EditorWrapper";
import { createClient } from "../../../../lib/supabase/server-client";

import { ContentType, CONTENT_TYPES } from "@/app/api/content/contentTypes";
import { generateSlug, toPascalCase } from "@/app/api/content/content.utils";
import { saveContent } from "@/app/api/content/content.service";

import { useAdminForm } from "./hooks/useAdminForm";
import { AdminSidebar } from "./AdminSidebar";

interface Message {
  type: "success" | "error";
  text: string;
}

export default function AdminPage() {
  const [type, setType] = useState<ContentType | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const { form, updateField, resetForm } = useAdminForm();
  const titleRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // Warn on unsaved changes
  useEffect(() => {
    const hasChanges = form.title || form.content || form.description;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [form.title, form.content, form.description]);

  const handleNewContent = (newType: ContentType) => {
    setType(newType);
    resetForm();
    setMessage(null);
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const handleSave = useCallback(async () => {
    if (!type || !form.title || !form.content) {
      setMessage({ type: "error", text: "Title and content are required" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const cfg = CONTENT_TYPES[type];

      const frontmatter: Record<string, string> = {
        title: form.title,
        description: form.description,
      };

      if (cfg.addDate) {
        frontmatter.date = new Date().toISOString().split("T")[0];
      }

      if (cfg.supportsIcon && form.icon) {
        frontmatter.icon = toPascalCase(form.icon);
      }

      await saveContent({
        type,
        slug: form.slug || generateSlug(form.title),
        frontmatter,
        content: form.content,
      });

      setMessage({
        type: "success",
        text: `${cfg.label} saved successfully!`,
      });

      resetForm();
      setType(null);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  }, [type, form, resetForm]);

  // Cmd / Ctrl + S
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSave]);

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b-3 border-primary bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-8">
          <Logo />
          <div className="flex items-center gap-2 ">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleLogout} className="border border-border ">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar
          type={type}
          onSelect={handleNewContent}
          iconValue={form.icon}
          onIconChange={(v) => updateField("icon", v)}
        />

        <main className="flex-1 overflow-y-auto flex justify-center ">
          {!type ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a content type to get started
            </div>
          ) : (
            <div className="w-full max-w-7xl px-8 py-12">
              <input
                ref={titleRef}
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full bg-transparent text-3xl font-bold focus:outline-none mb-2"
                placeholder="Title"
              />

              {form.title && (
                <p className="text-sm text-muted-foreground mb-4">
                  Slug:{" "}
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                    {generateSlug(form.title)}
                  </code>
                </p>
              )}

              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={2}
                className="w-full bg-transparent resize-none text-muted-foreground focus:outline-none mb-6"
                placeholder="Add a short description…"
              />

              <Editor
                initialContent={form.content}
                onChange={(content) => updateField("content", content)}
                //placeholder="Start writing your content here..."
              />

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

      {type && (
        <div className="fixed bottom-8 right-8">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="mr-2 h-5 w-5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      )}
    </div>
  );
}
