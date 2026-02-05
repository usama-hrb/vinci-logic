import { ContentType, CONTENT_TYPES } from "@/app/api/content/contentTypes";
import { Button } from "@/components/ui/Button";
import { IconPicker } from "./IconPicker";

interface SidebarProps {
  type: ContentType | null;
  onSelect: (type: ContentType) => void;
  iconValue: string;
  onIconChange: (value: string) => void;
}

export function AdminSidebar({
  type,
  onSelect,
  iconValue,
  onIconChange,
}: SidebarProps) {
  return (
    <aside className="w-64 border-r-2 border-primary p-4 space-y-3">
      {Object.entries(CONTENT_TYPES).map(([key, cfg]) => {
        const Icon = cfg.icon;
        return (
          <Button
            key={key}
            variant="outline"
            className={`w-full justify-start gap-2 ${
              type === key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-primary/10"
            }`}
            onClick={() => onSelect(key as ContentType)}
          >
            <Icon className="h-4 w-4" />
            {cfg.sidebarLabel}
          </Button>
        );
      })}

      {type && CONTENT_TYPES[type].supportsIcon && (
        <IconPicker value={iconValue} onChange={onIconChange} />
      )}
    </aside>
  );
}
