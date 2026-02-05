"use client";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  return (
    <div className="border-t border-border pt-3 mt-3">
      <label className="text-xs font-medium text-muted-foreground mb-2 block">
        Icon (optional)
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
