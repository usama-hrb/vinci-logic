"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  TextFormatType,
  LexicalCommand,
  $createTextNode,
} from "lexical";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createLinkNode } from "@lexical/link";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link,
  LucideIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────
// Config-driven button definitions
// ─────────────────────────────────────────────────────────────

type TextFormatConfig = {
  format: TextFormatType;
  icon: LucideIcon;
  title: string;
};

type HeadingConfig = {
  tag: HeadingTagType;
  icon: LucideIcon;
  title: string;
};

type CommandConfig = {
  command: LexicalCommand<undefined>;
  icon: LucideIcon;
  title: string;
};

const TEXT_FORMATS: TextFormatConfig[] = [
  { format: "bold", icon: Bold, title: "Bold (Ctrl+B)" },
  { format: "italic", icon: Italic, title: "Italic (Ctrl+I)" },
  { format: "underline", icon: Underline, title: "Underline (Ctrl+U)" },
  { format: "strikethrough", icon: Strikethrough, title: "Strikethrough" },
  { format: "code", icon: Code, title: "Inline Code" },
];

const HEADINGS: HeadingConfig[] = [
  { tag: "h1", icon: Heading1, title: "Heading 1" },
  { tag: "h2", icon: Heading2, title: "Heading 2" },
  { tag: "h3", icon: Heading3, title: "Heading 3" },
];

const LIST_COMMANDS: CommandConfig[] = [
  { command: INSERT_UNORDERED_LIST_COMMAND, icon: List, title: "Bullet List" },
  {
    command: INSERT_ORDERED_LIST_COMMAND,
    icon: ListOrdered,
    title: "Numbered List",
  },
];

const HISTORY_COMMANDS: CommandConfig[] = [
  { command: UNDO_COMMAND, icon: Undo, title: "Undo (Ctrl+Z)" },
  { command: REDO_COMMAND, icon: Redo, title: "Redo (Ctrl+Y)" },
];

// ─────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-foreground"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-border mx-1" />;
}

// ─────────────────────────────────────────────────────────────
// Main Toolbar
// ─────────────────────────────────────────────────────────────

export default function ToolBar() {
  const [editor] = useLexicalComposerContext();
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);

  // Single state object for all text formats
  const [activeFormats, setActiveFormats] = useState<Set<TextFormatType>>(
    new Set(),
  );

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const formats = new Set<TextFormatType>();
      TEXT_FORMATS.forEach(({ format }) => {
        if (selection.hasFormat(format)) {
          formats.add(format);
        }
      });
      setActiveFormats(formats);
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createQuoteNode());
      }
    });
  };

  const handleLinkPopoverOpen = (open: boolean) => {
    if (open) {
      // Save selected text when opening
      editor.getEditorState().read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const text = selection.getTextContent();
          setLinkText(text);
        }
      });
    } else {
      setLinkText("");
      setLinkUrl("");
    }
    setIsLinkPopoverOpen(open);
  };

  const insertLink = () => {
    if (!linkUrl) return;

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const displayText = linkText || linkUrl;
        const linkNode = $createLinkNode(linkUrl);
        const textNode = $createTextNode(displayText);
        linkNode.append(textNode);
        selection.insertNodes([linkNode]);
      }
    });

    setLinkUrl("");
    setLinkText("");
    setIsLinkPopoverOpen(false);
  };

  const handleLinkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      insertLink();
    }
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-border bg-background flex-wrap">
      {/* History: Undo/Redo */}
      {HISTORY_COMMANDS.map(({ command, icon: Icon, title }) => (
        <ToolbarButton
          key={title}
          onClick={() => editor.dispatchCommand(command, undefined)}
          title={title}
        >
          <Icon className="h-4 w-4" />
        </ToolbarButton>
      ))}

      <Divider />

      {/* Headings */}
      {HEADINGS.map(({ tag, icon: Icon, title }) => (
        <ToolbarButton
          key={tag}
          onClick={() => formatHeading(tag)}
          title={title}
        >
          <Icon className="h-4 w-4" />
        </ToolbarButton>
      ))}

      <Divider />

      {/* Text Formatting */}
      {TEXT_FORMATS.map(({ format, icon: Icon, title }) => (
        <ToolbarButton
          key={format}
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
          isActive={activeFormats.has(format)}
          title={title}
        >
          <Icon className="h-4 w-4" />
        </ToolbarButton>
      ))}

      <Divider />

      {/* Lists */}
      {LIST_COMMANDS.map(({ command, icon: Icon, title }) => (
        <ToolbarButton
          key={title}
          onClick={() => editor.dispatchCommand(command, undefined)}
          title={title}
        >
          <Icon className="h-4 w-4" />
        </ToolbarButton>
      ))}

      <Divider />

      {/* Quote */}
      <ToolbarButton onClick={formatQuote} title="Block Quote">
        <Quote className="h-4 w-4" />
      </ToolbarButton>

      {/* Link with Popover */}
      <Popover open={isLinkPopoverOpen} onOpenChange={handleLinkPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            title="Insert Link"
            className="p-2 rounded-md transition-colors hover:bg-muted text-foreground cursor-pointer"
          >
            <Link className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Insert Link</h4>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link text"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  URL
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={handleLinkKeyDown}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkPopoverOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={insertLink} disabled={!linkUrl}>
                Insert
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
