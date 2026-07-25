interface MergeHeaderProps {
    className?: string;
  }
  
  export function MergeHeader({ className }: MergeHeaderProps) {
    return (
      <div className={className}>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Merge PDF
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Combine multiple PDF files into one document.
        </p>
      </div>
    );
  }
  
  export default MergeHeader;