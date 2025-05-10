import { useMemo } from "react";
import { Input } from "@/components/ui/atom/input";
import { Textarea } from "@/components/ui/atom/textarea";
import { FlagDropdown } from "@/components/ui/FlagDropdown";
import { Label } from "@/components/ui/atom/label";
import { highlightMatches } from "@/lib/regex/highlightMatches";
import type { Flag } from "@/types";

interface RegexEditorProps {
  expression: string;
  onExpressionChange: (value: string) => void;
  substitution?: string;
  onSubstitutionChange?: (value: string) => void;
  text: string;
  onTextChange: (value: string) => void;
  selectedFlags: Flag[];
  onToggleFlag: (flag: Flag, checked: boolean) => void;
  showSubstitutionInput?: boolean;
}

const RegexEditor = ({
  expression,
  onExpressionChange,
  substitution,
  onSubstitutionChange,
  text,
  onTextChange,
  selectedFlags,
  onToggleFlag,
  showSubstitutionInput = false,
}: RegexEditorProps) => {
  const flags = selectedFlags.map((f) => f.flag).join("");

  const { html: highlightedText, count } = useMemo(
    () => highlightMatches(text, expression, flags),
    [text, expression, flags]
  );

  return (
    <>
      {/* Expression + Flags */}
      <div>
        <Label htmlFor="expression">Expression</Label>
        <div className="w-full flex items-center gap-2 px-2 mt-2 rounded-md border focus-within:ring-1 focus-within:ring-ring/50">
          <div className="font-bold">/</div>
          <Input
            id="expression"
            type="text"
            className="font-mono bg-transparent focus-visible:ring-0 border-none shadow-none"
            value={expression}
            onChange={(e) => onExpressionChange(e.target.value)}
          />
          <div className="font-bold">/</div>
          <FlagDropdown
            selectedFlags={selectedFlags}
            toggleFlag={onToggleFlag}
          />
        </div>
      </div>

      {/* Substitution */}
      {showSubstitutionInput && onSubstitutionChange && (
        <div>
          <Label htmlFor="substitution">Substitution</Label>
          <Input
            id="substitution"
            className="font-mono p-2 mt-2 rounded-md border focus-within:ring-1 focus-within:ring-ring/50"
            placeholder="e.g. $1 or replacement"
            value={substitution}
            onChange={(e) => onSubstitutionChange(e.target.value)}
          />
        </div>
      )}

      {/* Text input + Highlight */}
      <div className="grid w-full gap-2">
        <Label htmlFor="text">Text</Label>
        <div
          className={`relative h-48 overflow-y-auto rounded-md border focus-within:ring-1 focus-within:ring-ring/50`}
        >
          <pre
            className={`absolute inset-0 z-0 pointer-events-none whitespace-pre-wrap break-words p-2
                font-mono text-base leading-relaxed box-border`}
            style={{ color: "transparent" }}
          >
            <code dangerouslySetInnerHTML={{ __html: highlightedText }} />
          </pre>
          <Textarea
            id="text"
            placeholder="Type your text here"
            style={{ height: "max-content" }}
            className={`absolute inset-0 z-10 w-full h-full bg-transparent text-black caret-black p-2
                font-mono text-base leading-relaxed box-border shadow-none
                resize-none overflow-hidden break-words whitespace-pre-wrap selection:bg-blue-400`}
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>

        <p className="text-sm text-muted-foreground">
          Found {count} match{count !== 1 ? "es" : ""}
        </p>
      </div>
    </>
  );
};

export default RegexEditor;
