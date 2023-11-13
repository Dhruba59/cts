import { cn } from "@/libs/utils";

const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={cn("w-full text-sm text-black/80", className)}
        {...props}
      />
    </div>
  );
};

const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return <thead className={cn("", className)} {...props} />;
};

const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return <tbody className={cn("", className)} {...props} />;
};

const TableHead: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        "bg-secondary-light text-sm font-medium p-4 border-b-2 text-start relative",
        className
      )}
      {...props}
    />
  );
};

const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cn("hover:bg-neutral-200 [&>*]:p-4", className)}
      {...props}
    />
  );
};

const TableCell: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return <td className={cn("", className)} {...props} />;
};

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
