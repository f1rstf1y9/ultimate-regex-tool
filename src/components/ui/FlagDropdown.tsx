import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/atom/dropdown-menu";
import type { Flag } from "@/types";
import flags from "@/constants/flags.json";

export const FlagDropdown = ({
  selectedFlags,
  toggleFlag,
}: {
  selectedFlags: Flag[];
  toggleFlag: (flag: Flag, checked: boolean) => void;
}) => {
  const isSelected = (flag: Flag) =>
    selectedFlags.some((f) => f.id === flag.id);

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
