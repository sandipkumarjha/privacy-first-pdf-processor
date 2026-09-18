import { Merge } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export function MergeHeader({ className }: { className?: string }) {
  return (
    <PageHeader
      icon={Merge}
      title="Merge PDFs"
      description="Combine multiple PDF files into one document, in the order you choose."
      className={className}
    />
  );
}

export default MergeHeader;
