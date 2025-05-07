import { useState } from "react";
import PatternManageTab from "@/components/tabs/PatternManageTab";
import RegexReplaceTab from "@/components/tabs/RegexReplaceTab";
import RegexTestTab from "@/components/tabs/RegexTestContent";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronUp, ChevronDown } from "lucide-react";

const SearchBar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  return (
    <div className="w-full flex flex-col justify-center gap-2 px-4">
      <div className="relative bg-secondary flex items-center gap-2 rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
        <Input
          type="text"
          placeholder="regex pattern"
          className="bg-transparent focus-visible:ring-0 border-none shadow-none"
        />
        <ChevronUp className="h-5 w-5 text-muted-foreground" />
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="w-full flex justify-center">
        <button onClick={toggle}>
          {isOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6 mb-2" />
          )}
        </button>
      </div>
    </div>
  );
};

const Main = () => {
  const tabs = ["TEST", "REPLACE", "PATTERNS"];

  return (
    <Tabs defaultValue={tabs[0]} className="w-full">
      <TabsList className="w-full p-0 px-4 bg-background justify-start border-b rounded-none">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="px-4">
        <TabsContent value={tabs[0]}>
          <RegexTestTab />
        </TabsContent>
        <TabsContent value={tabs[1]}>
          <RegexReplaceTab />
        </TabsContent>
        <TabsContent value={tabs[2]}>
          <PatternManageTab />
        </TabsContent>
      </div>
    </Tabs>
  );
};

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={`w-96 py-4 transition-all duration-300 ${
        isOpen ? "h-[600px]" : "h-[80px]"
      }`}
    >
      <SearchBar isOpen={isOpen} toggle={toggle} />
      {isOpen && <Main />}
    </div>
  );
};

export default Popup;
