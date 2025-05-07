import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface Flag {
  id: number;
  name: string;
  flag: string;
}

const flags: Flag[] = [
  { id: 1, name: "global", flag: "g" },
  { id: 2, name: "case insensitive", flag: "i" },
  { id: 3, name: "multiline", flag: "m" },
  { id: 4, name: "single line", flag: "s" },
  { id: 5, name: "unicode", flag: "u" },
  { id: 6, name: "sticky", flag: "y" },
];

const FlagDropdown = () => {
  const [selectedFlags, setSelectedFlags] = useState<Flag[]>([flags[0]]);

  const isSelected = (flag: Flag) =>
    selectedFlags.some((f) => f.id === flag.id);

  const toggleFlag = (flag: Flag, checked: boolean) => {
    setSelectedFlags((prev) => {
      const next = checked
        ? [...prev, flag]
        : prev.filter((f) => f.id !== flag.id);
      return next.sort((a, b) => a.id - b.id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-sm py-1 px-2 bg-slate-300">
        <div className="text-start flex flex-col">
          <div className="text-sm font-semibold truncate max-w-[17ch]">
            {selectedFlags.length > 0
              ? selectedFlags.map((f) => f.flag).join("")
              : "none"}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30" align="end" side="bottom">
        <DropdownMenuLabel>Flags</DropdownMenuLabel>
        {flags.map((flag) => (
          <DropdownMenuCheckboxItem
            key={flag.id}
            checked={isSelected(flag)}
            onCheckedChange={(checked) => toggleFlag(flag, checked as boolean)}
            onSelect={(e) => e.preventDefault()}
          >
            {flag.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const RegexTestTab = () => {
  return (
    <div>
      <div className="w-full flex flex-col gap-6">
        <div>
          <Label htmlFor="expression">Expression</Label>
          <div className="w-full flex items-center gap-2 rounded-md border focus-within:ring-1 focus-within:ring-ring px-2 mt-2">
            <div className="font-bold">/</div>
            <Input
              type="text"
              id="expression"
              placeholder="expression"
              className="bg-transparent focus-visible:ring-0 border-none shadow-none"
            />
            <div className="font-bold">/</div>
            <FlagDropdown />
          </div>
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="message-2">Text</Label>
          <Textarea
            placeholder="Type your text here."
            id="message-2"
            className="h-48"
          />
          <p className="text-sm text-muted-foreground">Found 1 match</p>
        </div>
      </div>
    </div>
  );
};

export default RegexTestTab;
