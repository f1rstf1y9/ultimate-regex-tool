import { useMemo, useState } from "react";
import { Label } from "@/components/ui/atom/label";
import { Input } from "@/components/ui/atom/input";
import { Textarea } from "@/components/ui/atom/textarea";
import type { Flag } from "@/types";
import flags from "@/constants/flags.json";
import { highlightMatches } from "@/lib/regex/highlightMatches";
import { FlagDropdown } from "@/components/ui/FlagDropdown";

const RegexTestTab = () => {
  const [expression, setExpression] = useState("");
  const [text, setText] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Flag[]>([flags[0]]);

  const flagsString = selectedFlags.map((f) => f.flag).join("");

  const { html: highlightedText, count } = useMemo(
    () => highlightMatches(text, expression, flagsString),
    [text, expression, flagsString]
  );

  const toggleFlag = (flag: Flag, checked: boolean) => {
    setSelectedFlags((prev) => {
      const next = checked
        ? [...prev, flag]
        : prev.filter((f) => f.id !== flag.id);
      return next.sort((a, b) => a.id - b.id);
    });
  };

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
              className="font-mono bg-transparent focus-visible:ring-0 border-none shadow-none"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
            />
            <div className="font-bold">/</div>
            <FlagDropdown
              selectedFlags={selectedFlags}
              toggleFlag={toggleFlag}
            />
          </div>
        </div>
        <div className="grid w-full gap-2">
          <Label htmlFor="text">Text</Label>
          <div className="relative">
            <pre
              className="min-h-48 absolute inset-0 z-0 pointer-events-none whitespace-pre-wrap break-words overflow-hidden
                          font-mono text-base leading-relaxed p-2 border rounded-md box-border"
              style={{ color: "transparent" }}
            >
              <code dangerouslySetInnerHTML={{ __html: highlightedText }} />
            </pre>
            <Textarea
              id="message-2"
              placeholder="Type your text here."
              className="min-h-48 relative z-10 bg-transparent text-black caret-black
                          font-mono text-base leading-relaxed p-2 border rounded-md box-border
                          resize-none overflow-hidden break-words whitespace-pre-wrap selection:bg-blue-400"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Found {count} match{count !== 1 ? "es" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegexTestTab;
