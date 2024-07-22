import Text from "./ui/Text.tsx";

export interface SectionCardProps {
  title?: string;
  description?: string;
  // deno-lint-ignore no-explicit-any
  children?: any;
}

export function SectionCard({
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 border border-base-300 p-4 rounded-2xl">
      <div className="flex flex-col gap-2">
        {title && <Text variant="heading">{title}</Text>}
        {description && <Text variant="caption-regular">{description}</Text>}
      </div>
      <div>{children}</div>
    </div>
  );
}
