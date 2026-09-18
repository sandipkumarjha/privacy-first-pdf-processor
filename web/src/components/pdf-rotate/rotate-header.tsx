import { RotateCw } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export function RotateHeader() {
  return (
    <PageHeader
      icon={RotateCw}
      title="Rotate PDF"
      description="Rotate one page or the whole document. Nothing is uploaded — it all happens inside your browser."
    />
  );
}

export default RotateHeader;
