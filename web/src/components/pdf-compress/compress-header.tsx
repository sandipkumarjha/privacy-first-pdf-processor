import { Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export function CompressHeader() {
  return (
    <PageHeader
      icon={Zap}
      title="Compress PDF"
      description="Reduce file size while preserving quality. Everything happens locally inside your browser."
    />
  );
}

export default CompressHeader;
