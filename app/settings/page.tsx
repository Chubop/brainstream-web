import { Sheet } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Select } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-16">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-left text-lg font-semibold">
            Settings
        </h1>
        <div className="mt-4 flex flex-row items-center space-x-2">
            <Switch />
            <span>Toggle Theme</span>
        </div>
      </div>
    </div>
  );
}