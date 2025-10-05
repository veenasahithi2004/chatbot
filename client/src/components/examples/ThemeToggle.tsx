import ThemeToggle from '../ThemeToggle';

export default function ThemeToggleExample() {
  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">Toggle theme:</p>
        <ThemeToggle />
      </div>
      <div className="p-4 bg-card border border-card-border rounded-lg">
        <p className="text-foreground">This card demonstrates theme changes</p>
      </div>
    </div>
  );
}
