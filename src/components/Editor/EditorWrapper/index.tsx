"use client";

import {
  $getRoot,
  $insertNodes,
  COMMAND_PRIORITY_LOW,
  PASTE_COMMAND,
} from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  TRANSFORMERS,
  $convertToMarkdownString,
  $convertFromMarkdownString,
} from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import type { EditorState } from "lexical";
import { useEffect } from "react";

import ToolBar from "../ToolBar";

// Plugin to handle pasting markdown content
function MarkdownPastePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      PASTE_COMMAND,
      (event: ClipboardEvent) => {
        const clipboardData = event.clipboardData;
        if (!clipboardData) return false;

        const text = clipboardData.getData("text/plain");

        // Check if the pasted content looks like markdown
        const hasMarkdown = /^#{1,6}\s|^\*\*|^- |^\d+\. |^```|^\*\s|^>\s/m.test(
          text,
        );

        if (hasMarkdown) {
          event.preventDefault();

          editor.update(() => {
            $convertFromMarkdownString(text, TRANSFORMERS);
          });

          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}

const theme = {
  paragraph: "my-2",
  heading: {
    h1: "text-3xl font-bold mt-8 mb-4",
    h2: "text-2xl font-semibold mt-8 mb-4",
    h3: "text-xl font-semibold mt-6 mb-3",
    h4: "text-lg font-semibold mt-6 mb-3",
  },
  list: {
    ul: "list-disc ml-6 my-2",
    ol: "list-decimal ml-6 my-2",
    listitem: "my-1",
  },
  quote: "border-l-4 border-primary pl-4 italic my-4",
  code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  link: "text-primary hover:underline",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  },
};

function onError(error: Error) {
  console.error(error);
}

interface EditorProps {
  initialContent?: string;
  onChange?: (text: string) => void;
  placeholder?: string;
}

function Editor({
  initialContent,
  onChange,
  placeholder = "Start writing your content here...",
}: EditorProps) {
  const initialConfig = {
    namespace: "AdminEditor",
    theme,
    onError,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode],
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      // Convert to Markdown to preserve formatting (headings, bold, lists, etc.)
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      onChange?.(markdown);
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full border border-border rounded-lg overflow-hidden">
        <ToolBar />
        <div className="relative min-h-125 p-4">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-125 w-full outline-none prose prose-slate dark:prose-invert max-w-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute top-4 left-4 text-muted-foreground italic pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
      <ListPlugin />
      <LinkPlugin />
      <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      <MarkdownPastePlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}

export default Editor;
