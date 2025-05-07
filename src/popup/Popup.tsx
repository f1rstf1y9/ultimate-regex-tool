import PatternManageTab from "@/components/tabs/PatternManageTab";
import RegexReplaceTab from "@/components/tabs/RegexReplaceTab";
import RegexTestTab from "@/components/tabs/RegexTestContent";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronUp, ChevronDown, ArrowDownFromLine } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="w-full p-4 pt-0">
      <div className="relative bg-secondary flex items-center gap-2 rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
        <Input
          type="text"
          placeholder="regex pattern"
          className="bg-transparent focus-visible:ring-0 border-none shadow-none"
        />
        <ChevronUp className="h-5 w-5 text-muted-foreground" />
        <ChevronDown className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <ArrowDownFromLine className="h-5 w-5" />
      </div>
    </div>
  );
};

const Main = () => {
  const tabs = ["TEST", "REPLACE", "PATTERNS"];

  return (
    <Tabs defaultValue="test" className="w-full">
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
  return (
    <div className="w-96 h-[600px] py-4">
      <SearchBar />
      <Main />
    </div>
  );
};

export default Popup;
