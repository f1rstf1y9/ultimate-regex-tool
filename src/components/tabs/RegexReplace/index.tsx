import { useState } from "react";
import { Button } from "@/components/ui/atom/button";
import { Label } from "@radix-ui/react-label";
import type { Flag } from "@/types";
import flags from "@/constants/flags.json";
import RegexEditor from "@/components/ui/RegexEditor";

const RegexReplaceTab = () => {
  const [expression, setExpression] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Flag[]>([flags[0]]);
  const [text, setText] = useState("");
  const [substitution, setSubstitution] = useState("");
  const [replacedText, setReplacedText] = useState("");

  const toggleFlag = (flag: Flag) => {
    setSelectedFlags((prev) =>
      prev.includes(flag) ? prev.filter((f) => f !== flag) : [...prev, flag]
    );
  };

  const handleReplace = () => {
    try {
      const flags = selectedFlags.map((f) => f.flag).join("");
      const regex = new RegExp(expression, flags);
      const replaced = text.replace(
        regex,
        (_match, group1) => `<code>${group1}</code>`
      );
      setReplacedText(replaced);
    } catch (err) {
      console.error("정규식 에러:", err);
      setReplacedText("Invalid replacement");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(replacedText);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <RegexEditor
        expression={expression}
        onExpressionChange={setExpression}
        substitution={substitution}
        onSubstitutionChange={setSubstitution}
        text={text}
        onTextChange={setText}
        selectedFlags={selectedFlags}
        onToggleFlag={toggleFlag}
        showSubstitutionInput
      />

      {/* Replace Action */}
      <div className="flex gap-2">
        <Button onClick={handleReplace}>Replace</Button>
        <Button variant="outline" onClick={handleCopy}>
          Copy
        </Button>
      </div>

      {/* Result */}
      {replacedText && (
        <div>
          <Label>Result</Label>
          <div className="w-full p-2 font-mono whitespace-pre-wrap border rounded-md bg-gray-100 text-black">
            {replacedText}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegexReplaceTab;
