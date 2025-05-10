import { useState } from "react";
import type { Flag } from "@/types";
import flags from "@/constants/flags.json";
import RegexEditor from "@/components/ui/RegexEditor";

const RegexTestTab = () => {
  const [expression, setExpression] = useState("");
  const [text, setText] = useState("");
  const [selectedFlags, setSelectedFlags] = useState<Flag[]>([flags[0]]);

  const toggleFlag = (flag: Flag, checked: boolean) => {
    setSelectedFlags((prev) => {
      const next = checked
        ? [...prev, flag]
        : prev.filter((f) => f.id !== flag.id);
      return next.sort((a, b) => a.id - b.id);
    });
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <RegexEditor
        expression={expression}
        onExpressionChange={setExpression}
        text={text}
        onTextChange={setText}
        selectedFlags={selectedFlags}
        onToggleFlag={toggleFlag}
      />
    </div>
  );
};

export default RegexTestTab;
