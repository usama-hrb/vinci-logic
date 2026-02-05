import { FileText, BookOpen } from "lucide-react";

export const CONTENT_TYPES = {
  doc: {
    label: "Documentation",
    sidebarLabel: "New Doc",
    icon: FileText,
    supportsIcon: true,
    addDate: false,
  },
  blog: {
    label: "Blog Post",
    sidebarLabel: "New Blog",
    icon: BookOpen,
    supportsIcon: false,
    addDate: true,
  },
} as const;

export type ContentType = keyof typeof CONTENT_TYPES;
