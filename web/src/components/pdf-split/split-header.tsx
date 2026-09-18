import { Split } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export function SplitHeader() {
  return (
    <PageHeader
      icon={Split}
      title="Split PDF"
      description="Pick the pages you need and save them as a new document. Your file never leaves this tab."
    />
  );
}

export default SplitHeader;
